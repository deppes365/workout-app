import React, { useContext, useEffect, useRef } from 'react';
import AppContext from '../../context/appContext/AppContext';
import app, { db } from '../../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import WorkoutContext from '../../context/workoutContext/WorkoutContext';
import UserWorkoutItem from '../../components/userWorkoutItem/UserWorkoutItem';

function Workouts() {
	const { setActiveLink, fetchedUserWorkouts } = useContext(AppContext);
	const { userWorkouts, setUserWorkouts } = useContext(WorkoutContext);
	const isMounted = useRef(true);

	const auth = getAuth();
	useEffect(() => {
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

	return (
		<div id="workouts" className="page">
			<div className="container">
				<h1>Workouts</h1>
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
