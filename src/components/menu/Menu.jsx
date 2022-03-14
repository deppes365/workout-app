import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../../context/appContext/AppContext';

function Menu({ toggleTheme, darkMode }) {
	const { loggedIn, setLoggedIn, signOutUser, menuActive, setMenuActive } =
		useContext(AppContext);

	const navigate = useNavigate();

	const onLogout = e => {
		e.preventDefault();
		signOutUser();
		setLoggedIn(false);
		setMenuActive(false);
		navigate('/');
	};

	return (
		<div className={`menu ${menuActive ? 'active' : ''}`}
        onClick={() => setMenuActive(false)}>
        <div className='themeDiv'>
            <button className='themeBtn' onClick={(e) => {
                e.preventDefault()
                toggleTheme()
            }}>{darkMode ? 'Light Mode' : "Dark Mode"}</button>
        </div>
			<ul
			>
				{loggedIn ? (
					<>
						<li>
							<Link className="nav-link" to="/">
								Home
							</Link>
						</li>
						<li>
							<Link className="nav-link" to="/">
								Profile
							</Link>
						</li>
						<li>
							<Link className="nav-link" to="/">
								Settings
							</Link>
						</li>
						<li>
							<button className="logoutBtn" onClick={onLogout}>
								Log Out
							</button>
						</li>
					</>
				) : (
					<>
						<li>
							<Link className="nav-link" to="/">
								Sign In
							</Link>
						</li>
						<li>
							<Link className="nav-link" to="/register">
								Sign Up
							</Link>
						</li>
					</>
				)}
			</ul>
		</div>
	);
}

export default Menu;
