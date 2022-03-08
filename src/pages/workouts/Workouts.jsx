import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/appContext/AppContext';
import app, { db } from '../../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { async } from '@firebase/util';
import { fetchWorkouts } from '../../context/workoutContext/WorkoutActions';
import WorkoutContext from '../../context/workoutContext/WorkoutContext';
import UserWorkoutItem from '../../components/userWorkoutItem/UserWorkoutItem';

function Workouts() {
	const { setActiveLink, fetchedUserWorkouts } = useContext(AppContext);
	const [month, setMonth] = useState('');
	const [day, setDay] = useState('');
	const [date, setDate] = useState(null);
	const [year, setYear] = useState(null);
	
	
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thusday',
		'Friday',
		'Saturday',
	];

    const { userWorkouts, dispatch} = useContext(WorkoutContext)
    // const {aerobic, anaerobic} = userWorkouts

	const auth = getAuth();
	useEffect(() => {
		setActiveLink(window.location.pathname);
		const d = new Date();
		setDay(days[d.getDay()]);
		setMonth(months[d.getMonth()]);
		setDate(d.getDate());
		setYear(d.getFullYear());

		// const getWorkouts = async () => {
		//     try {
		//         const userRef = doc(db, 'users', auth.currentUser.uid)
		//         const docSnap = await getDoc(userRef)

		//         setWorkouts({
		//             ...docSnap.data().workouts
		//         })
		//         console.log(docSnap.data().workouts);

		//     } catch (error) {
		//         console.log(error);
		//     }

		// }

		// getWorkouts()]
        const getUserWorkouts = async () => {
            try {
                const userWorkouts = await fetchWorkouts(); 
                dispatch({type: 'GET_USER_WORKOUTS', payload: userWorkouts})
                
            } catch (error) {
                
            }
            
        }
       console.log(fetchedUserWorkouts.current);

        // Ensures user workouts are fetched once the workouts page is loaded
        if(!fetchedUserWorkouts.current) {
            getUserWorkouts()

            // Set this to false to ensure user workouts aren't fetched everytime workouts page is loaded
            fetchedUserWorkouts.current = true
        }
        
	}, []);

	return (
		<div id="workouts" className="page">
			<div className="container">
                <h1>Workouts</h1>
                <UserWorkoutItem/>
			</div>
		</div>
	);
}

export default Workouts;
