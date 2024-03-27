import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import {
  detailProduct,
  updateProduct,
} from "../../../redux/action/productAction";
import { actionTypes } from "../../../redux/action/action-types";
import axios from "axios";

const ProductEdit = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  // const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;
  console.log(product);
  console.log(id);

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
    product: updatedProduct,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: actionTypes.PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== id) {
        dispatch(detailProduct(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setImage(product.image);
        setBrand(product.brand);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, id, navigate, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const sumbitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      })
    );
  };
  return (
    <div className="flex flex-col justify-center mx-6 my-10 max-w-3xl xl:mx-auto">
      <div className="flex flex-col gap-10">
        <div>
          {loadingUpdate && (
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
          {errorUpdate && (
            <h1 className="text-center bg-red-300 text-red-600 text-sm py-4 w-full">
              {errorUpdate}
            </h1>
          )}
          {loading && (
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
          {error && (
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
            <h1 className="text-3xl font-medium">Edit Product</h1>
            <p className="text-sm">Enter details below</p>
          </div>
          <div className="flex flex-col gap-4">
            <form onSubmit={sumbitHandler} autoComplete="off">
              <div className="flex flex-col gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Enter Prroduct Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-sm border-b-[1px] border-black/[60%] w-full px-1 py-3 autofill:none"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Enter Product Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="text-sm border-b-[1px] border-black/[60%] w-full px-1 py-3 autofill:none"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Product Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="text-sm border-b-[1px] border-black/[60%] w-full px-1 py-3 autofill:none"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Product Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="text-sm border-b-[1px] border-black/[60%] w-full px-1 py-3 autofill:none"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="text-sm border-b-[1px] border-black/[60%] w-full px-1 py-3 autofill:none"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Enter Product Stock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    className="text-sm border-b-[1px] border-black/[60%] w-full px-1 py-3 autofill:none"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Product Image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="text-sm border-b-[1px] border-black/[60%] w-full px-1 py-3 autofill:none"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    aria-label="choose file"
                    onChange={uploadFileHandler}
                    className="text-sm border-b-[1px] border-black/[60%] w-full px-1 py-3 autofill:none"
                    autoComplete="off"
                  />
                  {uploading && (
                    <i className="fa-solid fa-circle-notch fa-spin mx-3"></i>
                  )}
                </div>

                <div className="my-2">
                  {loadingUpdate ? (
                    <button
                      className="text-base text-white bg-black/80 py-4 w-full rounded-full"
                      disabled
                    >
                      <i className="fa-solid fa-circle-notch fa-spin mx-3"></i>
                      Update
                    </button>
                  ) : (
                    <button
                      className="text-base text-white bg-black py-4 w-full rounded-full"
                      type="submit"
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
