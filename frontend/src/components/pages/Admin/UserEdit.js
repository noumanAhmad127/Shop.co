import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetail, updateUser } from "../../../redux/action/userAction";
import { actionTypes } from "../../../redux/action/action-types";
import { ColorRing } from "react-loader-spinner";

const UserEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  // const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorLoading,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: actionTypes.USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetail(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, id, user, successUpdate, navigate]);

  const sumbitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: id, name, email, isAdmin }));
  };
  return (
    <div className="flex flex-col justify-center mx-6 my-6">
      <div className="flex flex-col gap-10">
        <div>
          {(loading || loadingUpdate) && (
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
          {(error || errorLoading) && (
            <h1 className="text-center bg-red-300 text-red-600 text-sm py-4 w-full">
              {error}
            </h1>
          )}
          {/* {message || (
            <h1 className="text-center bg-red-300 text-red-600 text-sm py-4 w-full">
              {message}
            </h1>
          )} */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-medium">Edit User</h1>
            <p className="text-sm">Enter details below</p>
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

                <div className="flex flex-row gap-2">
                  <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    className="text-sm border-b-[1px] border-black/[60%] px-1 py-3"
                    autoComplete="off"
                  />
                  <label className="text-sm">Admin</label>
                </div>
                <div className="my-2">
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
      </div>
    </div>
  );
};

export default UserEdit;
