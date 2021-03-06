import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './signup.scss';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';

import AppContext from '../../context/appContext/AppContext';
import { db } from '../../firebase.config';
import { setDoc, doc } from 'firebase/firestore';
import InitialSignUp from './InitialSignUp';
import Demographic from './Demographic';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
	const navigate = useNavigate();

	const [form, setForm] = useState(0);
	const [passwordsMatch, setPasswordsMatch] = useState(true);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
		unit: 'imperial',
		sex: 'male',
		feet: 0,
		inches: 0,
		centimeters: 0,
		weight: 0,
		height: 0,
		workouts: [],
		weighIns: [],
	});

	const {
		name,
		email,
		password,
		password2,
		unit,
		sex,
		feet,
		inches,
		centimeters,
		weight,
	} = formData;

	const { setMenuActive } = useContext(AppContext);

	useEffect(() => {
		setMenuActive(false);
	}, [setMenuActive]);

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	

	const handleNextPage = async e => {
		e.preventDefault();

		if (password !== password2) {
			formData.password = '';
			formData.password2 = '';
			return setPasswordsMatch(false);
		}

		setForm(prevState => prevState + 1);
	};

	const createUserProfile = async e => {
		e.preventDefault();

		try {
			const auth = getAuth();
			await createUserWithEmailAndPassword(auth, email, password);

			await updateProfile(auth.currentUser, {
				displayName: name,
			});

			const formDataCopy = formData;

			if (unit === 'imperial') {
				formDataCopy.height = +feet * 12 + +inches;
				formDataCopy.weight = weight;
			} else {
				formDataCopy.height = (+centimeters / 2.54).toFixed(1);
				formDataCopy.weight = (weight * 2.2).toFixed(1);
			}

			delete formDataCopy.inches;
			delete formDataCopy.feet;
			delete formDataCopy.centimeters;
			delete formDataCopy.password;
			delete formDataCopy.password2;

			const user = auth.currentUser;
			formDataCopy.userRef = user.uid;
			formDataCopy.profilePhotoUrl =
				'https://firebasestorage.googleapis.com/v0/b/workout-app-d0cfd.appspot.com/o/users%2Fdefaultuserpic.jpeg?alt=media&token=d9ffe302-5ba4-4591-a89e-0b5f86c23f3a';

			try {
				await setDoc(doc(db, 'users', user.uid), formDataCopy);

				navigate('/home');
			} catch (error) {
				console.log(error);
			}
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				toast.error('Looks like this email is already in use...');
			}
		}
	};

	const forms = [
		<InitialSignUp
			onChange={onChange}
			name={name}
			email={email}
			password={password}
			password2={password2}
			handleNextPage={handleNextPage}
			passwordsMatch={passwordsMatch}
		/>,
		<Demographic
			onChange={onChange}
			unit={unit}
			sex={sex}
			feet={feet}
			inches={inches}
			centimeters={centimeters}
			weight={weight}
			createUserProfile={createUserProfile}
		/>,
	];

	const displayForm = () => {
		return forms[form];
	};

	return (
		<div id="sign-up">
			<h1>
				Eppes
				<span>
					<em>Fit</em>
				</span>
			</h1>
			<p>Let's create your account!</p>
			{displayForm()}
			<p>
				Already have an account? <Link to="/">Sign in</Link>
			</p>
		</div>
	);
}

export default SignUp;
