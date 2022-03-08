import { isEditable } from '@testing-library/user-event/dist/utils';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../../context/appContext/AppContext';



function Menu() {
    const {loggedIn, setLoggedIn, signOutUser, menuActive, setMenuActive} = useContext(AppContext)

    const navigate = useNavigate()

    const onLogout = (e) => {
        e.preventDefault()
        signOutUser()
        setLoggedIn(false)
        setMenuActive(false)
        navigate('/')
    }

    

	return (
		<>
			<ul className={`menu ${menuActive ? 'active' : ''}`} onClick={() => setMenuActive(false)}>
				{loggedIn ? (
                    <>
					<li>
						<Link className='nav-link' to="/">
							Home
						</Link>
					</li>
                    <li>
						<Link className='nav-link' to="/">
							Profile
						</Link>
					</li>
                    <li>
						<Link className='nav-link' to="/">
							Settings
						</Link>
					</li>
                    <li>
                        <button className='logoutBtn' onClick={onLogout}>Log Out</button>
                    </li>
                    </>
				) : 
                (
                    <>
                        <li>
                            <Link className='nav-link' to='/sign-in'>Sign In</Link>
                        </li>
                        <li>
                        <Link className='nav-link' to='/register'>Sign Up</Link>
                        </li>
                        
					</>
				)}
			</ul>
		</>
	);
}

export default Menu;
