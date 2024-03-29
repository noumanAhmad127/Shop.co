import React, { useEffect, useLayoutEffect, useState } from "react";
import ProductCards from "../../../utils/Cards/ProductCards";
import ProductDetail from "./ProductDetail";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ProductDetailStatic = () => {
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { success: successReview } = productCreateReview;

  const { id } = useParams();

  const fetchProducts = async () => {
    const { data } = await axios.get(`/api/products`);
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [id, successReview]);

  const [products, setProducts] = useState([]);
  // const fetchProducts = async () => {
  //   const { data } = await axios.get(`/api/products`);
  //   setProducts(data);
  // };

  return (
    <>
      <div className="xl:w-[85%] xl:mx-auto xl:py-20">
        <ProductDetail id={id} />
        <div className="flex flex-col gap-14 mx-4">
          <div>
            <h1 className="text-2xl font-bold items-center xl:text-3xl">
              You might also Like This
            </h1>
          </div>
          <div className="flex flex-row gap-3 overflow-scroll">
            {[...products]
              .sort(() => 0.5 - Math.random())
              .slice(0, 4)
              .map((products) => (
                <div key={products._id}>
                  <ProductCards products={products} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailStatic;
