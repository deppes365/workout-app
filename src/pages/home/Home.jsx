import React, { useState, useEffect, useContext, useRef } from 'react';
import AppContext from '../../context/appContext/AppContext';
import WorkoutContext from '../../context/workoutContext/WorkoutContext';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import app from '../../firebase.config';
import './home.scss';
import { FaRunning, FaWeight } from 'react-icons/fa';
import {toast} from 'react-toastify'

function Home() {
	const [userData, setUserData] = useState({});
	const { name } = userData;

	const { setLoggedIn, setActiveLink } = useContext(AppContext);
	const { userInfo, setUserInfo, userWorkouts, setUserWorkouts } = useContext(WorkoutContext);

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

				// Checks if there is a user signed in
				if (user) {
					const user = auth.currentUser;
					// Sets logged in status
					if (user !== null) {
						setLoggedIn(true);
						setUserData({
							name: auth.currentUser.displayName.split(' ')[0],
						});

						// Fetches userInfo from the database
						const getUserInfoFromDB = async () => {
							if (auth.currentUser.uid) {
								try {
									const docRef = doc(db, 'users', auth.currentUser.uid);
									const docSnap = await getDoc(docRef);
									const userData = docSnap.data()
				
									if(docSnap.exists()) {
										setUserInfo(userData);
										setUserWorkouts(userData.workouts)
									} else {
										toast.error('Looks like your profile hasn\'t been set up yet.')
									}
								} catch (error) {console.log(error);}
							} else {
								return;
							}
						};
				
						getUserInfoFromDB()
					} else {
						console.log("User Doesn't exist");
					}
				} else {
					setLoggedIn(false);
					navigate('/');
				}
			});
		}

		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, [isMounted]);

	

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
