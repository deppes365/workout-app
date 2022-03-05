import React, {useContext, useEffect, useState} from 'react'
import AppContext from '../../context/AppContext'
import app, {db} from '../../firebase.config';
import {doc, getDoc} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { async } from '@firebase/util';



function Workouts() {

    const {setActiveLink} = useContext(AppContext)
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [date, setDate] = useState(null)
    const [year, setYear] = useState(null)
    const [workouts, setWorkouts] = useState({})
    const {aerobic, anaerobic} = workouts
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thusday', 'Friday', 'Saturday']

    const auth = getAuth()
    useEffect(()=> {
        setActiveLink(window.location.pathname)
        const d = new Date()
        setDay(days[d.getDay()])
        setMonth(months[d.getMonth()])
        setDate(d.getDate())
        setYear(d.getFullYear())

        const getWorkouts = async () => {
            try {
                const userRef = doc(db, 'users', auth.currentUser.uid)
                const docSnap = await getDoc(userRef)
                
                setWorkouts({
                    ...docSnap.data().workouts
                })
                console.log(docSnap.data().workouts);
                
            } catch (error) {
                console.log(error);
            }
            
        }

        getWorkouts()
        
    },[])

    return (
        <div id='workouts' className='page'>
            <div className="container">
                <div className="addWorkout">
                    <p>{`${day}, ${month} ${date}, ${year}`}</p>
                    <h1>Strength</h1>
                    
                </div>
            </div>
        </div>
    )
}

export default Workouts