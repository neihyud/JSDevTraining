import axios from 'axios'
const DOMAIN = 'http://localhost:8080'

export const getDevices = () => async (dispatch) => {
    try {
        const { data = {} } = await axios.get(`${DOMAIN}/device`)

        dispatch({ type: 'GET_DEVICES', payload: data.devices })
    } catch (error) {
        throw error
    }
}

export const addDevice = (device) => async (dispatch) => {
    try {
        const { data = {} } = await axios.post(`${DOMAIN}/device`, device)

        dispatch({ type: 'ADD_DEVICE', payload: data.device })
    } catch (error) {
        console.log('FAIL ADD DEVICE!')
        throw error
    }
}

export const getLogs = (query, currentPage, pageSize) => async (dispatch) => {
    try {
        const { data = {} } = await axios.get(
            `${DOMAIN}/logs?q=${query}&page=${currentPage}&size=${pageSize}`
        )
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
