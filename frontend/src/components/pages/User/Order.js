import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deliverOrder,
  getOrderDetails,
  paidOrder,
} from "../../../redux/action/orderAction";
import { ColorRing } from "react-loader-spinner";
// import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { actionTypes } from "../../../redux/action/action-types";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  //just make for learning
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    success: successDeliver,
    error: errorDeliver,
  } = orderDeliver;
  useEffect(() => {
    // const addStripeScript = async () => {
    //   const { data: clientId } = await axios.get("/api/config/stripe");
    //   console.log(clientId);
    //   addStripeScript();
    // };
    if (!userInfo) {
      navigate("/login");
    }
    if (!order || order._id !== id || successDeliver || successPay) {
      dispatch({ type: actionTypes.ORDER_DELIVER_RESET });
      dispatch({ type: actionTypes.ORDER_PAY_RESET });
      dispatch(getOrderDetails(id));
    }
  }, [order, id, successDeliver, successPay]);

  const payOrderHandler = async () => {
    // const stripe = await loadStripe(process.env.STRIPE_PUBLISHED_KEY);
    dispatch(paidOrder(order));
    localStorage.removeItem("cartItems");
  };

  const deliverHandler = () => [dispatch(deliverOrder(order))];

  return loading ? (
    <div className="items-center flex justify-center ">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  ) : error ? (
    <h1>{error}</h1>
  ) : (
    <>
      <div className="max-w-3xl mx-auto xl:my-10">
        <div className="flex flex-col gap-4 mx-4">
          <h1 className="text-xl font-bold">Order: {order._id}</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="text-lg font-semibold">Shipping Address</h1>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-slate-600 leading-5">
                  Name:{order.user.name}
                </p>
                <p className="text-sm text-slate-600 leading-5">
                  <a
                    href={`mailto:${order.user.email}`}
                    className="hover:underline"
                  >
                    Email:{order.user.email}
                  </a>
                </p>
                <p className="text-sm text-slate-600 leading-5">
                  Address: {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <p className="bg-green-400 text-green-500 text-xs font-bold px-4 py-4 w-full">
                    Delivered at:{order.deliveredAt}
                  </p>
                ) : (
                  <p className="bg-red-400 text-red-500 text-xs  font-bold px-4 py-4 w-full">
                    Not Delivered
                  </p>
                )}
              </div>
            </div>
            <hr className="my-2" />
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="text-lg font-semibold">Payment Method</h1>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-slate-600 leading-5">
                  Payment Method: {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <p className="bg-green-400 text-green-500 text-xs font-bold px-4 py-4 w-full">
                    Paid on:{order.paidAt}
                  </p>
                ) : (
                  <p className="bg-red-400 text-red-500 text-xs  font-bold px-4 py-4 w-full">
                    Not Paid
                  </p>
                )}
              </div>
            </div>
            <hr className="my-2" />
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="text-lg font-semibold">Ordered Items</h1>
              </div>
              <div>
                {order.orderItems.map((item, index) => (
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
                    <p className="text-[16px] font-bold">${order.totalPrice}</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-black/[60%] text-[16px]">Delivery Fee</p>
                    <p className="text-[16px] font-bold">
                      ${order.shippingPrice}
                    </p>
                  </div>
                  <hr />
                  <div className="flex flex-row justify-between">
                    <p className="text-black/[60%] text-[16px]">Total</p>
                    <p className="text-[16px] font-bold">${order.totalPrice}</p>
                  </div>
                </div>
                {!order.isPaid && (
                  <button
                    className="text-white bg-black py-4 rounded-full w-full"
                    onClick={payOrderHandler}
                    disabled={order.orderItems.length === 0}
                  >
                    Pay {order.totalPrice}
                    <span>
                      {loadingDeliver ? (
                        <i
                          className="fa-solid fa-circle-notch fa-spin"
                          style={{ fontSize: "18px", marginLeft: "8px" }}
                        ></i>
                      ) : (
                        <i
                          className="fa-solid fa-arrow-right-long"
                          style={{
                            color: "white",
                            fontSize: "18px",
                            marginLeft: "8px",
                          }}
                        ></i>
                      )}
                    </span>
                  </button>
                )}

                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <button
                      className="text-white bg-black py-4 rounded-full w-full"
                      onClick={deliverHandler}
                      disabled={order.orderItems.length === 0}
                    >
                      Deliver
                      <span>
                        {loadingDeliver ? (
                          <i
                            className="fa-solid fa-circle-notch fa-spin"
                            style={{ fontSize: "18px", marginLeft: "8px" }}
                          ></i>
                        ) : (
                          " "
                        )}
                      </span>
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
