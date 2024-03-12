import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../redux/action/userAction";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;
  // dispatch(login({ email, password }));

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect]);

  const sumbitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="flex flex-col justify-center mx-6 my-6">
      <div className="hidden"></div>
      <div className="flex flex-col gap-10">
        {error && (
          <h1 className="text-center bg-red-500 text-red-600 text-sm py-4 w-full">
            {error}
          </h1>
        )}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-medium">Log In to Exclusive</h1>
          <p className="text-sm">Enter your details below</p>
        </div>
        <div className="flex flex-col gap-4">
          <form onSubmit={sumbitHandler} autoComplete="off">
            <div className="flex flex-col gap-6">
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
              <div className="my-">
                <button
                  className="text-base text-white bg-black py-4 w-full rounded-full"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          <div>
            <h1 className="text-center text-xs text-black/[60%]">
              Don't have an account?{" "}
              <span className="hover:underline">
                <Link
                  to={redirect ? `/signup?redirect=${redirect}` : "/signup"}
                >
                  SingUp
                </Link>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
