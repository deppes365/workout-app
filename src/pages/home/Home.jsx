import React, {useState, useEffect, useContext, useRef} from 'react'
import AppContext from '../../context/appContext/AppContext'
import { useNavigate } from 'react-router-dom'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import app from '../../firebase.config'
import "./home.scss"

function Home() {
    const [userData, setUserData] = useState({})
    const {name} = userData
    const {loggedIn, setLoggedIn, setActiveLink} = useContext(AppContext)

    const navigate = useNavigate()

    const isMounted = useRef(true)

    const auth = getAuth(app)
    
    // Once user comes to site, checks if logged in.
    // If a user is not logged in, redirect to sign in
    useEffect(() => {
        
        if(isMounted.current) {
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    const user = auth.currentUser
                    if(user !== null) {
                        setLoggedIn(true)
                        setUserData({
                            name: auth.currentUser.displayName
                        })
                    } else {
                        console.log('User Doesn\'t exist');
                    }
                } else{
                    setLoggedIn(false)
                    navigate('/sign-in')
                }   
            })
        }


        return () => {
            isMounted.current = false
        }
        
        
    },[onAuthStateChanged, isMounted]);

    useEffect(()=> {
        setActiveLink(window.location.pathname)
    }, [])

    
  return (
    <div id='home' className='page'>
        <div className="container">
            <h1>Welcome back {name}</h1>
        </div>
    </div>
  )
}

export default Home