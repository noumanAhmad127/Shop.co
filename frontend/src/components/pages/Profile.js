import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  UpdateUserProfile,
  getUserDetail,
} from "../../redux/action/userAction";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consfirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);
  const userLogin = useSelector((state) => state.userLogin);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  const { loading, error, user } = userDetail;
  const { userInfo } = userLogin;
  const { success } = userUpdateProfile;
  // dispatch(login({ email, password }));

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (!user.name) {
      dispatch(getUserDetail("profile"));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo, user]);

  const sumbitHandler = (e) => {
    e.preventDefault();
    if (password != consfirmPassword) {
      setMessage("Password Doesn't Match");
    } else {
      dispatch(UpdateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <div className="flex flex-col justify-between mx-6 my-6">
      <div className="flex flex-col gap-10">
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
      <div className="flex">
        <div>
          <h1>My Orders</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
