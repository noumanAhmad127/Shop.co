import { actionTypes } from "../action/action-types";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.CART_ADD_ITEM:
      const item = payload;
      const existingItem = state.cartItems.find(
        (x) => x.productId === item.productId
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.productId === existingItem.productId ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case actionTypes.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.productId !== payload),
      };

    case actionTypes.CART_RESET_ITEM:
      return {
        cartItems: [],
        shippingAddress: {},
      };

    case actionTypes.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      };
    case actionTypes.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      };

    default:
      return state;
  }
};
