import React, { useState } from 'react';
import Set from './Set';
import AddWorkout from '../AddWorkout';
import { FaChevronUp } from 'react-icons/fa';

function UserWorkoutItem() {
	const [showSets, setShowSets] = useState(false);
  const [cancelSet, setCancelSet] = useState(false)

	const onClick = () => {
   if(cancelSet) {
     setCancelSet(!cancelSet)
     setShowSets(!showSets)
   } else {
     setShowSets(!showSets)
   }
	};

  const addSet = (e) => {
    e.preventDefault()

    if(showSets) {
      setCancelSet(!cancelSet)
    } else {
      setShowSets(!showSets)
      setCancelSet(!cancelSet)
    }
    
  }
	return (
		<>
			<div className="userWorkoutItem">
				<button className={`addSetBtn ${cancelSet ? 'active' : ''}`} onClick={addSet}>{cancelSet ? 'Cancel' : 'Add Set'}</button>
				<h1 className="workoutTitle">Incline Chest Press</h1>
				<h3 className="equipmentTitle">(Cable)</h3>
				<div className="infoContainer">
					<p>Sets: 3</p>
					<p>Max Weight: 225 lbs</p>
				</div>
				<div className="workoutDetails">
					<Set showSets={showSets} />
					<Set showSets={showSets} />
				</div>
				<div className="arrowContainer">
					<FaChevronUp className={`arrow ${showSets ? 'active' : ''}`} onClick={onClick} />
				</div>
			</div>
		</>
	);
}

export default UserWorkoutItem;
