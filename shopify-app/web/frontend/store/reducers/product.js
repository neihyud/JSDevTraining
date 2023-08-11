const initState = {
  specificProducts: [],
  isLoading: true,
  allProducts: [],
  pageInfo: {
    endCursor: '',
    hasNextPage: false,
  },
  // productCollection: [],
  productTags: [],
  // allCollection: [],
  allTags: [],
}

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_SPECIFIC_PRODUCT':
      console.log('Action: ', action.payload)
      return {
        ...state,
        specificProducts: [...action.payload],
        isLoading: false,
      }
    case 'REMOVE_SPECIFIC_PRODUCT':
      return {
        ...state,
        specificProducts: state.specificProducts.filter((product) => {
          return action.payload != product.id
        }),
        isLoading: false,
      }
      break

    case 'PUSH_PRODUCTS':
      return {
        ...state,
        allProducts: [...state.allProducts, ...action.payload.products],
        pageInfo: { ...action.payload.pageInfo },
        isLoading: false,
      }

    case 'ADD_PRODUCTS':
      return {
        ...state,
        allProducts: [...action.payload.products],
        pageInfo: { ...action.payload.pageInfo },
        isLoading: false,
      }

    case 'RESET_STATE_PRODUCT':
      return {
        ...state,
        pageInfo: {
          endCursor: '',
          hasNextPage: false,
        },
      }

    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      }

    case 'SET_PRODUCT_EMPTY':
      return {
        ...state,
        allProducts: [],
      }
    // ============= COLLECTION ================
    // case 'SET_COLLECTION_EMPTY':
    //   return {
    //     ...state,
    //     allCollection: [],
    //   }

    // case 'ADD_COLLECTION':
    //   return {
    //     ...state,
    //     allCollection: [...action.payload.collections],
    //     pageInfo: { ...action.payload.pageInfo },
    //     isLoading: false,
    //   }

    // case 'PUSH_COLLECTION':
    //   return {
    //     ...state,
    //     allCollection: [...state.allProducts, ...action.payload.collections],
    //     pageInfo: { ...action.payload.pageInfo },
    //     isLoading: false,
    //   }
    // case 'GET_COLLECTIONS':
    //   return {
    //     ...state,
    //     allCollection: [...state.allCollection, ...action.payload],
    //   }
    case 'GET_TAGS':
      return {
        ...state,
        allTags: [...state.allTags, ...action.payload],
      }

    // case 'UPDATE_PRODUCT_COLLECTION':
    //   console.log("UPDATE_PRODUCT_COLLECTION: ", action.payload)
    //   return {
    //     ...state,
    //     productCollection: [...action.payload],
    //   }
    //   break
    // case 'REMOVE_PRODUCT_COLLECTION':
    //   return {
    //     ...state,
    //     productCollection: state.productCollection.filter((product) => {
    //       return action.payload != product.id
    //     }),
    //   }
    //   break
    case 'UPDATE_PRODUCT_TAG':
      return {
        ...state,
        productTags: [...action.payload],
      }
      break

    default:
      return state
  }
}

export default productReducer
