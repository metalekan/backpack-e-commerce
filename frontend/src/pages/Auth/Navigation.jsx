import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { Dropdown } from "flowbite-react";
import {
  HiCog,
  HiCurrencyDollar,
  HiLogout,
  HiShoppingCart,
  HiSortAscending,
  HiUser,
  HiUsers,
  HiViewGrid,
} from "react-icons/hi";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLoginMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className="hidden lg:flex flex-col justify-between p-4 text-white bg-[#011222] w-[15%] max-h-screen sticky top-0"
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="nav-item-name mt-[3rem]">HOME</span>{" "}
        </Link>

        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="nav-item-name mt-[3rem]">SHOP</span>{" "}
        </Link>

        <Link to="/cart" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
            <span className="nav-item-name mt-[3rem]">Cart</span>{" "}
          </div>

          {/* <div className="absolute top-9">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div> */}
        </Link>

        <Link to="/favorite" className="flex relative">
          <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
            <FaHeart className="mt-[3rem] mr-2" size={20} />
            <span className="nav-item-name mt-[3rem]">Favorites</span>{" "}
            {/* <FavoritesCount /> */}
          </div>
        </Link>
      </div>

      <div className="relative">
        {userInfo &&
          (userInfo.isAdmin ? (
            <Dropdown label={userInfo.username} inline>
              <Dropdown.Header>
                <span className="block text-sm">{userInfo.username}</span>
                <span className="block truncate text-sm font-medium">
                  {userInfo.email}
                </span>
              </Dropdown.Header>
              <Link to="/admin/dashboard">
                <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
              </Link>

              <Link to="/admin/productlist">
                <Dropdown.Item icon={HiCog}> Products</Dropdown.Item>
              </Link>

              <Link to="/admin/categorylist">
                <Dropdown.Item icon={HiSortAscending}>Category </Dropdown.Item>
              </Link>

              <Link to="/admin/orderlist">
                <Dropdown.Item icon={HiShoppingCart}>Orders </Dropdown.Item>
              </Link>

              <Link to="/admin/userlist">
                <Dropdown.Item icon={HiUsers}>Users</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item icon={HiLogout} onClick={logoutHandler}>
                Log out
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Dropdown label={userInfo.username} inline>
              <Dropdown.Header>
                <span className="block text-sm">{userInfo.username}</span>
                <span className="block truncate text-sm font-medium">
                  {userInfo.email}
                </span>
              </Dropdown.Header>
              <Link to="/profile">
                <Dropdown.Item icon={HiUser}>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Item icon={HiLogout} onClick={logoutHandler}>
                Log out
              </Dropdown.Item>
            </Dropdown>
          ))}

        {!userInfo && (
          <ul>
            <li>
              <Link
                to="/login"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                <span className="nav-item-name">LOGIN</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={26} />
                <span className="nav-item-name">REGISTER</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;