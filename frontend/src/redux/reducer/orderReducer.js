import { actionTypes } from "../action/action-types";

export const orderCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };

    case actionTypes.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: payload,
      };

    case actionTypes.ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        order: payload,
      };

    case actionTypes.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.ORDER_PAY_REQUEST:
      return {
        loading: true,
      };

    case actionTypes.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case actionTypes.ORDER_PAY_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case actionTypes.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderMyListReducer = (
  state = { orders: [] },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.ORDER_LIST_MY_REQUEST:
      return { loading: true };

    case actionTypes.ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: payload,
      };

    case actionTypes.ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case actionTypes.ORDER_LIST_MY_RESET:
      return { order: [] };

    default:
      return state;
  }
};
