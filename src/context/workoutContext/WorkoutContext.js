import { createContext, useReducer } from 'react';
import WorkoutReducer from './WorkoutReducer';

import { getAuth } from 'firebase/auth';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const auth = getAuth();

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
	////////// Initial State //////////
	const initialState = {
		email: '',
		name: '',
		height: 0,
		weight: 0,
		unit: 0,
		useRef: '',
		weighIns: [],
		workouts: [],
	};

	const [state, dispatch] = useReducer(WorkoutReducer, initialState);

	////////// Actions //////////

	const getUserInfoFromDB = async () => {
		if (auth.currentUser.uid) {
			try {
				const docRef = doc(db, 'users', auth.currentUser.uid);
				const docSnap = await getDoc(docRef);
				const userData = docSnap.data();

				if (docSnap.exists()) {
					dispatch({
						type: 'GET_USER_INFO',
						payload: userData,
					});
				} else {
					toast.error("Looks like your profile hasn't been set up yet.");
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			return;
		}
	};

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

	const createNewWorkout = async workoutName => {
		const today = dateFormat();

		const workoutToAddTo = state.workouts.filter(workout => {
			if (workout.date === today) {
				return workout;
			}
		});

		if (!workoutToAddTo.length) {
			const workoutId = uuidv4();

			const newWorkout = {
				date: today,
				workouts: [
					{
						_id: workoutId,
						exercise: workoutName,
						type: 'anaerobic',
						sets: [],
						equipment: 'Barbell',
					},
				],
			};

			// Save to database
			try {
				const auth = getAuth();
				const docRef = doc(db, 'users', auth.currentUser.uid);
				await updateDoc(docRef, {
					workouts: [newWorkout, ...state.workouts],
				});

				dispatch({
					type: 'CREATE_NEW_WORKOUT',
					payload: [newWorkout, ...state.workouts],
				});
			} catch (error) {
				toast.error('Could not add workout');
			}
		} else {
			const workoutId = uuidv4();

			const newWorkout = {
				_id: workoutId,
				type: 'anaerobic',
				exercise: workoutName,
				equipment: '',
				sets: [],
			};

			const workoutsNotUpdated = state.workouts.filter(workout => {
				if (workout.date !== today) {
					return workout;
				}
			});

			const { date, workouts } = workoutToAddTo[0];

			const updatedWorkoutsObject = [
				{
					date,
					workouts: [...workouts, newWorkout],
				},
				...workoutsNotUpdated,
			];

			try {
				const auth = getAuth();
				const docRef = doc(db, 'users', auth.currentUser.uid);
				await updateDoc(docRef, {
					workouts: [...updatedWorkoutsObject],
				});

				dispatch({
					type: 'CREATE_NEW_WORKOUT',
					payload: [...updatedWorkoutsObject],
				});
			} catch (error) {
				return toast.error('Could not add workout.');
			}
		}
	};

	////////// Return //////////
	return (
		<WorkoutContext.Provider
			value={{
				email: state.email,
				name: state.name,
				userRef: state.userRef,
				height: state.height,
				weight: state.weight,
				sex: state.sex,
				unit: state.unit,
				userWorkouts: state.workouts,
				weighIns: state.weightIns,
				getUserInfoFromDB,
				createNewWorkout,
				dispatch,
				dateFormat,
			}}
		>
			{children}
		</WorkoutContext.Provider>
	);
};

export default WorkoutContext;
