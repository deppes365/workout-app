import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/appContext/AppContext';
import { db } from '../../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FaSearch, FaTimes } from 'react-icons/fa';

import WorkoutContext from '../../context/workoutContext/WorkoutContext';
import UserWorkoutItem from '../../components/userWorkoutItem/UserWorkoutItem';
import { workoutList } from '../../WorkoutList';
import SearchResult from '../../components/SearchResult';

function Workouts() {
	const { setActiveLink } = useContext(AppContext);
	const { userWorkouts, setUserWorkouts } = useContext(WorkoutContext);
	const isMounted = useRef(true);

	const [workoutSearch, setWorkoutSearch] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [showSearchResults, setShowSearchResults] = useState(false);

	const navigate = useNavigate()

	const auth = getAuth();
	useEffect(() => {
		if(auth.currentUser === null || auth.currentUser === undefined) {
			navigate('/')
			return
		}

		setActiveLink(window.location.pathname);

		if (isMounted) {
			const getUserWorkouts = async () => {
				const docRef = doc(db, 'users', auth.currentUser.uid);
				const docSnap = await getDoc(docRef);
				setUserWorkouts(docSnap.data().workouts);
			};

			getUserWorkouts();
		}

		return () => {
			isMounted.current = false;
		};
	}, [isMounted]);

	// Capitalizes the first letter of each word of the workout
	const formatString = str => {
		const formattedString = str
			.split(' ')
			.map(word => {
				if (word[0] === '(') {
					return word.replace(word[1], word[1].toUpperCase());
				}
				return word.replace(word[0], word[0].toUpperCase());
			})
			.join(' ');
		return formattedString;
	};

	const workoutSearchFunc = () => {
		const filteredWorkouts = [];

		// Get the recommended workouts based on users search, then pushes to the filteredWorkouts array
		workoutList.forEach(workout => {
			if (workout.workoutName.includes(workoutSearch)) {
				filteredWorkouts.push(formatString(workout.workoutName));
			}
		});

		// Sets searchResults to the first 10 results in alphabetical order
		setSearchResults(filteredWorkouts.sort((a, b) => a - b).slice(0, 10));
	};

	const onChange = e => {
		setWorkoutSearch(e.target.value.toLowerCase());

		// If nothing is in the search bar if the user erases their search input
		if (e.target.value.length === 0) {
			setShowSearchResults(false);
			setSearchResults([]);
			return;
		}
		workoutSearchFunc();
		setShowSearchResults(true);
	};

	

	return (
		<div id="workouts" className="page">
			<div className="container">
				<h1>Workouts</h1>
				<div
					className="workoutSearchBar"
					// onBlur={() => {
					// 	setShowSearchResults(false);
					// }}
				>
					<input
						type="text"
						placeholder="Search to add workout"
						name="workoutSearch"
						id="workoutSearch"
						value={workoutSearch}
						onChange={onChange}
					/>
					{workoutSearch.length === 0 ? <FaSearch className="icon" /> : <FaTimes className='icon' onClick={() => {
						setWorkoutSearch('')	
						setSearchResults([])
						setShowSearchResults(false)
						}}/>}
					<ul
						className={`searchResultsContainer ${
							showSearchResults ? 'active' : ''
						}`}
					>
						{showSearchResults && searchResults.length === 0 && (
							<SearchResult key={1} result={'No workout found.'} showButton={false} />
						)}
						{searchResults.map((result, i) => (
							<li>
								<SearchResult key={i} result={result} showButton={true} setShowSearchResults={setShowSearchResults} setWorkoutSearch={setWorkoutSearch}/>
							</li>
						))}
					</ul>
				</div>

				{userWorkouts.map(({ sets, type, workout, equipment }, i) => (
					<UserWorkoutItem
						key={i}
						sets={sets}
						type={type}
						workout={workout}
						equipment={equipment}
					/>
				))}
			</div>
		</div>
	);
}

export default Workouts;
