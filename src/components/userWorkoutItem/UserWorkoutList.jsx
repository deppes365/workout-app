import React, { useEffect, useState, useContext } from 'react';
import WorkoutContext from '../../context/workoutContext/WorkoutContext';
import UserWorkoutItem from './UserWorkoutItem';

function UserWorkoutList({ date, userExercises }) {
	const [workoutDate, setWorkoutDate] = useState('');
	const { formatDate, userWorkouts } = useContext(WorkoutContext);
	const [weeksOld, setWeeksOld] = useState('');
	const [lastWorkoutOfWeek, setLastWorkoutOfWeek] = useState(false);

	const calcDaysAgo = date => {
		const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		const today = new Date();
		const todaysDate = today.getDate();
		const thisMonth = today.getMonth();
		const thisYear = today.getFullYear();

		const dayOfTheYear =
			daysInMonths.slice(0, thisMonth).reduce((acc, cur) => cur + acc, 0) +
			todaysDate;

		const incomingDateYear = +date.slice(0, 4);
		const incomingDateMonth = +date.slice(4, 6);
		const incomingDateDate = +date.slice(6, 8);

		const incomingDateDayOfTheYear =
			daysInMonths
				.slice(0, incomingDateMonth - 1)
				.reduce((acc, cur) => cur + acc, 0) + incomingDateDate;

		let daysAgo = dayOfTheYear - incomingDateDayOfTheYear;

		//if date compared to was last year
		if (thisYear - incomingDateYear >= 1) {
			const diffInYears = thisYear - incomingDateYear;
			daysAgo =
				365 * (diffInYears - 1) +
				(365 - incomingDateDayOfTheYear) +
				dayOfTheYear;
		}

		if (daysAgo >= 365) {
			let yearsAgo = Math.floor(daysAgo / 365);
			return setWeeksOld(`${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`);
		} else if (daysAgo >= 30) {
			let monthsAgo = Math.floor(daysAgo / 30);
			return setWeeksOld(`${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`);
		} else if (daysAgo === 1) {
			return;
		} else if (daysAgo < 30 && daysAgo >= 7) {
			let weeks = Math.floor(daysAgo / 7);

			if (weeks === 1) {
				return setWeeksOld('Last week');
			} else {
				return setWeeksOld(`${weeks} weeks ago`);
			}
		}
	};

	useEffect(() => {
		setWorkoutDate(formatDate(date));
		// checkForWeeksOld();
		checkWorkoutsThisWeek(date, userWorkouts);
		// eslint-disable-next-line
	}, [userWorkouts]);

	const checkWorkoutsThisWeek = (date, array) => {
		// + sign changes it to a number instead of a string
		const daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		const [dateOfWorkout, dayOfweek] = date.split(' ');

		const weekRangeStart = +dateOfWorkout - +daysArray.indexOf(dayOfweek);
		const weekRangeEnd = +dateOfWorkout - +daysArray.indexOf(dayOfweek) + 6;

		// eslint-disable-next-line
		const lastWorkoutOfThisWeek = array.filter(workout => {
			const dateOfWorkout = +workout.date.split(' ')[0];
			if (dateOfWorkout >= weekRangeStart && dateOfWorkout <= weekRangeEnd) {
				return workout;
			}
		})[0].date;

		if (date === lastWorkoutOfThisWeek) {
			// State Update
			setLastWorkoutOfWeek(true);

			// checkForWeeksOld();
			calcDaysAgo(date);
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
