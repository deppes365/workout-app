import React, { useState, useContext, useEffect } from 'react';
import WorkoutContext from '../../context/workoutContext/WorkoutContext';
import Set from './Set';
import { FaChevronUp, FaEllipsisV } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

function UserWorkoutItem({ sets, workout, id, date }) {
	const [showSets, setShowSets] = useState(false);
	const [userSets, setUserSets] = useState(sets);
	const { unit, userWorkouts, unitConverter, dispatch } =
		useContext(WorkoutContext);
	const [newSetAdded, setNewSetAdded] = useState(false);
	const [newMaxWeight, setNewMaxWeight] = useState(0);
	const [showRemove, setShowRemove] = useState(false);
	const [showPrompt, setShowPrompt] = useState(false)

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
			document.querySelector('.workoutDetails').scrollTop =
				document.querySelector('.workoutDetails').scrollHeight;
		}, 10);
	};

	const onDelete = async () => {
		const filteredWorkoutDate = userWorkouts.filter(workout => {
			return workout.date === date;
		});

		const workoutsToKeep = filteredWorkoutDate[0].workouts.filter(workout => {
			return workout._id !== id;
		});

		filteredWorkoutDate[0].workouts = workoutsToKeep;

		const filteredUserWorkouts = userWorkouts.filter(workout => {
			return workout.date !== date;
		});

		console.log(filteredUserWorkouts);

		let updatedWorkouts = [...filteredWorkoutDate, ...filteredUserWorkouts];

		if (!filteredWorkoutDate[0].workouts.length) {
			updatedWorkouts = [...filteredUserWorkouts];
		}

		try {
			const auth = getAuth();
			const docRef = doc(db, 'users', auth.currentUser.uid);
			await updateDoc(docRef, {
				workouts: [...updatedWorkouts],
			});

			dispatch({ type: 'UPDATE_WORKOUTS', payload: [...updatedWorkouts] });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div
				className="userWorkoutItem"
				onClick={() => {
					showRemove && setShowRemove(false);
				}}
			>
				<FaEllipsisV
					className="ellipsis"
					onClick={() => setShowRemove(!showRemove)}
				/>
				<ul className={`dropDown ${showRemove && 'active'}`} onClick={() => setShowPrompt(true)}>
					<li>Remove</li>
				</ul>
				<h1 className="workoutTitle">{workout}</h1>
				{/* <h3 className="equipmentTitle">{`(${equipment})`}</h3> */}
				<div className="infoContainer">
					<p>Sets: {sets.length}</p>
					<p>{`Max weight: ${unitConverter(
						unit,
						newMaxWeight,
						'client',
						'pounds'
					)} ${unit === 'imperial' ? 'Lbs' : 'Kg'}`}</p>
					<button className="addSetBtn" onClick={addSet}>
						Add Set
					</button>
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
			<div className={`prompt ${showPrompt && 'active'}`}>
				<div className="promptBG"></div>
				<div className="promptContent">
				<p>Are you sure you want to remove this workout?</p>
				<div className="btnDiv">
					<button onClick={onDelete}>Yes</button>
					<button onClick={() => setShowPrompt(false)}>Cancel</button>
				</div>
				</div>
			</div>
		</>
	);
}

export default UserWorkoutItem;
