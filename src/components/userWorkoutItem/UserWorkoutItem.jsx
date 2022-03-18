import React, { useState, useContext, useRef } from 'react';
import Set from './Set';

import { FaChevronUp } from 'react-icons/fa';

function UserWorkoutItem({ sets, workout, equipment }) {
	const [showSets, setShowSets] = useState(false);
	const [cancelSet, setCancelSet] = useState(false);
	const [editSets, setEditSets] = useState(false);
	const [userSets, setUserSets] = useState(sets);

	

	const handleEdit = () => {
		setEditSets(!editSets);
	};

	const onClick = () => {
		if (cancelSet) {
			setCancelSet(!cancelSet);
			setShowSets(!showSets);
		} else {
			setShowSets(!showSets);
		}
	};

	const newSet = {
		set: userSets.length + 1,
		reps: 0,
		weight: 0,
	};

	const addSet = e => {
		e.preventDefault();

		if (showSets) {
			setCancelSet(!cancelSet);
		} else {
			setShowSets(!showSets);
			setCancelSet(!cancelSet);
		}

		setUserSets([...userSets, newSet]);
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
					<p>Sets: {sets.length}</p>
					<p>Max Weight: 225 lbs</p>
				</div>
				<div className="workoutDetails">
					{userSets.map(({ set, reps, weight }, i) => (
						<Set
							key={i}
							setNum={set}
							reps={reps}
							weight={weight}
							showSets={showSets}
							handleEdit={handleEdit}
							editSets={editSets}
						/>
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
