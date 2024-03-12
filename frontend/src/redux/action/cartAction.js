import axios from "axios";
import { actionTypes } from "./action-types";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: actionTypes.CART_ADD_ITEM,
    payload: {
      productId: data._id,
      image: data.image,
      name: data.name,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: actionTypes.CART_REMOVE_ITEM,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
