import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  listProduct,
} from "../../../redux/action/productAction";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { actionTypes } from "../../../redux/action/action-types";
import { listOrders } from "../../../redux/action/orderAction";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, success, orders } = orderList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else navigate("/login");
  }, [dispatch, userInfo, navigate, success]);

  return (
    <div>
      <div className="flex flex-col gap-6 mx-4 my-6">
        <div className="flex flex-row justify-between ">
          <h1 className="text-2xl font-medium">Orders</h1>
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
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3">
                      date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      total price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      paid
                    </th>
                    <th scope="col" className="px-6 py-3">
                      delivered
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>

                {products.map((product) => (
                  <tbody>
                    <tr className="bg-white border-b" key={product._id}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {product._id}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {product.name}
                      </th>
                      <td className="px-6 py-4">${product.price}</td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">{product.brand}</td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/admin/product/${product._id}/edit `}
                          className="underline"
                        >
                          <button className="mx-2">
                            <i className="fas fa-edit"></i>
                          </button>
                        </Link>
                        <button
                          className="mx-2"
                          onClick={() => {
                            deleteHandler(product._id);
                          }}
                        >
                          {loadingDelete ? (
                            <i className="fa-solid fa-circle-notch fa-spin"></i>
                          ) : (
                            <i className="fas fa-trash"></i>
                          )}
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

export default OrderList;
