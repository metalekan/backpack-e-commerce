import React from "react";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();
  // console.log(data);
  return (
    <div className="lg:p-8 p-4 mx-auto">
      <div className="grid lg:grid-cols-2 lg:gap-6 gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          {data?.map((product) => (
            <div key={product._id}>
              <SmallProduct product={product} />
            </div>
          ))}
        </div>
        <ProductCarousel />
      </div>
    </div>
  );
};

export default Header;
