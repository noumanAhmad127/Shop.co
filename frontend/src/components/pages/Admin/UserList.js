import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../../../redux/action/userAction";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else navigate("/login");
  }, [dispatch, successDelete, userInfo, navigate]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };
  return (
    <div>
      <div className="flex flex-col gap-6 mx-4 my-6">
        <div>
          <h1 className="text-3xl font-medium">Users</h1>
        </div>
        <div>
          {loading ? (
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
          ) : error ? (
            <h1>{error}</h1>
          ) : (
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      User ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Admin
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>

                {users.map((user) => (
                  <tbody>
                    <tr className="bg-white border-b" key={user._id}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {user._id}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {user.name}
                      </th>
                      <td className="px-6 py-4">
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>
                      {user.isAdmin ? (
                        <td className="px-6 py-4">
                          <i
                            className="fas fa-check"
                            style={{ color: "green" }}
                          ></i>
                        </td>
                      ) : (
                        <td className="px-6 py-4">
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        </td>
                      )}
                      <td className="px-6 py-4">
                        <Link
                          to={`/admin/user/${user._id}/edit `}
                          className="underline"
                        >
                          <button className="mx-2">
                            <i className="fas fa-edit"></i>
                          </button>
                        </Link>
                        <button
                          className="mx-2"
                          onClick={() => {
                            deleteHandler(user._id);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
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

export default UserList;
