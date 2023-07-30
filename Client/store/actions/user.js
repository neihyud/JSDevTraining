import axios from 'axios'
const DOMAIN = 'http://localhost:8080'

export const login = (props) => {
    return async (dispatch) => {
        try {
            const { data = {} } = await axios.post(`${DOMAIN}/auth/login`, {
                ...props,
            })

            dispatch({ type: 'LOGIN', payload: data.user })

            return data
        } catch (error) {
            return error.response
                ? error.response.data
                : { success: false, message: 'Server error' }
        }
    }
}
