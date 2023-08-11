import { fetchProducts } from '../../service/product'

const loading = () => {
  return {
    type: 'LOADING',
  }
}

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
      } else {
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

export const handleSelected = ({
  specificProducts,
  selectedItems,
  allProducts,
}) => {
  let data = []
  if (selectedItems.length > specificProducts.length) {
    const id = selectedItems[selectedItems.length - 1]
    const product = allProducts.find((product) => product.id == id)
    specificProducts.push(product)

    data = specificProducts
    console.log('Data 1', data)
  } else {
    console.log('product specific: ', specificProducts)
    data = specificProducts.filter((product) => {
      return selectedItems.includes(product.id)
    })

    console.log('Data 2 : ', data)
  }

  return {
    type: 'UPDATE_SPECIFIC_PRODUCT',
    payload: data,
  }
}
