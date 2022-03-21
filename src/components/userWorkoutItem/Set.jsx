import { FaEdit, FaCheckSquare } from 'react-icons/fa';
import { useState, useContext } from 'react';
import WorkoutContext from '../../context/workoutContext/WorkoutContext';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import {toast} from 'react-toastify'

function Set({ setNum, reps, weight, showSets, workoutId }) {
	const [editSets, setEditSets] = useState(false);

	const {userWorkouts, setUserWorkouts} = useContext(WorkoutContext);

	// keeps the previous data
	const [initialReps, setInitialReps] = useState(reps);
	const [initialWeight, setInitialWeight] = useState(weight);

	//new data set by user
	const [stateReps, setStateReps] = useState(reps);
	const [stateWeight, setStateWeight] = useState(weight);

	const handleEdit = () => {
		setEditSets(!editSets);
	};

	const onSave = async () => {
		if (initialReps !== stateReps || initialWeight !== stateWeight) {
			try {
				const auth = getAuth();
				const docRef = doc(db, 'users', auth.currentUser.uid);
				const docSnap = await getDoc(docRef);
				const userData = docSnap.data();
				const userWorkoutsFromDB = userData.workouts;

				const updatedWorkouts = userWorkoutsFromDB.map(workout => {
					if (workout._id === workoutId) {
						if (!workout.sets[setNum - 1]) {
							workout.sets.push({
								set: setNum,
								reps: stateReps,
								weight: stateWeight,
							});
						} else {
							workout.sets[setNum - 1].reps = stateReps;
							workout.sets[setNum - 1].weight = stateWeight;
						}
					}
					return workout;
				});

				await updateDoc(docRef, {
					workouts: [...updatedWorkouts],
				});

				setUserWorkouts([
					...updatedWorkouts
				])

				setInitialReps(stateReps);
				setInitialWeight(stateWeight);

				toast.success('Set Saved!')
			} catch (error) {
				toast.error('Error saving set')
			}
		}

		setEditSets(!editSets);
	};

	return (
		<form className={`setContainer ${showSets ? 'active' : ''}`}>
			{editSets ? (
				<FaCheckSquare className="editIcon check" onClick={onSave} />
			) : (
				<FaEdit className="editIcon" onClick={handleEdit} />
			)}
			<p className="setNumTitle">Set {setNum}</p>
			<div className="setInfoContainer">
				<div className="setInfoGroup">
					<label htmlFor="reps">Reps:</label>
					<input
						type="number"
						id="reps"
						name="reps"
						value={stateReps}
						disabled={!editSets}
						onChange={e => setStateReps(e.target.value)}
					/>
				</div>
				<div className="setInfoGroup">
					<label htmlFor="weight">Weight:</label>
					<input
						type="number"
						name="weight"
						id="weight"
						value={stateWeight}
						disabled={!editSets}
						onChange={e => setStateWeight(e.target.value)}
					/>
				</div>
			</div>
		</form>
	);
}

export default Set;
