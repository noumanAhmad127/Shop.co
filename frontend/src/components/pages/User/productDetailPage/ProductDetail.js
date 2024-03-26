import React, { useEffect, useLayoutEffect, useState } from "react";
import Rating from "../../../utils/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  createReviewProduct,
  detailProduct,
} from "../../../../redux/action/productAction";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { actionTypes } from "../../../../redux/action/action-types";

const ProductDetail = ({ id }) => {
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = productCreateReview;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (successReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: actionTypes.PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(detailProduct(id));
  }, [dispatch, id, successReview]);
  console.log(product);

  const decreamentHandler = () => {
    setQty(qty - 1);
  };

  const increamentHandler = () => {
    setQty(qty + 1);
  };

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReviewProduct(id, {
        rating,
        comment,
      })
    );
  };

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
          <div className="flex flex-col gap-9 ">
            <div className="flex flex-col gap-9 xl:flex-row">
              <div className="xl:basis-1/2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-[20px]"
                />
              </div>
              <div className="flex flex-col gap-4 xl:basis-1/2">
                <h1 className="text-2xl font-bold xl:text-4xl">
                  {product.name}
                </h1>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-1 items-center">
                    <div>
                      <Rating value={product.rating} />
                    </div>
                    <div>
                      <p className="text-[12px] font-normal xl:text-base">
                        {product.rating}/5
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold xl:text-3xl">
                      ${product.price}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-normal text-black/[60%] mr-3 xl:text-base">
                    {product.description}
                  </p>
                </div>
                <hr className="border-[1px] my-6" />
                <div>
                  <div className="flex flex-row gap-2 items-center">
                    <div className="flex flex-row justify-evenly bg-[#F0F0F0] rounded-full py-3 px-4 w-full basis-2/5">
                      <span className="text-xl font-bold xl:text-2xl">
                        <button
                          onClick={decreamentHandler}
                          disabled={qty === 0}
                        >
                          -
                        </button>
                      </span>
                      <span className="text-xl font-bold xl:text-2xl">
                        {qty}
                      </span>
                      <span className="text-xl font-bold xl:text-2xl">
                        <button
                          onClick={increamentHandler}
                          disabled={qty >= product.countInStock}
                        >
                          +
                        </button>
                      </span>
                    </div>
                    <div className="w-full basis-9/12 py-3 bg-black rounded-full text-center">
                      <button
                        className="text-white text-base xl:text-lg"
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-[1px] my-6" />
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-lg text-semibold xl:text-2xl xl:font-bold">
                All Reviews{" "}
                <span className="text-slate-400 text-sm">
                  ({product.numReviews})
                </span>
              </h1>
            </div>
            <div>
              {product.review.length === 0 && (
                <h1 className="py-2 px-3 text-normal font-semibold bg-blue-200 text-blue-300">
                  No Reviews
                </h1>
              )}
              <div className="flex flex-col gap-3 my-2 w-full xl:my-5 xl:gap-5">
                <h1 className="text-base text-black font-semibold xl:text-xl xl:font-bold">
                  Write a Customer Review
                </h1>
                {errorReview && (
                  <h1 className="px-2 py-1 bg-red-300 text-red-500 text-sm w-full">
                    {errorReview.message}
                  </h1>
                )}
                {product.review.user === userInfo._id &&
                  alert("Already Reviewed")}
                {!userInfo && (
                  <h1 className="text-sm text-slate-400">
                    Please <Link to="/login">Login</Link> to write a review
                  </h1>
                )}
                <form onSubmit={submitHandler} className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    <label className="text-sm font-semibold xl:text-base xl:font-bold">
                      Rating:{" "}
                    </label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className=" px-2 py-1 text-sm  border-[1px] bolder-black/5 xl:text-base"
                    >
                      <option value="">Select</option>
                      <option value="1">&#9733;</option>
                      <option value="2">&#9733;&#9733;</option>
                      <option value="3">&#9733;&#9733;&#9733;</option>
                      <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
                      <option value="5">
                        &#9733;&#9733;&#9733;&#9733;&#9733;
                      </option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm font-semibold xl:text-base xl:font-bold">
                      Write Comment
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="border-[1px] border-black/5 px-1 py-1 xl:px-3 xl:py-5"
                    ></textarea>
                  </div>
                  {loadingReview ? (
                    <button
                      disabled
                      className="px-4 py-3 bg-black text-white self-start rounded-[62px]"
                    >
                      {" "}
                      <i
                        className="fa-solid fa-circle-notch fa-spin"
                        style={{ fontSize: "18px", marginRight: "8px" }}
                      ></i>{" "}
                      Comment
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-4 py-3 bg-black text-white self-start rounded-[62px]"
                    >
                      {" "}
                      Comment
                    </button>
                  )}
                </form>
              </div>
              <div className="flex flex-col gap-3 xl:flex-row xl:flex-wrap xl:gap-5">
                {product.review.map((review) => (
                  <div
                    key={review._id}
                    className="rounded-[20px] border-[1px] border-black/5 basis-[49%]"
                  >
                    <div className="p-6 flex flex-col gap-3">
                      <div>
                        <Rating value={review.rating} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <h1 className="text-base font-semibold xl:text-xl">
                          {review.name}
                        </h1>
                        <p className="text-sm text-slate-600 xl:text-base">
                          "{review.comment}"
                        </p>
                        <p className="text-sm text-slate-600 font-semibold my-2 xl:text-base">
                          Posted on {review.createdAt.substring(0, 10)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
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
