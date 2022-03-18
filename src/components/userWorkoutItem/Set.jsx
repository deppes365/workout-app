
import { FaEdit, FaCheckSquare } from 'react-icons/fa';

function Set({
	setNum,
	reps,
	weight,
	showSets,
	editSets,
	setEditSets,
	handleEdit,
}) {
	//   const [editSets, setEditSets] = useState(false)

	//   const handleEdit = () => {
	//     setEditSets(!editSets)
	//   }

	return (
		<form className={`setContainer ${showSets ? 'active' : ''}`}>
			{editSets ? <FaCheckSquare className="editIcon check" onClick={handleEdit}/> : <FaEdit className="editIcon" onClick={handleEdit} />}
			<p className="setNumTitle">Set {setNum}</p>
			<div className="setInfoContainer">
				<div className="setInfoGroup">
					<label htmlFor="reps">Reps:</label>
					<input
						type="number"
						id="reps"
						name="reps"
						value={reps}
						disabled={!editSets}
					/>
				</div>
				<div className="setInfoGroup">
					<label htmlFor="weight">Weight:</label>
					<input
						type="number"
						name="weight"
						id="weight"
						value={weight}
						disabled={!editSets}
					/>
				</div>
			</div>
		</form>
	);
}

export default Set;
