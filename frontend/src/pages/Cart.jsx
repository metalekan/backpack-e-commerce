import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { Button, Select } from "flowbite-react";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto lg:p-4">
        {cartItems.length === 0 ? (
          <div className="text-center">
            Your cart is empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <div className="flex flex-col p-4">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex lg:flex-row flex-col lg:items-center justify-between mb-4 p-4 border rounded-md"
                >
                  <div className="flex items-center gap-2 lg:gap-4">
                    <div className="w-[5rem] h-[5rem] lg:w-[8rem] lg:h-[8rem]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain rounded"
                      />
                    </div>

                    <div className="space-y-2">
                      <Link
                        to={`/product/${item._id}`}
                        className="text-gray-900 font-medium capitalize"
                      >
                        {item.name.substring(0, 50)}
                      </Link>

                      <div className="text-gray-900">{item.brand}</div>
                      <div className=" text-gray-900 font-bold">
                        {item?.price?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-3 lg:mt-0">
                    <Select
                      color="purple"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Select>

                    <Button
                      color="failure"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mt-5 text-gray-900">
              <h2 className="lg:text-2xl text-xl font-semibold lg:font-bold mb-2">
                Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h2>

              <div className="lg:text-2xl text-xl font-semibold lg:font-bold">
                ${" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </div>

              <Button
                color="purple"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;