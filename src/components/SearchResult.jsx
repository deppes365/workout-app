import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import WorkoutContext from '../context/workoutContext/WorkoutContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

function SearchResult({
	result,
	showButton,
	setShowSearchResults,
	setWorkoutSearch,
}) {
	const { userWorkouts, setUserWorkouts } = useContext(WorkoutContext);

	const onClick = async e => {
		const dateFormat = () => {
			const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

			const day = new Date().getDay();
			const year = new Date().getFullYear();
			let month = String(new Date().getMonth() + 1);
			let date = String(new Date().getDate());

			if (date.length === 1) {
				date = date.padStart(2, 0);
			}

			if (month.length === 1) {
				month = month.padStart(2, 0);
			}

			return `${year}${month}${date} ${daysOfWeek[day]}`;
		};

		const createNewWorkout = () => {
			const workoutId = uuidv4();
			const initialSetId = uuidv4();

			return {
				_id: workoutId,
				timestamp: dateFormat(),
				type: 'anaerobic',
				workout: result,
				equipment: '',
				sets: [
					{
						_id: initialSetId,
						set: 1,
						reps: 0,
						weight: 0,
					},
				],
			};
		};

		const newWorkout = createNewWorkout();

		try {
			const auth = getAuth();
			const docRef = doc(db, 'users', auth.currentUser.uid);
			await updateDoc(docRef, {
				workouts: [...userWorkouts, newWorkout],
			});
		} catch (error) {
			return toast.error('Could not add workout.');
		}

		setUserWorkouts([...userWorkouts, newWorkout]);

		setWorkoutSearch('');
		setShowSearchResults(false);
	};

	return (
		<div className="searchResult">
			<p>{`${result}`}</p>
			{showButton && (
				<button className="addWorkoutBtn" onClick={onClick}>
					Add
				</button>
			)}
		</div>
	);
}

export default SearchResult;
