import React, { useState } from "react";
import { Drawer } from "@mui/material";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import {
  FaCheck,
  FaAngleDown,
  FaRegUser,
  FaRegHeart,
  FaAlignJustify,
  FaComputer,
} from "react-icons/fa6";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { CiMobile1, CiDesktopMouse1, CiSearch } from "react-icons/ci";
import { PiTelevision } from "react-icons/pi";
import { FaFireAlt } from "react-icons/fa";
import { IoIosTabletPortrait, IoMdLaptop } from "react-icons/io";
import EnglandFlag from "../../../../public/images/la-co-vuong-quoc-anh.jpg";
import VieNamFlag from "../../../../public/images/la-co-viet-nam.jpg";
import GermanyFlag from "../../../../public/images/quoc-ky-duc.png";
import IndiaFlag from "../../../../public/images/la-co-an-do.jpg";
import Logo from "../../../../public/images/logo.jpg";

const Header = () => {
  const [isDropdownLoginActive, setIsDropdownLoginActive] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [activeIndexNavigation, setActiveIndexNavigation] = useState(0);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [openMenuTablet, setopenMenuTablet] = useState(false);
  const [activeMenu, setActiveMenu] = useState("main_Menu");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleItemNavigationClick = (index: React.SetStateAction<number>) => {
    setActiveIndexNavigation(index);
  };

  const toggleDrawerCart = (isOpenCart: boolean) => () => {
    setOpenCart(isOpenCart);
  };

  const toggleDrawerMenuTablet = (isOpenMenuTablet: boolean) => () => {
    setopenMenuTablet(isOpenMenuTablet);
  };


  const handleUserIconClick = () => {
    setIsDropdownLoginActive(!isDropdownLoginActive);
    console.log("isDropdownLoginActive");
  };

  const handleSearchButtonClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShowSearchResult(!showSearchResult);
  };

  return (
    <header>
      <div className={styles.header}>
        <div className={` py-2 hidden md:block ${styles.top_header}`}>
          <div className="container mx-auto 2xl:px-28 lg:px-5 md:px-3 text-center main_top_header grid grid-cols-12 justify-center items-center">
            <div className="left_top_header col-span-6">
              <div>
                <ul className="flex text-base">
                  <li className="px-3">
                    <Link to="">Shipping</Link>
                  </li>
                  <li className="px-3">
                    <Link to="">FAQ</Link>
                  </li>
                  <li className="px-3">
                    <Link to="">Contact</Link>
                  </li>
                  <li className="px-3">
                    <Link to="">Track Order</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`col-span-6 ${styles.right_top_header}`}>
              <div className="flex justify-end">
                <div className={`pe-7 ${styles.return}`}>
                  <ul className="flex text-base">
                    <li className="pe-1 pt-1">
                      <FaCheck />
                    </li>
                    <li>Free 30 day money back guarantee</li>
                  </ul>
                </div>
                <div
                  className={`pe-5 cursor-pointer relative hidden lg:block ${styles.language}`}
                >
                  <div className={styles.language_default}>
                    <ul className="flex text-base">
                      <li
                        style={{ width: "30px", height: "auto" }}
                        className="pe-1 pt-1"
                      >
                        <img src={EnglandFlag} alt="" />
                      </li>
                      <li>English</li>
                      <li className="pt-1 ps-1">
                        <FaAngleDown />
                      </li>
                    </ul>
                  </div>
                  <div className={styles.language_change}>
                    <ul>
                      <li className="flex">
                        <img
                          style={{ width: "30px", height: "auto" }}
                          className="pe-1 pt-1"
                          src={VieNamFlag}
                          alt=""
                        />
                        <span className="text-sm pt-1">Vietnamese</span>
                      </li>
                      <li className="flex">
                        <img
                          style={{ width: "30px", height: "auto" }}
                          className="pe-1 pt-1"
                          src={GermanyFlag}
                          alt=""
                        />
                        <span className="text-sm pt-1">German</span>
                      </li>
                      <li className="flex">
                        <img
                          style={{ width: "30px", height: "auto" }}
                          className="pe-1 pt-1"
                          src={IndiaFlag}
                          alt=""
                        />
                        <span className="text-sm pt-1">Indian</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={` hidden xl:block  ${styles.middler_header}`}>
          <div className="main_bottom_header grid grid-cols-12 container mx-auto 2xl:px-28 lg:px-5 text-center py-5 justify-center items-center">
            <div className="logo col-span-3">
              <Link to="/"><img src={Logo} alt="" /></Link>
            </div>
            <div
              className={`col-span-6 flex text-sm relative ms-20 2xl:ms-10 lg:ms-10 ${styles.support}`}
            >
              <div className="message">
                <ul className="text-left">
                  <li>
                    <span>Send us a message</span>
                  </li>
                  <li>
                    <a className="font-bold" href="">
                      support.technocy@example.com
                    </a>
                  </li>
                </ul>
              </div>
              <div className="phone ms-24 2xl:ms-32">
                <ul className="text-left">
                  <li>
                    <span>Need help? Call Us:</span>
                  </li>
                  <li>
                    <a className="font-bold text-base" href="">
                      +84 2500 888 33
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`col-span-3 ${styles.icon}`}>
              <div className="icon_action flex justify-end">
                <div className="site_header_account relative mx-3">
                  <a onClick={handleUserIconClick} href="#">
                    <FaRegUser className="text-xl" />
                  </a>
                  <div
                    className={`${styles.accountDropdown} ${isDropdownLoginActive ? styles.active : ""
                      }`}
                  >
                    <div className={styles.account_wrap}>
                      <div className={styles.account_inner}>
                        <div
                          className={`flex justify-between mb-4 ${styles.account_login_header}`}
                        >
                          <span className="text-lg">Sign in</span>
                          <span>
                            <a href="#">Create an Account</a>
                          </span>
                        </div>
                        <form className={`mb-2 ${styles.accont_form_login}`}>
                          <p className="mb-5">
                            <label className="flex text-base">
                              Email
                              <span className="px-1">*</span>
                            </label>
                            <input
                              name="Email"
                              type="text"
                              required
                              placeholder="Email"
                            />
                          </p>
                          <p className="mb-5">
                            <label className="flex text-base">
                              Password
                              <span className="px-1">*</span>
                            </label>
                            <input
                              name="Password"
                              type="text"
                              required
                              placeholder="Password"
                            />
                          </p>
                          <button type="submit">Login</button>
                        </form>
                        <div className={styles.forget_password_account}>
                          <a href="">Forget your password?</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="site_header_wishlist mx-3">
                  <a className="flex" href="">
                    <FaRegHeart className="text-xl" />
                    <span className="ms-1 -mt-2">0</span>
                  </a>
                </div>
                <div className="site_header_cart relative mx-3">
                  <a onClick={toggleDrawerCart(true)} className="flex" href="#">
                    <IoBagCheckOutline className="text-xl" />
                    <span className="ms-1 -mt-2">0</span>
                  </a>
                  <Drawer
                    anchor="right"
                    open={openCart}
                    onClose={toggleDrawerCart(false)}
                    className={styles.cart}
                  >
                    <div className={styles.shopping_cart}>
                      <div
                        className={`py-5 flex justify-between ${styles.title}`}
                      >
                        <span className="ps-3 pe-5 font-extrabold text-xl">
                          SHOPPING CART
                        </span>
                        <a
                          onClick={toggleDrawerCart(false)}
                          className={`flex ps-16 pe-5 text-sm font-normal pt-1 ${styles.close}`}
                          href="#"
                        >
                          CLOSE <IoCloseSharp className=" font-black text-lg" />
                        </a>
                      </div>
                      <div className={styles.product}>
                        <ul>
                          <li>
                            <div className={` ps-3 ${styles.product_details}`}>
                              <img
                                className="px-1 pt-2"
                                src={VieNamFlag}
                                style={{ width: "60px", height: "50px" }}
                                alt=""
                              />
                              <div className={styles.product_name}>
                                <h5 className="font-bold text-sm cursor-pointer">
                                  Blender Combo with Sin Serve Cups Serve Cups
                                  Serve Cups Serve Cups
                                </h5>
                                <div className="flex text-sm">
                                  <span className="pe-1">1</span>X
                                  <span className={` px-1 ${styles.price}`}>
                                    $385.96
                                  </span>
                                </div>
                              </div>
                              <div
                                className={` ps-9 cursor-pointer ${styles.remove}`}
                              >
                                <IoCloseSharp />
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className={` ps-3 ${styles.product_details}`}>
                              <img
                                className="px-1 pt-2"
                                src={VieNamFlag}
                                style={{ width: "60px", height: "50px" }}
                                alt=""
                              />
                              <div className={styles.product_name}>
                                <h5 className="font-bold text-sm">
                                  Blender Combo with Sin Serve Cups
                                </h5>
                                <div className="flex text-sm">
                                  <span className="pe-1">1</span>X
                                  <span className={` px-1 ${styles.price}`}>
                                    $385.96
                                  </span>
                                </div>
                              </div>
                              <div
                                className={` ps-9 cursor-pointer ${styles.remove}`}
                              >
                                <IoCloseSharp />
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className={styles.bottom_cart}>
                        <div
                          className={`flex justify-between px-2 ${styles.subtotal}`}
                        >
                          <strong className="text-lg font-medium">
                            SUBTOTAL:
                          </strong>
                          <span className={styles.total_price}>$13212.54</span>
                        </div>
                        <div className={styles.view_cart}>
                          <a href="#">View cart</a>
                        </div>
                        <div className={styles.checkout}>
                          <a href="#">Checkout</a>
                        </div>
                      </div>
                    </div>
                  </Drawer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={` hidden xl:block ${styles.bottom_header}`}>
          <div className="main_bottom_header grid grid-cols-12 container mx-auto 2xl:px-28 lg:px-5 text-center justify-center items-center py-2">
            <div className={`col-span-3 relative ${styles.category}`}>
              <div
                className={` flex justify-between text-center ${styles.shopby_category}`}
              >
                <span>Shop by categories</span>
                <p className="text-base">
                  <FaAlignJustify />
                </p>
              </div>
              <div className={` hidden absolute ${styles.menu_category}`}>
                <ul>
                  <li>
                    <a
                      className="flex font-medium text-center px-3 py-3"
                      href="#"
                    >
                      <CiMobile1 className="text-lg me-4" />
                      <span className="text-sm">Mobiles</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex font-medium text-center px-3 py-3"
                      href="#"
                    >
                      <IoIosTabletPortrait className="text-lg me-4" />
                      <span className="text-sm">Tablets</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex font-medium text-center px-3 py-3"
                      href="#"
                    >
                      <IoMdLaptop className="text-lg me-4" />
                      <span className="text-sm">Laptops</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex font-medium text-center px-3 py-3"
                      href="#"
                    >
                      <PiTelevision className="text-lg me-4" />
                      <span className="text-sm">Televisions</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex font-medium text-center px-3 py-3"
                      href="#"
                    >
                      <FaComputer className="text-lg me-4" />
                      <span className="text-sm">Computer & Gamming</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex font-medium text-center px-3 py-3"
                      href="#"
                    >
                      <CiDesktopMouse1 className="text-lg me-4" />
                      <span className="text-sm">Accessories</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className={`col-span-6 flex text-xs xl:text-sm ${styles.navigation}`}
            >
              <div className={styles.main_navigation}>
                <ul className="flex">
                  <li
                    className={`px-5 font-bold ${activeIndexNavigation === 0 ? styles.active : ""
                      }`}
                    onClick={() => handleItemNavigationClick(0)}
                  >
                    <Link to="/">Home</Link>
                  </li>
                  <li
                    className={`px-5 font-bold ${activeIndexNavigation === 1 ? styles.active : ""
                      }`}
                    onClick={() => handleItemNavigationClick(1)}
                  >
                    <Link to="/Shop">Shop</Link>
                  </li>
                  <li
                    className={`px-5 font-bold  ${activeIndexNavigation === 2 ? styles.active : ""
                      }`}
                    onClick={() => handleItemNavigationClick(2)}
                  >
                    <Link to="/Blog">Blog</Link>
                  </li>
                  <li
                    className={`px-5 font-bold  ${activeIndexNavigation === 3 ? styles.active : ""
                      }`}
                    onClick={() => handleItemNavigationClick(3)}
                  >
                    <Link to="/Contact">Contact</Link>
                  </li>
                  <li
                    className={`px-5 font-bold  ${activeIndexNavigation === 4 ? styles.active : ""
                      }`}
                    onClick={() => handleItemNavigationClick(4)}
                  >
                    <Link to="/About">About</Link>
                  </li>
                </ul>
              </div>
              <div className={styles.hot_deals}>
                <a className="flex font-bold text-xs xl:text-sm" href="#">
                  <span className="pt-1 lg:pt:0">
                    <FaFireAlt />
                  </span>
                  <span className="ps-1">Hot deals</span>
                </a>
              </div>
            </div>
            <div className={`col-span-3 relative ${styles.search}`}>
              <form
                onClick={handleSearchButtonClick}
                className="form"
                action=""
                method="get"
              >
                <input type="search" placeholder="Search products..." />
                <button type="submit">
                  <CiSearch />
                </button>
              </form>
              {showSearchResult && (
                <div className={`absolute ${styles.search_result}`}>
                  <a href="#">
                    <div className={`flex ${styles.product_item}`}>
                      <img
                        style={{ width: "60px", height: "60px" }}
                        src={VieNamFlag}
                        alt=""
                      />
                      <div className={styles.product_content}>
                        <h3 className="text-sm font-normal">
                          Titlezxccccccccccccccccccccccccccc
                        </h3>
                        <strong>$123.123</strong>
                      </div>
                    </div>
                  </a>
                  <a href="#">
                    <div className={`flex ${styles.product_item}`}>
                      <img
                        style={{ width: "60px", height: "60px" }}
                        src={VieNamFlag}
                        alt=""
                      />
                      <div className={styles.product_content}>
                        <h3 className="text-sm font-normal">
                          Titlezxccccccccccccccccccccccccccc
                        </h3>
                        <strong>$123.123</strong>
                      </div>
                    </div>
                  </a>
                  <a href="#">
                    <div className={`flex ${styles.product_item}`}>
                      <img
                        style={{ width: "60px", height: "60px" }}
                        src={VieNamFlag}
                        alt=""
                      />
                      <div className={styles.product_content}>
                        <h3 className="text-sm font-normal">
                          Titlezxccccccccccccccccccccccccccc
                        </h3>
                        <strong className="text-sm font-bold">$123.123</strong>
                      </div>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={` hidden xl:hidden lg:block md:block sm:hidden ${styles.middler_header_tablet}`}>
          <div className="main_middler_header_tablet grid grid-cols-12 px-5 justify-center items-center py-4">
            <div className="logo col-span-4 pt-2">
              <Link to="/"><img src={Logo} alt="" /></Link>
            </div>
            <div className="title col-span-8">
              <div
                className={`col-span-6 flex text-base relative me-5 justify-end ${styles.support_tablet}`}
              >
                <div className="message">
                  <ul>
                    <li>
                      <span>Send us a message</span>
                    </li>
                    <li>
                      <a className="font-bold" href="">
                        support.technocy@example.com
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="phone ms-14">
                  <ul>
                    <li>
                      <span>Need help? Call Us:</span>
                    </li>
                    <li>
                      <a className="font-bold text-base" href="">
                        +84 2500 888 33
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={` block xl:hidden ${styles.bottom_header_tablet}`}>
          <div className="main_bottom_header_tablet flex justify-between px-5  items-center py-4">
            <div>
              <a onClick={toggleDrawerMenuTablet(true)} className="flex" href="#">
                <FaAlignJustify className="text-xl" />
              </a>
              <Drawer
                anchor="left"
                open={openMenuTablet}
                onClose={toggleDrawerMenuTablet(false)}
                className={styles.MenuTablet}
              >
                <div className={styles.main_nav}>
                  <div
                    className={` py-5 flex justify-between ${styles.title}`}>
                    <ul className="flex px-3">
                      <li>
                        <span className={`${activeMenu === "main_Menu" ? styles.active : ""
                          }`} onClick={() => handleMenuClick("main_Menu")}>
                          Main Menu
                        </span>
                      </li>
                      <li>
                        <span className={`${activeMenu === "shop_By_Categories" ? styles.active : ""
                          }`} onClick={() => handleMenuClick("shop_By_Categories")}>
                          Shop By Categories
                        </span>
                      </li>
                    </ul>
                    <a
                      onClick={toggleDrawerMenuTablet(false)}
                      className={` pe-5 text-sm font-normal pt-1 ${styles.close}`}
                      href="#"
                    >
                      <IoCloseSharp className=" font-black text-lg" />
                    </a>
                  </div>
                  <div className={`${activeMenu === "main_Menu" ? "" : "hidden"} ${styles.main_Menu}`}>
                    <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/Shop">Shop</Link></li>
                      <li><Link to="/Blog">Blog</Link></li>
                      <li><Link to="/Contact">Contact</Link></li>
                      <li><Link to="/About">About</Link></li>
                    </ul>
                  </div>
                  <div className={`${activeMenu === "shop_By_Categories" ? "" : "hidden"} ${styles.shop_By_Categories}`}>
                    <ul>
                      <li><a href="#">Mobiles</a></li>
                      <li><a href="#">Tablets</a></li>
                      <li><a href="#">Laptops</a></li>
                      <li><a href="#">Televisions</a></li>
                      <li><a href="#">Computer & Gamming</a></li>
                      <li><a href="#">Accessories</a></li>
                    </ul>
                  </div>
                  <div className={styles.language}>
                    <ul className="flex pt-3">
                      <li className="px-3"><img src={EnglandFlag} alt="" /></li>
                      <li className="px-3"><img src={VieNamFlag} alt="" /></li>
                      <li className="px-3"><img src={GermanyFlag} alt="" /></li>
                      <li className="px-3"><img src={IndiaFlag} alt="" /></li>
                    </ul>
                  </div>
                </div>

              </Drawer>
            </div>
            <div className="ps-16">
              <div className="logo">
                <Link to="/"><img src={Logo} alt="" /></Link>
              </div>
            </div>
            <div>
              <div className={` relative ${styles.site_header_cart_tablet}`}>
                <a onClick={toggleDrawerCart(true)} className="flex" href="#">
                  <IoBagCheckOutline className="text-xl" />
                  <span className="ms-1 -mt-2">0</span>
                </a>
                <Drawer
                  anchor="right"
                  open={openCart}
                  onClose={toggleDrawerCart(false)}
                  className={styles.cart}
                >
                  <div className={styles.shopping_cart}>
                    <div
                      className={`py-5 flex justify-between ${styles.title}`}
                    >
                      <span className="ps-3 pe-5 font-extrabold text-xl">
                        SHOPPING CART
                      </span>
                      <a
                        onClick={toggleDrawerCart(false)}
                        className={`flex ps-16 pe-5 text-sm font-normal pt-1 ${styles.close}`}
                        href="#"
                      >
                        CLOSE <IoCloseSharp className=" font-black text-lg" />
                      </a>
                    </div>
                    <div className={styles.product}>
                      <ul>
                        <li>
                          <div className={` ps-3 ${styles.product_details}`}>
                            <img
                              className="px-1 pt-2"
                              src={VieNamFlag}
                              style={{ width: "60px", height: "50px" }}
                              alt=""
                            />
                            <div className={styles.product_name}>
                              <h5 className="font-bold text-sm cursor-pointer">
                                Blender Combo with Sin Serve Cups Serve Cups
                                Serve Cups Serve Cups
                              </h5>
                              <div className="flex text-sm">
                                <span className="pe-1">1</span>X
                                <span className={` px-1 ${styles.price}`}>
                                  $385.96
                                </span>
                              </div>
                            </div>
                            <div
                              className={` ps-9 cursor-pointer ${styles.remove}`}
                            >
                              <IoCloseSharp />
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className={` ps-3 ${styles.product_details}`}>
                            <img
                              className="px-1 pt-2"
                              src={VieNamFlag}
                              style={{ width: "60px", height: "50px" }}
                              alt=""
                            />
                            <div className={styles.product_name}>
                              <h5 className="font-bold text-sm">
                                Blender Combo with Sin Serve Cups
                              </h5>
                              <div className="flex text-sm">
                                <span className="pe-1">1</span>X
                                <span className={` px-1 ${styles.price}`}>
                                  $385.96
                                </span>
                              </div>
                            </div>
                            <div
                              className={` ps-9 cursor-pointer ${styles.remove}`}
                            >
                              <IoCloseSharp />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className={styles.bottom_cart}>
                      <div
                        className={`flex justify-between px-2 ${styles.subtotal}`}
                      >
                        <strong className="text-lg font-medium">
                          SUBTOTAL:
                        </strong>
                        <span className={styles.total_price}>$13212.54</span>
                      </div>
                      <div className={styles.view_cart}>
                        <a href="#">View cart</a>
                      </div>
                      <div className={styles.checkout}>
                        <a href="#">Checkout</a>
                      </div>
                    </div>
                  </div>
                </Drawer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
