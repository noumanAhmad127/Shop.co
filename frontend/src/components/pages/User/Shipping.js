import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../../redux/action/cartAction";
import CheckOutSteps from "../../utils/CheckOutSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const initialAddress = shippingAddress?.address ?? "";
  const initialCity = shippingAddress?.city ?? "";
  const initialPostalCode = shippingAddress?.postalCode ?? "";
  const initialCountry = shippingAddress?.country ?? "";

  const [address, setAddress] = useState(initialAddress);
  const [city, setCity] = useState(initialCity);
  const [postalCode, setPostalCode] = useState(initialPostalCode);
  const [country, setCountry] = useState(initialCountry);

  // const [address, setAddress] = useState(shippingAddress.address);
  // const [city, setCity] = useState(shippingAddress.city);
  // const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  // const [country, setCountry] = useState(shippingAddress.country);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sumbitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ country, city, address, postalCode }));
    navigate("/payment");
  };
  return (
    <>
      <CheckOutSteps step1 step2 />
      <div className="flex flex-col justify-center mx-6 my-6">
        <div className="hidden"></div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-medium">Shipping</h1>
            <p className="text-sm">Enter Your Shipping Detail</p>
          </div>
          <div className="flex flex-col gap-4">
            <form onSubmit={sumbitHandler} autoComplete="off">
              <div className="flex flex-col gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="text-sm border-b-[1px] border-black/[60%] w-full px-1 py-3 autofill:none"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="text-sm border-b-[1px] border-black/[60%] w-full px-1 py-3 autofill:none"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="text-sm border-b-[1px] border-black/[60%] w-full px-1 py-3"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="text-sm border-b-[1px] border-black/[60%] w-full px-1 py-3"
                    autoComplete="off"
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

export default Shipping;
