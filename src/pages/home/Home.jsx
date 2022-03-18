import React, { useState, useEffect, useContext, useRef } from 'react';
import AppContext from '../../context/appContext/AppContext';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../../firebase.config';
import './home.scss';
import { FaRunning, FaWeight } from 'react-icons/fa';

function Home() {
	const [userData, setUserData] = useState({});
	const { name } = userData;

	const { setLoggedIn, setActiveLink } = useContext(AppContext);

	const navigate = useNavigate();

	const isMounted = useRef(true);

	const auth = getAuth(app);

	// Once user comes to site, checks if logged in.
	// If a user is not logged in, redirect to sign in
	useEffect(() => {
		if (isMounted) {
			onAuthStateChanged(auth, user => {
				if (user) {
					const user = auth.currentUser;
					if (user !== null) {
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
				}
			});
		}

		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, [isMounted]);

	useEffect(() => {
		setActiveLink(window.location.pathname);
		// eslint-disable-next-line
	}, []);

	return (
		<div id="home" className="page">
			<div className="container">
				<h1>Welcome back {name}</h1>
				<div className="overview-container">
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
