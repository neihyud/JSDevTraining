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

export const updateProducts = ({
  allProducts,
  selectedItems,
  specificProducts,
}) => {
  // const data = specificProducts.filter((product) =>
  //   selectedItems.includes(product.id)
  // )

  // const data2 = allProducts.filter((product) => {
  //   return selectedItems.includes(product.id)
  // })

  const data = selectedItems.map((id) => {
    const product = specificProducts.filter((product) => product.id == id)


    
  } )

  console.log('DATA1, DATA2', [...data, ...data2])

  
  const data3 = new Set(...data, ...data2)

  console.log('DATA3: ', data3)
  return {
    type: 'UPDATE_SPECIFIC_PRODUCT',
    payload: Array.from(data3),
  }
}

export const handleSelected = ({specificProduct, selectedItems, allProducts }) => {
  if (selectedItems.length > specificProduct.length) {
    const id = selectedItems[selectedItems.length - 1]
    const product = allProducts.find((product) => product.id == id)
    specificProduct.push(product)
    // update specific product
    // dispath update
  } else {
    specificProduct.filter(() => {
      return selectedItems.includes()
    })
  }
}