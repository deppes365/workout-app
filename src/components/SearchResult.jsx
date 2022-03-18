import React, { useContext } from 'react';
import WorkoutContext from '../context/workoutContext/WorkoutContext';


function SearchResult({ result, showButton, setShowSearchResults, setWorkoutSearch}) {
	const { userWorkouts, setUserWorkouts } = useContext(WorkoutContext);

	const onClick = e => {
		setUserWorkouts([
            ...userWorkouts,
            {
                type: 'anaerobic',
                workout: result,
                equipment: 'Barbell',
                sets: [
                    {
                        set: 1,
                        reps: 0,
                        weight: 215,
                    }
                ]
            }
        ])

        setWorkoutSearch('')
        setShowSearchResults(false)
	};

	return (
		<div className="searchResult" >
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
