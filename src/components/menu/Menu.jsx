import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';



function Menu() {
    const {loggedIn, setLoggedIn, signOutUser, menuActive, setMenuActive} = useContext(AppContext)

    const navigate = useNavigate()

    const onClick = (e) => {
        e.preventDefault()
        signOutUser()
        setLoggedIn(false)
        setMenuActive(false)
        navigate('/')
    }

	return (
		<>
			<ul className={`menu ${menuActive ? 'active' : ''}`}>
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
                        <button className='logoutBtn' onClick={onClick}>Log Out</button>
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
