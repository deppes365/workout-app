import React, { useState, useEffect, useContext, useRef } from 'react';
import AppContext from '../../context/appContext/AppContext';
import WorkoutContext from '../../context/workoutContext/WorkoutContext';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import './home.scss';
import { FaRunning, FaWeight } from 'react-icons/fa';

function Home() {
	const [userData, setUserData] = useState({});
	const { name } = userData;

	const {
		loggedIn,
		setLoggedIn,
		setActiveLink,
		userRef
	} = useContext(AppContext);
	const { getUserInfoFromDB } = useContext(WorkoutContext);

	const navigate = useNavigate();

	const isMounted = useRef(true);

	const auth = getAuth();

	

	
	// Once user comes to site, checks if logged in.
	// If a user is not logged in, redirect to sign in
	
	useEffect(() => {
		// Sets bottom nav active link to home page
		setActiveLink(window.location.pathname);
		if (isMounted) {
			onAuthStateChanged(auth, user => {
				if (loggedIn) return;
				// Checks if there is a user signed in
				if (user) {
					const user = auth.currentUser;
					// Sets logged in status
					if (user !== null) {
						const fetchUserData = async () => {
							await getUserInfoFromDB();
						};

						fetchUserData();
						
						setLoggedIn(true);

						setUserData({
							name: auth.currentUser.displayName.split(' ')[0],
						});
					} else {
						console.log("User Doesn't exist");
					}
				} else {
					setLoggedIn(false);
					navigate('/');
					return;
				}
			});
		}

		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, [isMounted, userRef]);

	

	return (
		<div id="home" className="page">
			<div className="container">
				<h1>Welcome back {name}</h1>
				<div className="overview-container">
					<div className="grid-item-container">
						<div className="grid-item">
							<p>Cardio Workouts This Week</p>
							<FaRunning className="overview-icon" />
						</div>
						<div className="grid-item">
							<p>Current Weight</p>
							<FaWeight className="overview-icon" />
						</div>
					</div>
					<div className="grid-item-container">
						<div className="grid-item">
							<p>Workouts This Week</p>
							<FaRunning className="overview-icon" />
						</div>
						<div className="grid-item">
							<p>Current Weight</p>
							<FaWeight className="overview-icon" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
