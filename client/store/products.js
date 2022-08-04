import axios from "axios";

// initalState:
const initalState = { allProducts: [], singleProduct: {} };
// action type:
const GOT_PRODUCTS = "GOT_PRODUCTS";
const GOT_SINGLE_PRODUCT = "GOT_SINGLE_PRODUCT"

// action creators:
const gotAllProducts = (products) => ({ type: GOT_PRODUCTS, products });
const gotSingleProduct = (product) => ({ type: GOT_SINGLE_PRODUCT, product});

// thunk creators:
export const getProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products/");
      dispatch(gotAllProducts(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getSingleProduct = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products/:id");
      dispatch(gotSingleProduct(data));
    } catch (error) {
      console.error(error);
    }
  };
}

// reducer:
export default function productsReducer(state = initalState, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return { ...state, allProducts: action.products}
    case GOT_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    default:
      return state;
  }
}
