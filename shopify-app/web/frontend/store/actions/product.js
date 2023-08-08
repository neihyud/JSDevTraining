import { useAuthenticatedFetch } from '../../hooks'

const fetch = useAuthenticatedFetch()
export const getProducts = () => async (dispatch) => {
  try {
    const res = await fetch('/api/products')

    const { data = {} } = await res.json()
    

    dispatch({type: 'ADD_PRODUCTS', payload: data})
  } catch (error) {
    throw error
  }
}
