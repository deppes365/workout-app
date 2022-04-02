import React, {useContext, useEffect, useState} from 'react'
import AppContext from '../../context/appContext/AppContext'
import {FaHome, FaUser, FaWeight, FaDumbbell} from 'react-icons/fa'
import {Link} from 'react-router-dom'

function BottomNav() {
    const {loggedIn} = useContext(AppContext)
    const {activeLink} = useContext(AppContext)
    const [indicator, setIndicator] = useState('')

    useEffect(() => {
      const ind = activeLink.split('/')[1]
      setIndicator(ind);
    }, [activeLink])

    

  return (
    <div id="bottom-nav" className={Boolean(loggedIn) ? "" : 'inactive'}>
        <div className="container">
            <Link to='/' onClick={()=> setIndicator('weight')}><FaWeight className='bottom-nav-icon'/></Link>
            <Link to='/workouts' id='workoutsLink' className={activeLink === '/workouts' ? 'active' : ''} onClick={()=> setIndicator('workouts')}><FaDumbbell className='bottom-nav-icon'/></Link>
            <Link to='/home' id='homeLink' className={activeLink === '/home' ? 'active' : ''} onClick={()=> setIndicator('home')}><FaHome className='bottom-nav-icon '/></Link>
            <Link to='/profile' id='profileLink' className={activeLink === '/profile' ? 'active' : ''} onClick={()=> setIndicator('profile')}><FaUser className='bottom-nav-icon'/></Link>
            <div className={`activeLinkIndicator ${indicator}`}></div>
        </div>
    </div>
  )
}

export default BottomNav