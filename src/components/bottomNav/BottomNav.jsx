import React, {useContext, useState} from 'react'
import AppContext from '../../context/appContext/AppContext'
import {FaHome, FaUser, FaWeight, FaDumbbell} from 'react-icons/fa'
import {Link, useParams} from 'react-router-dom'

function BottomNav() {
    const {loggedIn} = useContext(AppContext)
    const {activeLink} = useContext(AppContext)

    

  return (
    <div id="bottom-nav" className={Boolean(loggedIn) ? "" : 'inactive'}>
        <div className="container">
            <Link to='/' ><FaWeight className='bottom-nav-icon'/></Link>
            <Link to='/workouts' id='workoutsLink' className={activeLink === '/workouts' ? 'active' : ''} ><FaDumbbell className='bottom-nav-icon'/></Link>
            <Link to='/' id='homeLink' className={activeLink === '/' ? 'active' : ''} ><FaHome className='bottom-nav-icon '/></Link>
            <Link to='/'><FaUser className='bottom-nav-icon'/></Link>
        </div>
    </div>
  )
}

export default BottomNav