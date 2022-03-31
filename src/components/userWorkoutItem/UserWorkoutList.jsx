import React, { useEffect, useState, useContext } from 'react';
import WorkoutContext from '../../context/workoutContext/WorkoutContext';
import UserWorkoutItem from './UserWorkoutItem';

function UserWorkoutList({ date, userExercises }) {
	const [workoutDate, setWorkoutDate] = useState('');
	const { formatDate, dateFormat, userWorkouts } = useContext(WorkoutContext);
	const [weeksOld, setWeeksOld] = useState('');
	const [lastWorkoutOfWeek, setLastWorkoutOfWeek] = useState(false);

	const checkForWeeksOld = () => {
		const dateOfWorkout = Number(date.split(' ')[0]);
		const todaysDate = Number(dateFormat().split(' ')[0]);
		const daysOld = todaysDate - dateOfWorkout;

		const weeksAgoNum = String(daysOld / 7)[0];
		let weeksAgo;

		const thisMonth = String(todaysDate).slice(4, 6);
		const workoutMonth = String(dateOfWorkout).slice(4, 6);

		if (daysOld >= 30) {
			const monthsOld = +thisMonth - +workoutMonth;

			// Checks if this is a new year
			if (monthsOld <= 0) {
				const thisYear = String(todaysDate).slice(0, 4);
				const workoutYear = String(dateOfWorkout).slice(0, 4);
				const yearsOld = +thisYear - +workoutYear;
				setWeeksOld(`${yearsOld} year${yearsOld > 1 ? 's' : ''} ago`);
				return;
			}
			setWeeksOld(`${monthsOld} month${monthsOld > 1 ? 's' : ''} ago`);
			return;
		}

		if (weeksAgoNum === '1') {
			weeksAgo = 'Last week';
		} else if (weeksAgoNum === '0') {
			weeksAgo = '';
		} else {
			weeksAgo = `${weeksAgoNum} weeks ago`;
		}
		setWeeksOld(weeksAgo);
	};

	useEffect(() => {
		setWorkoutDate(formatDate(date));
		// checkForWeeksOld();
		checkWorkoutsThisWeek(date, userWorkouts);
	}, [userWorkouts]);

	const checkWorkoutsThisWeek = (date, array) => {
		// + sign changes it to a number instead of a string
		const daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		const [dateOfWorkout, dayOfweek] = date.split(' ');

		const weekRangeStart = +dateOfWorkout - +daysArray.indexOf(dayOfweek);
		const weekRangeEnd = +dateOfWorkout - +daysArray.indexOf(dayOfweek) + 6;

		const lastWorkoutOfThisWeek = array.filter(workout => {
			const dateOfWorkout = +workout.date.split(' ')[0];
			if (dateOfWorkout >= weekRangeStart && dateOfWorkout <= weekRangeEnd) {
				return workout;
			}
		})[0].date;

		if (date === lastWorkoutOfThisWeek) {
			// State Update
			setLastWorkoutOfWeek(true);

			checkForWeeksOld();
		}
	};

	return (
		<>
			{lastWorkoutOfWeek && weeksOld !== '0 Week ago' && (
				<h3 className="weeksAgo">{weeksOld}</h3>
			)}
			<div className="userWorkoutList">
				<h3 className="workoutDate">{workoutDate}</h3>
				<div className="workoutsListContainer">
					{userExercises.map(({ sets, type, exercise, _id }, i) => (
						<UserWorkoutItem
							key={_id}
							id={_id}
							sets={sets}
							type={type}
							workout={exercise}
							date={date}
						/>
					))}
				</div>
			</div>
		</>
	);
}

export default UserWorkoutList;
