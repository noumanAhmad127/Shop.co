import React from "react";
import Rating from "../Rating";
import { Link } from "react-router-dom";

const ProductCards = ({ products }) => {
  return (
    <div className="w-[172px] xl:w-[295px]">
      <div className="flex flex-col gap-3">
        <div>
          <Link to={`/products/${products._id}`}>
            <img
              src={products.image}
              className="w-[172px] h-[174px] rounded-[13.42px] bg-contain xl:w-full xl:h-[298px]"
            ></img>
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <Link to={`/products/${products._id}`}>
            <h1 className="text-base font-bold text-ellipsis hover:underline xl:text-[20px]">
              {products.name}
            </h1>
          </Link>
          <div className="flex flex-row items-center gap-1">
            <div>
              <Rating value={products.rating} />
            </div>
            <div>
              <p className="text-[12px] font-normal xl:text-[18.49px]">
                {products.rating}/5
              </p>
            </div>
          </div>
          <div>
            <p className="text-xl font-bold xl:text-2xl">${products.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
