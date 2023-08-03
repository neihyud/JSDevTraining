const initState = {
  specificProducts: [],
  productCollection: [],
  productTags: [],
  allProducts: [
    {
      id: "101",
      url: "#",
      name: "A",
      location: "Decatur, USA",
    },
    {
      id: "201",
      url: "#",
      name: "B",
      location: "Los Angeles, USA",
    },
    {
      id: "102",
      url: "#",
      name: "C",
      location: "Decatur, USA",
      tag: "w",
    },
    {
      id: "202",
      url: "#",
      name: "F",
      location: "Los Angeles, USA",
    },
    {
      id: "103",
      url: "#",
      name: "D",
      location: "Decatur, USA",
    },
    {
      id: "204",
      url: "#",
      name: "E",
      location: "Los Angeles, USA",
    },
  ],
  allCollection: [
    {
      id: "101",
      name: "Collection A",
    },

    {
      id: "102",
      name: "Collection B",
    },
    {
      id: "103",
      name: "Collection C",
    },
    {
      id: "104",
      name: "Collection D",
    },
    {
      id: "105",
      name: "Collection E",
    },
    {
      id: "106",
      name: "Collection F",
    },
    {
      id: "107",
      name: "Collection G",
    },
    {
      id: "108",
      name: "Collection H",
    },
  ],
  allTags: [],
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_SPECIFIC_PRODUCT":
      console.log("action: ", action.payload[0]);
      return {
        ...state,
        specificProducts: [...action.payload[0]], 
      };
    case "ADD_SPECIFIC_PRODUCT":
      return {
        ...state,
        specificProducts: [...state.specificProducts, action.payload],
      };
    case "REMOVE_SPECIFIC_PRODUCT":
      return {
        ...state,
        specificProducts: state.specificProducts.filter((id) => {
          return action.payload != id;
        }),
      };

    case "UPDATE_PRODUCT_COLLECTION":
      return {
        ...state,
        productCollection: [...action.payload],
      };

    case "UPDATE_PRODUCT_TAG":
      return {
        ...state,
        productTags: [...action.payload],
      };

    default:
      return state;
  }
};

export default productReducer;
