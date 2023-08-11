import { fetchProducts } from '../../service/product'

/**
 *
 * @param {object} params
 * @param {string} params.endCursor
 * @param {boolean} params.hasNextPage
 * @param {useAuthenticateFetch} params.fetch
 * @param {string} params.query
 * @returns
 */
export const getProducts = (params) => {
  return async (dispatch) => {
    const { isLazyLoading } = params
    dispatch({ type: 'LOADING' })

    if (!isLazyLoading) {
      dispatch({ type: 'SET_PRODUCT_EMPTY' })
    }

    try {
      const data = await fetchProducts(params)

      if (isLazyLoading) {
        dispatch({ type: 'PUSH_PRODUCTS', payload: data })
        return
      }
 
      const termSearch = localStorage.getItem('searchTerm')

      if (data.query === termSearch) {
        dispatch({ type: 'ADD_PRODUCTS', payload: data })
      }
    } catch (error) {
      throw error
    }
  }
}

export const updateProducts = ({ productTemp }) => {
  return {
    type: 'UPDATE_SPECIFIC_PRODUCT',
    payload: productTemp,
  }
}
