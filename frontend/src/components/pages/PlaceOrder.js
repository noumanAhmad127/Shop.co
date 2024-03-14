import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckOutSteps from "../utils/CheckOutSteps";

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  const shippingPrice = 15;
  const cartItemPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  const totalPrice = (parseFloat(cartItemPrice) + shippingPrice).toFixed(2);
  return (
    <>
      <div className="my-6">
        <CheckOutSteps step1 step2 step3 step4 />
      </div>
      <div>
        <div className="flex flex-col gap-4 mx-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="text-lg font-semibold">Shipping Address</h1>
              </div>
              <div>
                <p className="text-sm text-slate-600 leading-5">
                  Address: {shippingAddress.address}, {shippingAddress.city},{" "}
                  {shippingAddress.postalCode}, {shippingAddress.country}
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
                  Payment Method: {paymentMethod}
                </p>
              </div>
            </div>
            <hr className="my-2" />
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="text-lg font-semibold">Ordered Items</h1>
              </div>
              <div>
                {cartItems.map((item, index) => (
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
                    <p className="text-[16px] font-bold">${cartItemPrice}</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-black/[60%] text-[16px]">Delivery Fee</p>
                    <p className="text-[16px] font-bold">${shippingPrice}</p>
                  </div>
                  <hr />
                  <div className="flex flex-row justify-between">
                    <p className="text-black/[60%] text-[16px]">Total</p>
                    <p className="text-[16px] font-bold">${totalPrice}</p>
                  </div>
                </div>
                <button
                  className="text-white bg-black py-4 rounded-full w-full"
                  // onClick={checkoutHandler}
                  disabled={cartItems.length === 0}
                >
                  Place Order{" "}
                  <span>
                    <i
                      class="fa-solid fa-arrow-right-long"
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
