const workoutReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USER_WORKOUTS':
            return {
                ...state, 
                userWorkouts: action.payload
            }
        default:
            return state
    }
}

export default workoutReducer