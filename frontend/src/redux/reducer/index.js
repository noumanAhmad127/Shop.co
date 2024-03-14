import { combineReducers } from "redux";
import { productDetailReducer, productListReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import {
  userDetailReducer,
  userLoginReducer,
  userSignOutReducer,
  userUpdateProfileReducer,
} from "./userReducer";
import { orderCreateReducer } from "./orderReducer";
// import { ProductListReducer, productListReducer } from "./productReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userSignOut: userSignOutReducer,
  userDetail: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
});

export default reducer;
