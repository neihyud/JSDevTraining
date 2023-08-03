const initState = {
  specificProducts: [],
  productCollection: [],
  productTags: [],
  type: "",
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_SPECIFIC_PRODUCT":
      return {
        ...state,
        specificProducts: [...action.payload],
      };
    case "ADD_SPECIFIC_PRODUCT":
      return {
        ...state,
        specificProducts: [...state.specificProducts, action.payload],
      };
    case "REMOVE_SPECIFIC_PRODUCT":
      return {
        ...state,
        specificProducts: state.specificProducts.filter((product) => {
          let { id = "" } = product;

          return action.payload != id;
        }),
      };

    case "UPDATE_PRODUCT_COLLECTION":
      return {
        ...state,
        productCollection: [...action.payload],
      };

    case "ADD_PRODUCT_COLLECTION":
      return {
        ...state,
        productCollection: [...state.productCollection, action.payload],
      };
    case "REMOVE_PRODUCT_COLLECTION":
      return {
        ...state,
        productCollection: state.specificProducts.filter((product) => {
          let { id = "" } = product;

          return action.payload != id;
        }),
      };

    case "ADD_PRODUCT_TAG":
      return {
        ...state,
        productTags: [...state.productTags, action.payload],
      };
    case "REMOVE_PRODUCT_TAG":
      return {
        ...state,
        productTags: state.productTags.filter((product) => {
          let { id = "" } = product;

          return action.payload != id;
        }),
      };
    default:
      return state;
  }
};

export default productReducer;
