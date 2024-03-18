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
    case actionTypes.USER_DETAIL_RESET:
      return { user: {} };
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

export const userListReducer = (state = { users: [] }, { type, payload }) => {
  switch (type) {
    case actionTypes.USER_LIST_REQUEST:
      return { loading: true };
    case actionTypes.USER_LIST_SUCCESS:
      return { loading: false, users: payload };
    case actionTypes.USER_LIST_FAIL:
      return { loading: false, error: payload };
    case actionTypes.USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.USER_DELETE_REQUEST:
      return { loading: true };
    case actionTypes.USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.USER_DELETE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case actionTypes.USER_UPDATE_REQUEST:
      return { loading: true };
    case actionTypes.USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.USER_UPDATE_FAIL:
      return { loading: false, error: payload };
    case actionTypes.USER_UPDATE_RESET:
      return { loading: false, state: { user: {} } };
    default:
      return state;
  }
};
