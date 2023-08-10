const initState = {
  specificProducts: [],
  isLoading: true,
  allProducts: [],
  pageInfo: {
    endCursor: '',
    hasNextPage: false,
  },
  productCollection: [],
  productTags: [],
  allCollection: [],
  allTags: [],
}

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_SPECIFIC_PRODUCT':
      return {
        ...state,
        specificProducts: [...state.specificProducts, ...action.payload],
        isLoading: false,
      }
    case 'REMOVE_SPECIFIC_PRODUCT':
      return {
        ...state,
        specificProducts: state.specificProducts.filter((id) => {
          return action.payload != id
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

    default:
      return state
  }
}

export default productReducer
