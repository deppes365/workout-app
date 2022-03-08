import { createContext, useReducer } from 'react';
import workoutReducer from './WorkoutReducer';

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
	const initialState = {
		userWorkouts: {},
	};

	const [state, dispatch] = useReducer(workoutReducer, initialState);

	return (
		<WorkoutContext.Provider
			value={{
				...state,
				dispatch,
			}}
		>
			{children}
		</WorkoutContext.Provider>
	);
};

export default WorkoutContext;
