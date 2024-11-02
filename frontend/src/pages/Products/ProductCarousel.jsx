import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
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
  return (
    <div className="">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Swiper
          navigation={true}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, Autoplay, Pagination]}
          className="mySwiper"
        >
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
              <SwiperSlide key={_id}>
                <div className="p-4">
                  <img
                    src={image}
                    alt={name}
                    className="max-h-56 w-full object-cover"
                  />
                  <div className="grid llg:grid-cols-2 gap-3 p-3">
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

                    <div className="flex justify-between">
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
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      )}
    </div>
  );
};

export default ProductCarousel;
