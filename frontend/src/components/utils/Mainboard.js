// import mainImage from 'mainImag'
import React from "react";
import { useNavigate } from "react-router-dom";

const Mainboard = () => {
  const navigate = useNavigate();

  const shopNowHandler = () => {
    navigate("/products");
  };
  return (
    <div className="bg-[#F2F0F1]">
      <div className="py-10">
        <div>
          <div className=" flex flex-col gap-5 px-4">
            <div className="flex flex-col gap-5 ">
              <h1 className="text-4xl leading-[34px] font-bold w-[315px]">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </h1>
              <p className="text-sm font-normal leading-5 text-black/[0.6]">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>
              <button
                className="text-[#FFFFFF] text-base font-medium w-[358px] py-4 rounded-full bg-[#000000] "
                onClick={shopNowHandler}
              >
                Shop Now
              </button>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center">
              <div>
                <h2 className="text-2xl font-bold">200+</h2>
                <p className="text-xs font-normal leading-5  text-black/[0.6]">
                  International Brands
                </p>
              </div>
              <div className="px-[26.5px] bg-black/[10%] rotate-90 border-[1px]"></div>
              <div>
                <h2 className="text-2xl font-bold">2000+</h2>
                <p className="text-xs font-normal leading-5 text-black/[0.6]">
                  High-Quality Products
                </p>
              </div>
              <div className="hidden"></div>
              <div className="mt-3">
                <h2 className="text-2xl font-bold">30,000+</h2>
                <p className="text-xs font-normal leading-5 text-black/[0.6]">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img src="/mainImag.png"></img>
        </div>
        <div className="flex flex-row flex-wrap py-10 px-4 bg-black gap-8 justify-center">
          <img src="/varsac.png" className=" h-[23px]"></img>
          <img src="/parada.png" className="h-[23px]"></img>
          <img src="/gucci.png" className=" h-[23px]"></img>
        </div>
      </div>
    </div>
  );
};

export default Mainboard;
