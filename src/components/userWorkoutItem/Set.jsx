import { FaEdit, FaCheckSquare } from 'react-icons/fa';
import { useState, useContext} from 'react';
import WorkoutContext from '../../context/workoutContext/WorkoutContext';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import { updateDoc, doc} from 'firebase/firestore';
import { toast } from 'react-toastify';

function Set({ setNum, reps, weight, workoutId, setNewSetAdded, date }) {
	const [editSets, setEditSets] = useState(false);

	const { userWorkouts, dispatch, unitConverter, unit } = useContext(WorkoutContext);

	// keeps the previous data
	const [initialReps, setInitialReps] = useState(reps);
	const [initialWeight, setInitialWeight] = useState(unitConverter(unit, weight, 'client', 'pounds',));

	//new data set by user
	const [stateReps, setStateReps] = useState(reps);
	const [stateWeight, setStateWeight] = useState(initialWeight);

	const handleEdit = () => {
		setEditSets(!editSets);
	};


	const onSave = async () => {
		if (initialReps !== stateReps || initialWeight !== stateWeight) {
			try {
			
				const newUserWorkouts = userWorkouts.map(workout => {
					if (workout.date === date) {
						workout.workouts.map(WO => {
							if (WO._id === workoutId) {
								if(!WO.sets.length || (WO.sets.find(set => set.set === setNum) === undefined)) {
									WO.sets.push({
										set: setNum, 
										reps: stateReps,
										weight: unitConverter(unit, stateWeight, 'database', `${unit === 'imperial' ? 'pounds' : 'kilograms'}`)
									})
								} else {
									// eslint-disable-next-line
									WO.sets.map(set => {
										if(set.set === setNum) {
											set.reps = stateReps
											set.weight = unitConverter(unit, stateWeight, 'database', `${unit === 'imperial' ? 'pounds' : 'kilograms'}`)
										}
									})
								}
							}
							return WO
						});
					}
					return workout;
				});

				const auth = getAuth()
				const docRef = doc(db, 'users', auth.currentUser.uid)


				await updateDoc(docRef, {
					workouts: [...newUserWorkouts]
				})
				dispatch({ type: 'UPDATE_WORKOUTS', payload: [...newUserWorkouts] });
				

				setInitialReps(stateReps);
				setInitialWeight(stateWeight);

				toast.success('Set Saved!')
				setNewSetAdded(true)
			} catch (error) {
				toast.error('Error saving set');
				console.log(error);
			}
		}

		setEditSets(!editSets);
	};

	return (
		<form className="setContainer">
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
					<span></span>
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
					<span>{unit === 'imperial' ? 'Lbs' : 'Kg'}</span>
				</div>
			</div>
		</form>
	);
}

export default Set;
