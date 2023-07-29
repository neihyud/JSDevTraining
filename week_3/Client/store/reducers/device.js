const initState = {
    devices: [],
    logs: [],
    totalLogs: 0,
}

const deviceReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_DEVICE':
            return {
                ...state,
                devices: [...state.devices, { ...action.payload }],
            }
        case 'GET_DEVICES':
            return {
                ...state,
                devices: action.payload,
            }
        case 'GET_LOGS':
            return {
                ...state,
                logs: action.payload.logs,
                totalLogs: action.payload.totalLogs,
            }
        default:
            return state
    }
}

export default deviceReducer
