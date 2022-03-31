import React, {useEffect, useContext} from 'react'
import AppContext from '../../context/appContext/AppContext'

function Profile() {
    const {setActiveLink} = useContext(AppContext)
    
    useEffect(() => {
        setActiveLink(window.location.pathname);
    }, [])

  return (
    <div id='profile' className='page'>
        <div className="container">
            <div className="userPhoto">
                <img src="" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Profile