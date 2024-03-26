import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-row justify-evenly">
        <div>
          {step1 ? (
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-black font-semibold"
            >
              Sign In
            </button>
          ) : (
            <button disabled className="text-sm text-slate-500 font-semibold">
              Sign In
            </button>
          )}
        </div>
        <div>
          {step2 ? (
            <button
              onClick={() => navigate("/shipping")}
              className="text-sm text-black font-semibold"
            >
              Shipping
            </button>
          ) : (
            <button disabled className="text-sm text-slate-500 font-semibold">
              Shipping
            </button>
          )}
        </div>
        <div>
          {step3 ? (
            <button
              onClick={() => navigate("/payment")}
              className="text-sm text-black font-semibold"
            >
              Payment
            </button>
          ) : (
            <button disabled className="text-sm text-slate-500 font-semibold">
              Payment
            </button>
          )}
        </div>
        <div>
          {step4 ? (
            <button
              onClick={() => navigate("/placeorder")}
              className="text-sm text-black font-semibold"
            >
              Place Order
            </button>
          ) : (
            <button disabled className="text-sm text-slate-500 font-semibold">
              Place Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckOutSteps;
