const initState = {
  specificProducts: [],
  productCollection: [],
  productTags: [],
  allProducts: [],
  allCollection: [],
  allTags: [],
}

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_SPECIFIC_PRODUCT':
      return {
        ...state,
        specificProducts: [...action.payload],
      }
    // case 'ADD_SPECIFIC_PRODUCT':
    //   return {
    //     ...state,
    //     specificProducts: [...state.specificProducts, action.payload],
    //   }
    //   break
    case 'REMOVE_SPECIFIC_PRODUCT':
      return {
        ...state,
        specificProducts: state.specificProducts.filter((id) => {
          return action.payload != id
        }),
      }
      break
    case 'UPDATE_PRODUCT_COLLECTION':
      return {
        ...state,
        productCollection: [...action.payload],
      }
      break
    case 'REMOVE_PRODUCT_COLLECTION':
      return {
        ...state,
        productCollection: state.productCollection.filter((product) => {
          return action.payload != product.id
        }),
      }
      break
    case 'UPDATE_PRODUCT_TAG':
      return {
        ...state,
        productTags: [...action.payload],
      }
      break

    case 'GET_PRODUCTS':
      console.log('Action Payload: ', action.payload)
      return {
        ...state,
        allProducts: [...state.allProducts, ...action.payload],
      }
    case 'GET_COLLECTIONS':
      return {
        ...state,
        allCollection: [...state.allCollection, ...action.payload],
      }
    case 'GET_TAGS':
      return {
        ...state,
        allTags: [...state.allTags, ...action.payload],
      }
    default:
      return state
  }
}

export default productReducer
