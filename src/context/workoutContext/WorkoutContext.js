import { createContext, useReducer } from 'react';
import { WorkoutReducer } from './WorkoutReducer';

import { getAuth } from 'firebase/auth';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { workoutList } from '../../WorkoutList';

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
		profilePhotoUrl: '',
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

	const formatDate = date => {
		const today = dateFormat();

		const daysOfTheWeek = {
			sun: 'Sunday',
			mon: 'Monday',
			tue: 'Tuesday',
			wed: 'Wednesday',
			thu: 'Thursday',
			fri: 'Friday',
			sat: 'Saturday',
		};

		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		const dateSuffixes = [
			'st',
			'nd',
			'rd',
			'th',
			'th',
			'th',
			'th',
			'th',
			'th',
			'th',
			'th',
			'th',
			'th',
			'th',
			'th',
			'th',
			'th',
			'th',
			'th',
			'th',
			'st',
			'nd',
			'rd',
			'th',
			'th',
			'th',
			'th',
			'th',
			'th',
			'th',
			'st',
		];

		const year = date.slice(0, 4);
		let month = date.slice(4, 6);
		let dateFromDate = date.slice(6, 8);
		let day = date.split(' ')[1].toLowerCase();
		let dayOfTheWeek = daysOfTheWeek[day];

		if (month[0] === '0') {
			month = month.split('')[1];
		}

		if (dateFromDate[0] === '0') {
			dateFromDate = dateFromDate.split('')[1];
		}

		if (date === today) {
			dayOfTheWeek = 'Today';
		} else if (+today.split(' ')[0] - +date.split(' ')[0] === 1) {
			dayOfTheWeek = 'Yesterday';
		}

		return `${dayOfTheWeek}, ${months[month - 1]} ${dateFromDate}${
			dateSuffixes[dateFromDate - 1]
		}, ${year}`;
	};

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

	const createNewWorkout = async workoutName => {
		const today = dateFormat();

		// eslint-disable-next-line
		const workoutToAddTo = state.workouts.filter(workout => {
			if (workout.date === today) {
				return workout;
			}
		});

		const workoutSelected = workoutList.filter(workout => {
			return workout.workoutName === workoutName.toLowerCase();
		});

		if (!workoutToAddTo.length) {
			const workoutId = uuidv4();

			const newWorkout = {
				date: today,
				workouts: [
					{
						_id: workoutId,
						exercise: formatString(workoutSelected[0].workoutName),
						type: workoutSelected[0].type,
						sets: [],
						equipment: '',
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
				console.log(error);
			}
		} else {
			const workoutId = uuidv4();

			const newWorkout = {
				_id: workoutId,
				exercise: formatString(workoutSelected[0].workoutName),
				type: workoutSelected[0].type,
				equipment: '',
				sets: [],
			};

			// eslint-disable-next-line
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

	const unitConverter = (unitType, num, destination, measurementType) => {
		let number = num;
		let output;

		if (unitType === 'imperial') {
			return number;
		}
		if (unitType === 'metric') {
			if (destination === 'client') {
				if (measurementType === 'inches') {
					number = num * 2.54;
				} else if (measurementType === 'feet') {
					number = num * 0.3048;
				} else if (measurementType === 'miles') {
					number = num * 1.60934;
				} else if (measurementType === 'pounds') {
					number = num * 0.453592;
				}
			} else {
				if (measurementType === 'centimeters') {
					number = num / 2.54;
				} else if (measurementType === 'meters') {
					number = num / 0.3048;
				} else if (measurementType === 'kilometers') {
					number = num / 1.60934;
				} else if (measurementType === 'kilograms') {
					number = num / 0.453592;
				}
			}
		} else {
			output = num;
		}

		let calculatedNumber = String(number.toFixed(1)).split('.');

		if (calculatedNumber[1] === '0') {
			output = calculatedNumber[0];
		} else {
			output = calculatedNumber.join('.');
		}

		return +output;
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
				profilePhotoUrl: state.profilePhotoUrl,
				getUserInfoFromDB,
				createNewWorkout,
				dispatch,
				dateFormat,
				formatDate,
				formatString,
				unitConverter,
			}}
		>
			{children}
		</WorkoutContext.Provider>
	);
};

export default WorkoutContext;
