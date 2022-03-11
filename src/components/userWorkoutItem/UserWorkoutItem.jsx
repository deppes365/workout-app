import React, { useState, useContext } from 'react';
import WorkoutContext from '../../context/workoutContext/WorkoutContext';
import Set from './Set';
import AddWorkout from '../AddWorkout';
import { FaChevronUp } from 'react-icons/fa';

function UserWorkoutItem({ setsNum, sets, workout, equipment }) {
	const [showSets, setShowSets] = useState(false);
	const [cancelSet, setCancelSet] = useState(false);

	const onClick = () => {
		if (cancelSet) {
			setCancelSet(!cancelSet);
			setShowSets(!showSets);
		} else {
			setShowSets(!showSets);
		}
	};

	const addSet = e => {
		e.preventDefault();

		if (showSets) {
			setCancelSet(!cancelSet);
		} else {
			setShowSets(!showSets);
			setCancelSet(!cancelSet);
		}
	};
	return (
		<>
			<div className="userWorkoutItem">
				<button
					className={`addSetBtn ${cancelSet ? 'active' : ''}`}
					onClick={addSet}
				>
					{cancelSet ? 'Cancel' : 'Add Set'}
				</button>
				<h1 className="workoutTitle">{workout}</h1>
				<h3 className="equipmentTitle">{`(${equipment})`}</h3>
				<div className="infoContainer">
					<p>Sets: {setsNum}</p>
					<p>Max Weight: 225 lbs</p>
				</div>
				<div className="workoutDetails">
					{sets.map(({ set, reps, weight }, i) => (
						<Set key={i} setNum={set} reps={reps} weight={weight} showSets={showSets}/>
					))}
				</div>
				<div className="arrowContainer">
					<FaChevronUp
						className={`arrow ${showSets ? 'active' : ''}`}
						onClick={onClick}
					/>
				</div>
			</div>
		</>
	);
}

export default UserWorkoutItem;
