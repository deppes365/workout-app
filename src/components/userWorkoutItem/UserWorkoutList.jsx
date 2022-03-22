import React, { useEffect, useState, useContext } from 'react';
import WorkoutContext from '../../context/workoutContext/WorkoutContext';
import UserWorkoutItem from './UserWorkoutItem';

function UserWorkoutList({ date, userWorkouts }) {
	const [workoutDate, setWorkoutDate] = useState('')
    const {dateFormat} = useContext(WorkoutContext)


    const formatDate = () => {
        const today = dateFormat()

        const daysOfTheWeek = {
            sun: 'Sunday',
            mon: 'Monday',
            tue: 'Tuesday',
            wed: 'Wednesday',
            thu: 'Thursday',
            fri: 'Friday',
            sat: 'Saturday'
        }

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        const dateSuffixes = ['st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st']

        const year = date.slice(0, 4)
        let month = date.slice(4, 6)
        const dateFromDate = date.slice(6, 8)
        let day = date.split(' ')[1].toLowerCase()
        let dayOfTheWeek = daysOfTheWeek[day]

        if(month[0] === '0') {
            month = month.split('')[1]
        }

        if(dateFromDate[0] === '0') {
            dateFromDate = dateFromDate.split('')[1]
        }

        console.log(dateFromDate);
        if(date === today) {
            dayOfTheWeek = 'Today'
        } else if (+today.split(' ')[0] - +date.split(' ')[0] === 1) {
            dayOfTheWeek = 'Yesterday'
        }

        return `${dayOfTheWeek}, ${months[month - 1]} ${dateFromDate}${dateSuffixes[dateFromDate - 1]}, ${year}`
    }

    useEffect(() => {
        setWorkoutDate(formatDate)
    },[userWorkouts])

	return (
		<div className="userWorkoutList">
			<h3 className="workoutDate">{workoutDate}</h3>
            <div className="workoutsListContainer">
            {userWorkouts.map(({ sets, type, exercise, _id }, i) => (
							<UserWorkoutItem
								key={i}
								id={_id}
								sets={sets}
								type={type}
								workout={exercise}
							/>
						))}
            </div>
		</div>
	);
}

export default UserWorkoutList;
