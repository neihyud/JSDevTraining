const initState = {
  isLoading: true,
  pageInfo: {
    endCursor: '',
    hasNextPage: false,
  },
  productCollection: [],
  allCollection: [],
}

const collectionReducer = (state = initState, action) => {
  switch (action.type) {
    case 'RESET_STATE_COLLECTION':
      return {
        ...state,
        pageInfo: {
          endCursor: '',
          hasNextPage: false,
        },
      }

    case 'LOADING_COLLECTION':
      return {
        ...state,
        isLoading: true,
      }

    // ============= COLLECTION ================
    case 'SET_COLLECTION_EMPTY':
      return {
        ...state,
        allCollection: [],
      }

    case 'ADD_COLLECTION':
      return {
        ...state,
        allCollection: [...action.payload.collections],
        pageInfo: { ...action.payload.pageInfo },
        isLoading: false,
      }

    case 'PUSH_COLLECTION':
      return {
        ...state,
        allCollection: [...state.allCollection, ...action.payload.collections],
        pageInfo: { ...action.payload.pageInfo },
        isLoading: false,
      }
    case 'GET_COLLECTIONS':
      return {
        ...state,
        allCollection: [...state.allCollection, ...action.payload],
      }

    case 'UPDATE_PRODUCT_COLLECTION':
      console.log('UPDATE_PRODUCT_COLLECTION: ', action.payload)
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
    default:
      return state
  }
}

export default collectionReducer
