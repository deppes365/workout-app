import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signin.scss';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import AppContext from '../../context/appContext/AppContext';
import { toast } from 'react-toastify';

function SignIn() {
	const { setMenuActive } = useContext(AppContext);

	useEffect(() => {
		setMenuActive(false);
	}, []);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;
	const navigate = useNavigate();

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const onSubmit = async e => {
		e.preventDefault();

		try {
			const auth = getAuth();

			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			if (userCredential.user) {
				navigate('/home');
			}
		} catch (error) {
			console.log(error.code);
			if(error.code === 'auth/wrong-password') {
				toast.error('Wrong password.')
			}
			if(error.code === 'auth/user-not-found') {
				toast.error('No account found for this email.')
			}
		}
	};

	return (
		<div id="sign-in">
			<h1>
				Eppes
				<span>
					<em>Fit</em>
				</span>
			</h1>
			<p>Please Sign In</p>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					name="email"
					id="email"
					placeholder="Email"
					value={email}
					required
					onChange={onChange}
				/>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					value={password}
					required
					onChange={onChange}
				/>
				<button>Sign In</button>
			</form>

			<p>Don't have an account? <Link to="/register">Register</Link></p>
		</div>
	);
}

export default SignIn;
