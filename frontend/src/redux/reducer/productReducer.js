import { actionTypes } from "../action/action-types";

export const productListReducer = (
  state = { products: [] },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case actionTypes.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: payload };
    case actionTypes.PRODUCT_LIST_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
export const productDetailReducer = (
  state = { product: { review: [] } },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.PRODUCT_DETAIL_REQUEST:
      return { loading: true, ...state };
    case actionTypes.PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: payload };
    case actionTypes.PRODUCT_DETAIL_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.PRODUCT_DELETE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case actionTypes.PRODUCT_CREATE_FAIL:
      return { loading: false, error: payload };
    case actionTypes.PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (
  state = { product: {} },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case actionTypes.PRODUCT_UPDATE_FAIL:
      return { loading: false, error: payload };
    case actionTypes.PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};
