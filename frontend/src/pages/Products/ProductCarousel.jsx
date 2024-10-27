import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { Badge, Card } from "flowbite-react";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mx-auto max-w-3xl w-full">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings}>
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <Card key={_id}>
                <img src={image} alt={name} className="object-cover" />

                <div className="grid lg:grid-cols-2 gap-3 p-3">
                  <div className="space-y-3">
                    <h2 className="text-base font-semibold text-gray-900">
                      {name}
                    </h2>
                    <Badge color="pink" className="w-fit" size="lg">
                      {price?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </Badge>
                    <p className="text-sm text-gray-600">
                      {description.substring(0, 170)} ...
                    </p>
                  </div>

                  <div className="flex justify-around">
                    <div className="one">
                      <h1 className="flex items-center mb-6 truncate text-xs md:text-sm text-gray-900">
                        <FaStore className="mr-2 text-gray-600" /> Brand:{" "}
                        {brand}
                      </h1>
                      <h1 className="flex items-center mb-6 truncate text-xs md:text-sm text-gray-900">
                        <FaClock className="mr-2 text-gray-600" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6 truncate text-xs md:text-sm text-gray-900">
                        <FaStar className="mr-2 text-gray-600" /> Reviews:
                        {numReviews}
                      </h1>
                    </div>

                    <div className="two">
                      <h1 className="flex items-center mb-6 truncate text-xs md:text-sm text-gray-900">
                        <FaStar className="mr-2 text-gray-600" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center mb-6 truncate text-xs md:text-sm text-gray-900">
                        <FaShoppingCart className="mr-2 text-gray-600" />{" "}
                        Quantity: {quantity}
                      </h1>
                      <h1 className="flex items-center mb-6 truncate text-xs md:text-sm text-gray-900">
                        <FaBox className="mr-2 text-gray-600" /> In Stock:{" "}
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </Card>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
