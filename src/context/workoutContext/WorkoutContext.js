import { createContext, useState } from 'react';


const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
	const [userWorkouts, setUserWorkouts] = useState([])
	const [userInfo, setUserInfo] = useState({})


	return (
		<WorkoutContext.Provider
			value={{userWorkouts, setUserWorkouts, userInfo, setUserInfo}}
		>
			{children}
		</WorkoutContext.Provider>
	);
};

export default WorkoutContext;
