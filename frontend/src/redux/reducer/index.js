import { combineReducers } from "redux";
import { productDetailReducer, productListReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import {
  userDeleteReducer,
  userDetailReducer,
  userListReducer,
  userLoginReducer,
  userSignOutReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./userReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMyListReducer,
  orderPayReducer,
} from "./orderReducer";
// import { ProductListReducer, productListReducer } from "./productReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userSignOut: userSignOutReducer,
  userDetail: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMyList: orderMyListReducer,
});

export default reducer;
