import { createContext, useState } from 'react';


const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
	const [userWorkouts, setUserWorkouts] = useState([])


	return (
		<WorkoutContext.Provider
			value={{userWorkouts, setUserWorkouts}}
		>
			{children}
		</WorkoutContext.Provider>
	);
};

export default WorkoutContext;
