import { actionTypes } from "../action/action-types";

export const userLoginReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.USER_LOGIN_REQUEST:
      return { loading: true };
    case actionTypes.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: payload };
    case actionTypes.USER_LOGIN_FAIL:
      return { loading: false, error: payload };
    case actionTypes.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userSignOutReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.USER_SIGNOUT_REQUEST:
      return { loading: true };
    case actionTypes.USER_SIGNOUT_SUCCESS:
      return { loading: false, userInfo: payload };
    case actionTypes.USER_SIGNOUT_FAIL:
      return { loading: false, error: payload };
    case actionTypes.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};
export const userDetailReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case actionTypes.USER_DETAIL_REQUEST:
      return { ...state, loading: true };
    case actionTypes.USER_DETAIL_SUCCESS:
      return { loading: false, user: payload };
    case actionTypes.USER_DETAIL_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
export const userUpdateProfileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case actionTypes.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: payload };
    case actionTypes.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
