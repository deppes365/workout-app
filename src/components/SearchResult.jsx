import React, { useContext } from 'react';

import WorkoutContext from '../context/workoutContext/WorkoutContext';


function SearchResult({
	result,
	showButton,
	setShowSearchResults,
	setWorkoutSearch,
}) {
	const { createNewWorkout} = useContext(WorkoutContext);

	const onClick = e => {

		e.preventDefault()
		createNewWorkout(result)
		setWorkoutSearch('');
		setShowSearchResults(false);
	};

	return (
		<div className="searchResult">
			<p>{`${result}`}</p>
			{showButton && (
				<button className="addWorkoutBtn" onClick={onClick}>
					Add
				</button>
			)}
		</div>
	);
}

export default SearchResult;
