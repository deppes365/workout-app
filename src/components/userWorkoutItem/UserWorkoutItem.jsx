import React, { useState, useContext, useEffect } from 'react';
import WorkoutContext from '../../context/workoutContext/WorkoutContext';
import Set from './Set';
import { FaChevronUp } from 'react-icons/fa';

function UserWorkoutItem({ sets, workout, id, date }) {
	const [showSets, setShowSets] = useState(false);
	const [userSets, setUserSets] = useState(sets);
	const { unit, userWorkouts, unitConverter } = useContext(WorkoutContext);
	const [newSetAdded, setNewSetAdded] = useState(false);
	const [newMaxWeight, setNewMaxWeight] = useState(0);

	const getMaxWeight = () => {
		const weights = sets.map(set => {
			return +set.weight;
		});

		let maxWeight = Math.max(...weights);
		if (sets.length === 0) {
			maxWeight = 0;
		}

		setNewMaxWeight(maxWeight);
	};

	useEffect(() => {
		getMaxWeight();
		setNewSetAdded(false);
		// eslint-disable-next-line
	}, [newSetAdded, userWorkouts]);

	const onClick = () => {
		setShowSets(!showSets);
	};

	const newSet = {
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

		setTimeout(() => {
			document.querySelector('.workoutDetails').scrollTop = document.querySelector('.workoutDetails').scrollHeight
		}, 10)
	};

	return (
		<>
			<div className="userWorkoutItem">
				<button className="addSetBtn" onClick={addSet}>
					Add Set
				</button>
				<h1 className="workoutTitle">{workout}</h1>
				{/* <h3 className="equipmentTitle">{`(${equipment})`}</h3> */}
				<div className="infoContainer">
					<p>Sets: {sets.length}</p>
					<p>{`Max weight: ${unitConverter(unit, newMaxWeight, 'client', 'pounds')} ${
						unit === 'imperial' ? 'Lbs' : 'Kg'
					}`}</p>
				</div>
				<div className={`workoutDetails ${showSets ? 'active' : ''}`}>
					{userSets.length ? (
						userSets.map(({ set, reps, weight }) => (
							<Set
								key={set}
								setNum={set}
								reps={reps}
								weight={weight}
								workoutId={id}
								setNewSetAdded={setNewSetAdded}
								date={date}
							/>
						))
					) : (
						<p className="noSets">No Sets Added Yet.</p>
					)}
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
