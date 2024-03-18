import React, { useEffect, useState } from "react";
import Header from "../../utils/Header";
import Mainboard from "../../utils/Mainboard";
import { Link, useNavigate } from "react-router-dom";
import ProductCards from "../../utils/Cards/ProductCards";
import { useDispatch, useSelector } from "react-redux";
import { ProductList, listProduct } from "../../../redux/action/productAction";

const Homepage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  const navigate = useNavigate();

  const viewAllHandler = () => {
    navigate("/products");
  };

  return (
    <div>
      {/* <Header /> */}
      <Mainboard />
      <div>
        <div className="flex flex-col  my-10 gap-7 mx-4">
          <h1 className="text-[32px] font-bold text-center">Top Selling</h1>
          <div className="flex flex-row flex-wrap gap-2">
            {products.slice(0, 2).map((products) => (
              <div key={products._id}>
                <ProductCards products={products} />
              </div>
            ))}
          </div>
          <div>
            <button
              className="w-[358px] text-sm font-medium py-4 rounded-full border-[1px] border-black/[10%]"
              onClick={viewAllHandler}
            >
              View All
            </button>
          </div>
        </div>
      </div>
      <div className="mx-4">
        <div className="bg-[#F0F0F0] py-10 rounded-[20px]">
          <div className="flex justify-center mb-[28px]">
            <h1 className="text-center text-[32px] font-bold leading-9 w-[246px]">
              BROWSE BY dress STYLE
            </h1>
          </div>
          <div className="px-6 flex flex-col gap-4 pb-10 items-center justify-center">
            <div className=" h-[190px] w-[310px] relative rounded-[20px]">
              <img src="./casual.png" alt="" className="rounded-[20px]" />
              <div className="absolute top-0 px-6 py-4 w-full">
                <h1 className="text-black font-bold text-2xl">Casual</h1>
              </div>
            </div>
            <div className=" h-[190px] w-[310px] relative rounded-[20px]">
              <img src="./formal.png" alt="" className="rounded-[20px]" />
              <div className="absolute top-0 px-6 py-4 w-full">
                <h1 className="text-black font-bold text-2xl">Formal</h1>
              </div>
            </div>
            <div className=" h-[190px] w-[310px] relative rounded-[20px]">
              <img src="./party.png" alt="" className="rounded-[20px]" />
              <div className="absolute top-0 px-6 py-4 w-full">
                <h1 className="text-black font-bold text-2xl">Party</h1>
              </div>
            </div>
            <div className=" h-[190px] w-[310px] relative rounded-[20px]">
              <img src="./gym.png" alt="" className="rounded-[20px]" />
              <div className="absolute top-0 px-6 py-4 w-full">
                <h1 className="text-black font-bold text-2xl">Gym</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <ProductList/> */}
    </div>
  );
};

export default Homepage;
