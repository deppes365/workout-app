import React from 'react'
import Set from './Set'
import AddWorkout from '../AddWorkout'
function UserWorkoutItem() {
  return (
    <>
        <div className='userWorkoutItem'>
            <button className='addSetBtn'>Add Set</button>
            <h1 className='workoutTitle'>Incline Chest Press</h1>
            <h3 className='equipmentTitle'>(Cable)</h3>
            <div className="infoContainer">
                <p>Sets: 3</p>
                <p>Max Weight: 225 lbs</p>
            </div>
            <div className="workoutDetails">
                <Set />
                <Set />
            </div>
        </div>
    </>
  )
}

export default UserWorkoutItem