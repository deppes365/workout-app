import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signin.scss';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebase.config'
import AppContext from '../../context/AppContext';

function SignIn() {
  const { setLoggedIn, setMenuActive} = useContext(AppContext)

  useEffect(() => {
    setMenuActive(false)
  }, [])

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
			const auth = getAuth(app);

			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			if (userCredential.user) {
        		navigate('/')
			}
		} catch (error) {
			console.log(error);
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
			
			<Link to='/register'>Don't have an account? Register here</Link>
		</div>
	);
}

export default SignIn;
