import React, {useContext} from 'react'
import AppContext from '../../context/AppContext'
import {FaHome, FaUser, FaWeight, FaDumbbell} from 'react-icons/fa'
import {Link} from 'react-router-dom'

function BottomNav() {
    const {loggedIn} = useContext(AppContext)
  return (
    <div id="bottom-nav" className={Boolean(loggedIn) ? "" : 'inactive'}>
        <div className="container">
            <Link to='/'><FaWeight className='bottom-nav-icon'/></Link>
            <Link to='/'><FaDumbbell className='bottom-nav-icon'/></Link>
            <Link to='/' className='active'><FaHome className='bottom-nav-icon '/></Link>
            <Link to='/'><FaUser className='bottom-nav-icon'/></Link>
        </div>
    </div>
  )
}

export default BottomNav