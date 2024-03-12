import React, { useEffect, useState } from "react";
import ProductCards from "../utils/Cards/ProductCards";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../redux/action/productAction";
import { ColorRing } from "react-loader-spinner";

const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  console.log(productList)

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  return (
    <div className="flex flex-col mx-4 gap-8">
      <div>
        <h1 className="text-2xl font-bold">Products</h1>
      </div>
      {
        (loading ? (
            <div className='items-center flex justify-center'>
            <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            
            />
            </div>
        ):(
            <div className="flex flex-row flex-wrap gap-[10px] gap-y-[28px] justify-center">
            {products.map((products) => (
              <div>
                <ProductCards products={products} />
              </div>
            ))}
          </div>
        ))
      }

    </div>
  );
};

export default ProductList;