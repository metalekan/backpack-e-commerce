import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Message from "../components/Message";
import Product from "./Products/Product";
import { Button } from "flowbite-react";

const Home = () => {
  const { keyword } = useParams();
  console.log(keyword);
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <div className="mt-[4rem]">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium">Special Products</h1>
            <Link to="/shop">
              <Button color="purple" pill>
                Shop
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[4rem]">
            {data?.products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
