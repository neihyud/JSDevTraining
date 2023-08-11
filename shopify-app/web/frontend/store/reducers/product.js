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

    case 'GET_TAGS':
      return {
        ...state,
        allTags: [...state.allTags, ...action.payload],
      }

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
