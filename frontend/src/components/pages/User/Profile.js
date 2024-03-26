import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  UpdateUserProfile,
  getUserDetail,
} from "../../../redux/action/userAction";
import { listMyOrders } from "../../../redux/action/orderAction";
import { ColorRing } from "react-loader-spinner";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consfirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  // const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);
  const userLogin = useSelector((state) => state.userLogin);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const orderMyList = useSelector((state) => state.orderMyList);

  const { loading, error, user } = userDetail;
  const { userInfo } = userLogin;
  const { success } = userUpdateProfile;
  // dispatch(login({ email, password }));
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (!user.name) {
      dispatch(getUserDetail("profile"));
      dispatch(listMyOrders());
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo, user, navigate]);

  const sumbitHandler = (e) => {
    e.preventDefault();
    if (password !== consfirmPassword) {
      setMessage("Password Doesn't Match");
    } else {
      dispatch(UpdateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <div className="flex flex-col justify-between mx-6 my-6 gap-5 xl:flex-row">
      <div className="flex flex-col gap-10 xl:basis-[30%]">
        {loading && (
          <div className="items-center flex justify-center">
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
        )}
        {error && (
          <h1 className="text-center bg-red-300 text-red-600 text-sm py-4 w-full">
            {error}
          </h1>
        )}
        {message && (
          <h1 className="text-center bg-red-300 text-red-600 text-sm py-4 w-full">
            {message}
          </h1>
        )}
        {success && (
          <h1 className="text-center bg-green-300 text-green-600 text-sm py-4 w-full">
            Profile Updated
          </h1>
        )}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-medium">Edit Your Profile</h1>
          <p className="text-sm">Enter your details below</p>
        </div>
        <div className="flex flex-col gap-4">
          <form onSubmit={sumbitHandler} autoComplete="off">
            <div className="flex flex-col gap-6">
              <div>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-sm border-b-[1px] border-black/[60%] w-full px-1 py-3 autofill:none"
                  autoComplete="off"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm border-b-[1px] border-black/[60%] w-full px-1 py-3 autofill:none"
                  autoComplete="off"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-sm border-b-[1px] border-black/[60%] w-full px-1 py-3"
                  autoComplete="off"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={consfirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="text-sm border-b-[1px] border-black/[60%] w-full px-1 py-3"
                  autoComplete="off"
                />
              </div>
              <div className="my-">
                <button
                  className="text-base text-white bg-black py-4 w-full rounded-full"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <hr className="w-full my-4" /> */}
      <div className="flex flex-col gap-4 xl:basis-[70%]">
        <div>
          <h1 className="text-3xl font-medium">My Orders</h1>
        </div>
        <div>
          {loadingOrders ? (
            <div className="items-center flex justify-center">
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
          ) : errorOrders ? (
            <h1>{error}</h1>
          ) : (
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Order id
                    </th>
                    <th scope="col" class="px-6 py-3">
                      date
                    </th>
                    <th scope="col" class="px-6 py-3">
                      total price
                    </th>
                    <th scope="col" class="px-6 py-3">
                      paid
                    </th>
                    <th scope="col" class="px-6 py-3">
                      delivered
                    </th>
                    <th scope="col" class="px-6 py-3"></th>
                  </tr>
                </thead>

                {orders.map((order) => (
                  <tbody>
                    <tr class="bg-white border-b">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {order._id}
                      </th>
                      <td class="px-6 py-4">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td class="px-6 py-4">{order.totalPrice}</td>
                      {order.isPaid ? (
                        <td class="px-6 py-4 bg-green-200 text-green-400">
                          Paid
                        </td>
                      ) : (
                        <td class="px-6 py-4  bg-red-200 text-red-400">
                          {" "}
                          Not Paid
                        </td>
                      )}
                      {order.isDelivered ? (
                        <td class="px-6 py-4 bg-green-200 text-green-400">
                          Delivered
                        </td>
                      ) : (
                        <td class="px-6 py-4  bg-red-200 text-red-400">
                          {" "}
                          Not Delivered
                        </td>
                      )}
                      <td class="px-6 py-4">
                        <Link to={`/order/${order._id}`} className="underline">
                          Details
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
