import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import { Card, Badge, Button } from "flowbite-react";
import { HiArrowRight } from "react-icons/hi";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully");
  };

  return (
    <Card key={p._id}>
      <div className="relative">
        <Link to={`/product/${p._id}`}>
          <Badge className="absolute top-3 left-3" color="gray">
            {p?.brand}
          </Badge>
          <img
            className="cursor-pointer max-h-32 lg:max-h-44 w-full object-contain"
            src={p.image}
            alt={p.name}
          />
        </Link>
        <HeartIcon product={p} />
      </div>

      <div className="flex items-center justify-between gap-3">
        <h5 className="mb-2 text-base font-medium capitalize text-gray-900">
          {p?.name?.substring(0, 30)}...
        </h5>

        <Badge color="pink" size="sm">
          {p?.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Badge>
      </div>

      <p className="font-normal text-gray-500 text-sm">
        {p?.description?.substring(0, 60)} ...
      </p>

      <section className="flex justify-between items-center">
        <Link to={`/product/${p._id}`}>
          <Button color="purple" className="w-fit" size="sm">
            Read More
            <HiArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>

        {p?.countInStock > 0 ? (
          <button
            className="p-2 rounded-full"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        ) : null}
      </section>
    </Card>
  );
};

export default ProductCard;
