import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;
  return (
    <div>
      <div className="flex flex-col gap-4 mx-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="text-base font-semibold">Shipping Address</h1>
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
              <h1 className="text-base font-semibold">Payment Method</h1>
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
              <h1 className="text-base font-semibold">Ordered Items</h1>
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
        <div></div>
      </div>
    </div>
  );
};

export default PlaceOrder;
