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
