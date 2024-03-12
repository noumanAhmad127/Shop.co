import React, { useEffect, useState } from "react";
import Rating from "../../utils/Rating";
import { useDispatch, useSelector } from "react-redux";
import { detailProduct } from "../../../redux/action/productAction";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const ProductDetail = ({ id }) => {
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;
  const [qty, setQty] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(detailProduct(id));
  }, [dispatch]);
  console.log(product);

  const decreamentHandler = () => {
    setQty(qty - 1);
  };

  const increamentHandler = () => {
    setQty(qty + 1);
  };

  const addToCartHandler = () =>{
    navigate(`/cart/${id}?qty=${qty}`)
  }

  return (
    <div className="mx-4">
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
      ) : (
        <>
          <div className=" flex flex-col gap-9">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="rounded-[20px]"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-1 items-center">
                  <div>
                    <Rating value={product.rating} />
                  </div>
                  <div>
                    <p className="text-[12px] font-normal">
                      {product.rating}/5
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold">${product.price}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-normal text-black/[60%] mr-3">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
          <hr className="border-[1px] my-6" />
          <div>
            <div className="flex flex-row gap-2 items-center">
              <div className="flex flex-row justify-evenly bg-[#F0F0F0] rounded-full py-3 px-4 w-full basis-2/5">
                <span className="text-xl font-bold">
                  <button onClick={decreamentHandler} disabled={qty === 0}>
                    -
                  </button>
                </span>
                <span className="text-xl font-bold">{qty}</span>
                <span className="text-xl font-bold">
                  <button
                    onClick={increamentHandler}
                    disabled={qty >= product.countInStock}
                  >
                    +
                  </button>
                </span>
              </div>
              <div className="w-full basis-9/12 py-3 bg-black rounded-full text-center">
                  <button className="text-white text-base"  disabled={product.countInStock === 0} onClick={addToCartHandler}>Add to Cart</button>
              </div>
            </div>
          </div>
          <hr className="border-[1px] my-6" />
        </>
      )}
    </div>
  );
};

export default ProductDetail;
