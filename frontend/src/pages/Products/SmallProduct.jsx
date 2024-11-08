import { Badge, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <Card>
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-sm object-contain"
        />
        <HeartIcon product={product} />
      </div>

      <div className="mt-4 flex justify-between items-center fflex-wrap gap-3">
        <Link to={`/product/${product._id}`} className="group">
          <div className="flex justify-between items-center relative">
            <span className="text-sm font-medium capitalize truncate after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:absolute after:origin-bottom-left after:transform after:ease-in-out after:duration-500 cursor-pointer after:w-full group-hover:after:scale-x-100 group-hover:after:origin-bottom-left after:bg-gray-900 text-gray-700 group-hover:text-gray-900">
              {product.name.substring(0, 50)}
            </span>
          </div>
        </Link>
        <Badge color="pink" size="xs">
          {product?.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Badge>
      </div>
    </Card>
  );
};

export default SmallProduct;
