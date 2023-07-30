import axios from 'axios'
const DOMAIN = 'http://localhost:8080'

export const getDevices = () => async (dispatch) => {
    try {
        const { data = {} } = await axios.get(`${DOMAIN}/device`)

        dispatch({ type: 'GET_DEVICES', payload: data.devices })
    } catch (error) {
        return error.response
            ? error.response.data
            : { success: false, message: 'Server error' }
    }
}

export const addDevice = (device) => async (dispatch) => {
    try {
        const { data = {} } = await axios.post(`${DOMAIN}/device`, device)

        dispatch({ type: 'ADD_DEVICE', payload: data.device })
    } catch (error) {
        return error.response
            ? error.response.data
            : { success: false, message: 'Server error' }
    }
}

export const getLogs = (query) => async (dispatch) => {
    try {
        const { data = {} } = await axios.get(`${DOMAIN}/logs?q=${query}`)
        dispatch({
            type: 'GET_LOGS',
            payload: { logs: data.logs, totalLogs: data.totalLogs },
        })
    } catch (error) {
        return error.response
            ? error.response.data
            : { success: false, message: 'Server error' }
    }
}
