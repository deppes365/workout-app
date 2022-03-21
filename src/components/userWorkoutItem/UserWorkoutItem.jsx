import React, { useState } from 'react';
import Set from './Set';
import { v4 as uuidv4 } from 'uuid';
import { FaChevronUp } from 'react-icons/fa';

function UserWorkoutItem({ sets, workout, equipment, id }) {
	const [showSets, setShowSets] = useState(false);
	const [userSets, setUserSets] = useState(sets);

	const onClick = () => {
		setShowSets(!showSets);
	};

	const newSet = {
		_id: uuidv4(),
		set: userSets.length + 1,
		reps: 0,
		weight: 0,
	};

	const addSet = e => {
		e.preventDefault();

		if (!showSets) {
			setShowSets(!showSets);
		}

		setUserSets([...userSets, newSet]);
	};

	return (
		<>
			<div className='userWorkoutItem'>
				<button className="addSetBtn" onClick={addSet}>
					Add Set
				</button>
				<h1 className="workoutTitle">{workout}</h1>
				<h3 className="equipmentTitle">{`(${equipment})`}</h3>
				<div className="infoContainer">
					<p>Sets: {sets.length}</p>
					<p>Max Weight: 225 lbs</p>
				</div>
				<div className={`workoutDetails ${showSets ? 'active' : ''}`}>
					{userSets.map(({ set, reps, weight }, i) => (
						<Set
							key={i}
							setNum={set}
							reps={reps}
							weight={weight}
							workoutId={id}
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
