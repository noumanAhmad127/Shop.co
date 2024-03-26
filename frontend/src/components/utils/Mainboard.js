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
      <div className=" ">
        <div className="flex flex-col xl:flex-row xl:w-[86%] mx-auto">
          <div>
            <div className="pt-10 flex flex-col gap-5 px-4 xl:py-[102px]">
              <div className="flex flex-col gap-5 ">
                <h1 className="text-4xl leading-[34px] font-bold w-[315px] xl:text-[64px] xl:w-[577px] xl:leading-[64px]">
                  FIND CLOTHES THAT MATCHES YOUR STYLE
                </h1>
                <p className="text-sm font-normal leading-5 text-black/[0.6] xl:text-base">
                  Browse through our diverse range of meticulously crafted
                  garments, designed to bring out your individuality and cater
                  to your sense of style.
                </p>
                <button
                  className="text-[#FFFFFF] text-base font-medium w-[358px] py-4 rounded-full bg-[#000000] xl:w-[210px]"
                  onClick={shopNowHandler}
                >
                  Shop Now
                </button>
              </div>
              <div className="flex flex-row flex-wrap items-center justify-center xl:py-12 xl:justify-start ">
                <div>
                  <h2 className="text-2xl font-bold xl:text-[40px]">200+</h2>
                  <p className="text-xs font-normal leading-5  text-black/[0.6] xl:text-base">
                    International Brands
                  </p>
                </div>
                <div className="px-[26.5px] bg-black/[10%] rotate-90 border-[1px] xl:px-8"></div>
                <div>
                  <h2 className="text-2xl font-bold xl:text-[40px]">2000+</h2>
                  <p className="text-xs font-normal leading-5 text-black/[0.6] xl:text-base">
                    High-Quality Products
                  </p>
                </div>
                <div className="hidden xl:block bg-black/[10%] rotate-90 border-[1px] xl:px-8"></div>
                <div className="mt-3">
                  <h2 className="text-2xl font-bold xl:text-[40px]">30,000+</h2>
                  <p className="text-xs font-normal leading-5 text-black/[0.6] xl:text-base">
                    Happy Customers
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img src="/mainImag.png" className="h-full"></img>
          </div>
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
