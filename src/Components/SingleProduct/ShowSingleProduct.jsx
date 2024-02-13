import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../../slices/singleProductSlice";
import { SingleProduct } from "./SingleProduct";

export const ShowSingleProduct = () => {
  const singleProduct = useSelector((state) => state.singleProduct);
  const dispatch = useDispatch();
  const id = 1;

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  return (
    <div>
      {singleProduct.loading ? (
        <p>Loading...</p>
      ) : singleProduct.error ? (
        <p>Error fetching single product: {singleProduct.error}</p>
      ) : (
        <div>
          <SingleProduct {...singleProduct.data} />
        </div>
      )}
    </div>
  );
};
