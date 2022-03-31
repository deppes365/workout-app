import React, { useContext, useEffect,  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/appContext/AppContext';
import { getAuth } from 'firebase/auth';
import { FaSearch, FaTimes } from 'react-icons/fa';
import WorkoutContext from '../../context/workoutContext/WorkoutContext';
import { workoutList } from '../../WorkoutList';
import SearchResult from '../../components/SearchResult';
import UserWorkoutList from '../../components/userWorkoutItem/UserWorkoutList';

function Workouts() {
	const { setActiveLink } = useContext(AppContext);
	const { userWorkouts, dateFormat, formatDate, formatString } = useContext(WorkoutContext);

	const [workoutSearch, setWorkoutSearch] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [showSearchResults, setShowSearchResults] = useState(false);
	const [noWorkoutsToday, setNoWorkoutsToday] = useState(false);

	// Displays a message if the user doesn't have any workouts today
	const checkForTodaysWorkouts = () => {
		const today = dateFormat();
		const todaysWorkouts = userWorkouts.filter(
			workout => workout.date === today
		);
		if (!todaysWorkouts.length) {
			setNoWorkoutsToday(true);
		} else {
			setNoWorkoutsToday(false);
		}
	};

	const navigate = useNavigate();

	const auth = getAuth();

	useEffect(() => {
		// If user is not signed in, redirect to sign in
		if (auth.currentUser === null || auth.currentUser === undefined) {
			navigate('/');
			return;
		}

		// Sets bottom nav active link to home page
		setActiveLink(window.location.pathname);

		checkForTodaysWorkouts();

		// eslint-disable-next-line
	}, [userWorkouts]);

	
	

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
				<div className="workoutSearchBar">
					<input
						type="text"
						placeholder="Search to add workout"
						name="workoutSearch"
						id="workoutSearch"
						value={workoutSearch}
						onChange={onChange}
						autoComplete="off"
					/>
					{workoutSearch.length === 0 ? (
						<FaSearch className="icon" />
					) : (
						<FaTimes
							className="icon"
							onClick={() => {
								setWorkoutSearch('');
								setSearchResults([]);
								setShowSearchResults(false);
							}}
						/>
					)}
					<ul
						className={`searchResultsContainer ${
							showSearchResults ? 'active' : ''
						}`}
					>
						{showSearchResults && searchResults.length === 0 && (
							<SearchResult
								key={1}
								result={'No workout found.'}
								showButton={false}
							/>
						)}
						{searchResults.map((result, i) => (
							<li key={i}>
								<SearchResult
									result={result}
									showButton={true}
									setShowSearchResults={setShowSearchResults}
									setWorkoutSearch={setWorkoutSearch}
								/>
							</li>
						))}
					</ul>
				</div>
				<div className="workoutsContainer">
					{noWorkoutsToday ? (
						<>
							<h3 className="workoutDate">{formatDate(dateFormat())}</h3>
							<p className="noWorkoutsMessage">
								No workouts today. <br />
								Search for a workout to started!
							</p>
						</>
					) : (
						''
					)}
					{userWorkouts.map(({ date, workouts }) => (
						<UserWorkoutList date={date} userExercises={workouts} key={date} />
					))}
				</div>
			</div>
		</div>
	);
}

export default Workouts;
