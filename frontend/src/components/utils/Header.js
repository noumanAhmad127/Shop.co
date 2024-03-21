import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/action/userAction";
import SearchBox from "./SearchBox";

const Header = () => {
  const [userMenu, setUserMenu] = useState(false);
  const [adminMenu, setAdminMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const signOutHandler = () => {
    dispatch(logOut());
    navigate("/");
  };

  const handleSearch = () => {
    var x = document.getElementById("search");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  };

  return (
    <div>
      <div className="w-[90%] mx-auto py-5">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2">
            <div>
              <span className="w-[24px] h-[24px]">
                <i className="fa-solid fa-bars w-[24px] h-[24px]"></i>
              </span>
            </div>
            <div>
              <Link to="/">
                <h1 className="text-[25.2] font-bold text-black">SHOP.CO</h1>
              </Link>
            </div>
          </div>
          <div>
            <div className="flex gap-3">
              <span className="">
                <i
                  className="fa-solid fa-magnifying-glass w-[24px] h-[24px]"
                  onClick={handleSearch}
                ></i>
              </span>
              <div className="absolute top-[70px] right-7" id="search">
                <SearchBox />
              </div>
              <span>
                <Link to="/cart">
                  <i className="fa-solid fa-cart-shopping w-[24px] h-[24px]"></i>
                </Link>
              </span>
              <span>
                {userInfo ? (
                  <div className="relative inline-block text-left">
                    <div
                      onClick={() => setUserMenu(!userMenu)}
                      onMouseEnter={() => setUserMenu(true)}
                      onMouseLeave={() => setUserMenu(false)}
                      className="hover:cursor-pointer"
                    >
                      <span className="text-sm font-bold py-2 ">
                        {userInfo.name}
                      </span>
                    </div>
                    {userMenu && (
                      <div
                        onMouseEnter={() => setUserMenu(true)}
                        onMouseLeave={() => setUserMenu(false)}
                        className="absolute right-0  mt-1 origin-top-right w-28 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="py-1">
                          <Link
                            to="/profile"
                            className="text-gray-700 block px-4 py-2 text-sm"
                          >
                            Profile
                          </Link>
                          <button
                            className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                            onClick={signOutHandler}
                          >
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/login">
                    <i className="fa-regular fa-circle-user w-[24px] h-[24px]"></i>
                  </Link>
                )}
              </span>
              <span>
                {userInfo && userInfo.isAdmin && (
                  <div className="relative inline-block text-left">
                    <div
                      onClick={() => setAdminMenu(!adminMenu)}
                      onMouseEnter={() => setAdminMenu(true)}
                      onMouseLeave={() => setAdminMenu(false)}
                      className="hover:cursor-pointer"
                    >
                      <span className="text-sm font-bold py-2 ">Admin</span>
                    </div>
                    {adminMenu && (
                      <div
                        onMouseEnter={() => setAdminMenu(true)}
                        onMouseLeave={() => setAdminMenu(false)}
                        className="absolute right-0  mt-1 origin-top-right w-28 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="py-1">
                          <Link
                            to="/admin/userlist"
                            className="text-gray-700 block px-4 py-2 text-sm"
                          >
                            Users
                          </Link>
                          <Link
                            to="/admin/productlist"
                            className="text-gray-700 block px-4 py-2 text-sm"
                          >
                            Products
                          </Link>
                          <Link
                            to="/admin/orderslist"
                            className="text-gray-700 block px-4 py-2 text-sm"
                          >
                            Orders
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
