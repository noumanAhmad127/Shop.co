import React, { useState } from "react";
import CheckOutSteps from "../utils/CheckOutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../../redux/action/cartAction";

const Payment = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { shippingAddress } = cart;

  const navigate = useNavigate();

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Stripe");

  const sumbitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <>
      <CheckOutSteps step1 step2 step3 />
      <div className="flex flex-col justify-center mx-6 my-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-medium">Payment Method</h1>
            <p className="text-xl font-medium text-slate-600">Select Method</p>
          </div>
          <div className="flex flex-col gap-4">
            <form onSubmit={sumbitHandler}>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row-reverse items-center gap-4 justify-end">
                  <label htmlFor="stripe" className="text-base font-semibold">
                    Stripe or Credit Card
                  </label>
                  <input
                    type="radio"
                    id="stripe"
                    value="Stripe"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-sm border-b-[1px] border-black/[60%] px-1 py-3"
                    autoComplete="off"
                    name="paymentMethod"
                  />
                </div>
                <div className="flex flex-row-reverse items-center gap-4 justify-end">
                  <label
                    htmlFor="cashondelivery"
                    className="text-base font-semibold"
                  >
                    Cash On Delivery
                  </label>
                  <input
                    type="radio"
                    id="cashondelivery"
                    value="Cash On Delivery"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-sm border-b-[1px] border-black/[60%] px-1 py-3 "
                    autoComplete="off"
                    name="paymentMethod"
                  />
                </div>

                <div className="my-3">
                  <button
                    className="text-base text-white bg-black py-4 px-6 rounded-full"
                    type="submit"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
