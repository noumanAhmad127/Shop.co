import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/action/cartAction";

const Carts = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  console.log(`Cart Redirect ${redirect}`);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  console.log(cartItems);
  console.log(typeof cartItems);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=shipping");
    }
  };

  const deliveryPrice = 15;
  const cartItemPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  const totalPrice = (parseFloat(cartItemPrice) + deliveryPrice).toFixed(2);
  return (
    <div className="mx-4">
      <div className="mb-5">
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="border-[1px] border-black/[60%] rounded-[20px]">
          {cartItems.length === 0 ? (
            <h1 className="text-sm bg-red-500 text-red-700 w-full py-5 px-4">
              Cart Is Empty
            </h1>
          ) : (
            <>
              {cartItems.map((item) => (
                <div className="flex flex-row px-3 py-3 gap-3">
                  <div className="basis-1/3">
                    <img src={item.image}></img>
                  </div>
                  <div className="basis-2/3 flex flex-col gap-4">
                    <div className="flex flex-row justify-between gap-2">
                      <h1 className="text-base font-bold">{item.name}</h1>
                      <span>
                        <button
                          onClick={() => {
                            removeFromCartHandler(item.productId);
                          }}
                        >
                          <i
                            class="fa-solid fa-trash-can "
                            style={{ color: "red" }}
                          ></i>
                        </button>
                      </span>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p className="text-xl font-bold">${item.price}</p>
                      <div>
                        <form className="flex gap-3 items-center">
                          <select
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(
                                  item.productId,
                                  Number(e.target.value)
                                )
                              )
                            }
                            className="px-6 py-1 border-[1px] rounded-full text-center"
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option
                                key={x + 1}
                                value={x + 1}
                                className="px-2 py-2"
                              >
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div>
          <div className="flex flex-col gap-4 py-[16px] px-[14px] border-[1px] border-black rounded-[20px]">
            <div>
              <h1 className="text-xl font-bold">
                Subtotal (
                {cartItems.reduce(
                  (pervItem, currItem) => pervItem + currItem.qty,
                  0
                )}
                ) Items
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <p className="text-black/[60%] text-[16px]">SubTotal</p>
                <p className="text-[16px] font-bold">${cartItemPrice}</p>
              </div>
            </div>
            <button
              className="text-white bg-black py-4 rounded-full w-full"
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
            >
              Go To Checkout{" "}
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
  );
};

export default Carts;
