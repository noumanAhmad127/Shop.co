import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckOutSteps from "../../utils/CheckOutSteps";
import { createOrder } from "../../../redux/action/orderAction";
import { actionTypes } from "../../../redux/action/action-types";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  // const shippingPrice = 15;
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  cart.shippingPrice = cart.itemsPrice > 1000 ? 0 : 15;

  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2);

  useEffect(() => {
    if (success) {
      dispatch({ type: actionTypes.CART_RESET_ITEM });
      navigate(`/order/${order._id}`);
    }
    //eslint-disable-next-line
  }, [success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <>
      <div className="my-6">
        <CheckOutSteps step1 step2 step3 step4 />
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-4 mx-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="text-lg font-semibold">Shipping Address</h1>
              </div>
              <div>
                <p className="text-sm text-slate-600 leading-5">
                  Address: {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  , {cart.shippingAddress.country}
                </p>
              </div>
            </div>
            <hr className="my-2" />
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="text-lg font-semibold">Payment Method</h1>
              </div>
              <div>
                <p className="text-sm text-slate-600 leading-5">
                  Payment Method: {cart.paymentMethod}
                </p>
              </div>
            </div>
            <hr className="my-2" />
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="text-lg font-semibold">Ordered Items</h1>
              </div>
              <div>
                {cart.cartItems.map((item, index) => (
                  <div
                    className="flex flex-row px-3 py-3 gap-3 items-center"
                    key={index}
                  >
                    <div className="">
                      <img
                        src={item.image}
                        className="w-20 h-20 object-contain"
                      ></img>
                    </div>
                    <div className=" flex flex-col gap-4">
                      <div className="flex flex-row justify-between gap-2">
                        <Link to={`/products/${item.product}`}>
                          <h1 className="text-sm text-slate-600 leading-5 font-semibold">
                            {item.name}
                          </h1>
                        </Link>
                      </div>
                      <div className="flex flex-row justify-between">
                        <p className="text-sm text-slate-600 leading-5 font-semibold">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex flex-col gap-4 py-[16px] px-[14px] border-[1px] border-black rounded-[20px]">
                <div>
                  <h1 className="text-xl font-bold">Order Sammary</h1>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row justify-between">
                    <p className="text-black/[60%] text-[16px]">SubTotal</p>
                    <p className="text-[16px] font-bold">${cart.itemsPrice}</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-black/[60%] text-[16px]">Delivery Fee</p>
                    <p className="text-[16px] font-bold">
                      ${cart.shippingPrice}
                    </p>
                  </div>
                  <hr />
                  <div className="flex flex-row justify-between">
                    <p className="text-black/[60%] text-[16px]">Total</p>
                    <p className="text-[16px] font-bold">${cart.totalPrice}</p>
                  </div>
                </div>
                <div>{error && <h1>{error}</h1>}</div>
                <button
                  className="text-white bg-black py-4 rounded-full w-full"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order{" "}
                  <span>
                    <i
                      className="fa-solid fa-arrow-right-long"
                      style={{ color: "white" }}
                    ></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
