import React, {useContext} from 'react'
import AppContext from '../../context/appContext/AppContext'

function Header() {
   const {menuActive, setMenuActive} = useContext(AppContext)
   
  return (
    <div className='header'>
        <div className="container">
            <div className="logo">
                <h1>Eppes<span><em>Fit</em></span></h1>
            </div>
            <div className={`hamburger ${menuActive ? 'active' : ''}`} onClick={()=> setMenuActive(!menuActive)}>
                <div className="top-line"></div>
                <div className="middle-line"></div>
                <div className="bottom-line"></div>
            </div>
        </div>
    </div>
  )
}

export default Header