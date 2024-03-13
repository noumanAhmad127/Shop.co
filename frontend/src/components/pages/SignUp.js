import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../../redux/action/userAction";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consfirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";
  // const redirect = `${location.search ? location.search.split("=")[1] : "/login"}`;
  console.log(`signup redirect ${redirect}`);

  const dispatch = useDispatch();
  const userSignOut = useSelector((state) => state.userSignOut);

  const { loading, error, userInfo } = userSignOut;
  // dispatch(login({ email, password }));

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      // navigate(redirect, { replace: true });
    }
  }, [userInfo, redirect]);

  const sumbitHandler = (e) => {
    e.preventDefault();
    if (password != consfirmPassword) {
      setMessage("Password Doesn't Match");
    }
    dispatch(signOut(name, email, password));
  };
  return (
    <div className="flex flex-col justify-center mx-6 my-6">
      <div className="hidden"></div>
      <div className="flex flex-col gap-10">
        <div>
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
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-medium">SignOut to Exclusive</h1>
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
                    type="email"
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
                    placeholder="Password"
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
                    SignOut
                  </button>
                </div>
              </div>
            </form>
            <div>
              <h1 className="text-center text-xs text-black/[60%]">
                Have an account?{" "}
                <span className="hover:underline">
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  >
                    SingIn
                  </Link>
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
