
export const WorkoutReducer = (state, action) => {
    switch(action.type) {
        case 'GET_USER_INFO':
            const workoutsInOrder = action.payload.workouts.sort((a, b) => {
                return (Number(a.date.split(' ')[0]) < Number(b.date.split(' ')[0])) ? 1 : -1
            })
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                height: action.payload.height,
                weight: action.payload.weight,
                sex: action.payload.sex,
                unit: action.payload.unit,
                userRef: action.payload.userRef,
                weightIns: action.payload.weightIns,
                workouts: workoutsInOrder,
                profilePhotoUrl: action.payload.profilePhotoUrl
            }
        case 'CREATE_NEW_WORKOUT':
            return {
                ...state,
                workouts: action.payload
            }
        case 'UPDATE_WORKOUTS':
            return {
                ...state,
                workouts: action.payload
            }
        case 'UPDATE_USER_PROFILE':
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                height: action.payload.height,
                sex: action.payload.sex,
                unit: action.payload.unit
            }
        case 'CHANGE_PROFILE_PIC':
            return {
                ...state,
                profilePhotoUrl: action.payload
            }
        default:
            return state
    }
}