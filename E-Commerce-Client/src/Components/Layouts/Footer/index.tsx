import React, { useState } from 'react'
import { Drawer } from "@mui/material";
import styles from "./footer.module.css"
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot, FaRegUser, FaRegHeart } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import Pay from "../../../../public/images/Footer_pay.png"
import { Link } from "react-router-dom";

const Footer = () => {

  const [openSearch, setopenSearch] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);

  const toggleDrawerSearch = (isOpenSearch: boolean) => () => {
    setopenSearch(isOpenSearch);
  };

  const handleSearchButtonClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShowSearchResult(!showSearchResult);
  };

  return (
    <>
      <footer>
        <div className={styles.footer}>
          <div className="container mx-auto 2xl:px-28 lg:px-5 md:px-3 sm:px-3 mb-10 xl:mb-0">
            <div className={styles.top_header}>
              <div className={`block md:grid grid-cols-12 py-5  ${styles.main_top_header}`}>
                <div className={`col-span-12 lg:col-span-3 md:col-span-6 sm:col-span-6 text-center lg:text-left pb-5 lg:pb-0 ${styles.contact}`}>
                  <div className={`title text-lg font-semibold uppercase pb-0 lg:pb-5`}>
                    <h3>Contact info</h3>
                  </div>
                  <div className={styles.content}>
                    <ul>
                      <li className='flex justify-center lg:justify-start'><span className=' text-lg pt-1 pe-2'><FaPhone /></span> +84 2500 888 33</li>
                      <li className='flex justify-center lg:justify-start'><span className=' text-lg pt-1 pe-2'><MdEmail /></span><a href="#"> support@example.com</a></li>
                      <li className='flex justify-center lg:justify-start'><span className='text-lg pt-3 pe-2'><FaLocationDot /></span> 48 West Temple Drive
                        <br />
                        Ashburn, VA 20147</li>
                      <li className={styles.icon}>
                        <div className='flex justify-center lg:justify-start'>
                          <span className='me-2'>
                            <a href="#"><FaFacebookF />
                            </a>
                          </span>
                          <span className='mx-2'><a href="#"><FaTwitter /></a></span>
                          <span className='mx-2'><a href="#"><FaInstagram /></a></span>
                          <span className='mx-2'><a href="#"><FaPinterest /></a></span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="company col-span-12 lg:col-span-3 md:col-span-6 sm:col-span-6 text-center lg:text-left pb-5 lg:pb-0">
                  <div className={`title text-lg font-semibold uppercase pb-0 lg:pb-5 `}>
                    <h3>Conpany</h3>
                  </div>
                  <div className={styles.content}>
                    <ul>
                      <li><a href="#">About Us</a></li>
                      <li><a href="#">Careers</a></li>
                      <li><a href="#">Affiliates</a></li>
                      <li><a href="#">Blog</a></li>
                      <li><a href="#">Contact Us</a></li>
                    </ul>
                  </div>
                </div>
                <div className="shop col-span-12 lg:col-span-3 md:col-span-6 sm:col-span-6 text-center lg:text-left pb-0 ">
                  <div className={`title text-lg font-semibold uppercase pb-0 lg:pb-5`}>
                    <h3>Shop</h3>
                  </div>
                  <div className={styles.content}>
                    <ul>
                      <li><a href="#">Mobiles</a></li>
                      <li><a href="#">Tablets</a></li>
                      <li><a href="#">Laptops</a></li>
                      <li><a href="#">Televisions</a></li>
                      <li><a href="#">Computer & Gamming</a></li>
                      <li><a href="#">Accessories</a></li>
                    </ul>
                  </div>
                </div>
                <div className="help col-span-12 lg:col-span-3 md:col-span-6 sm:col-span-6 text-center lg:text-left pb-0 ">
                  <div className={`title text-lg font-semibold uppercase pb-0 lg:pb-5`}>
                    <h3>Help</h3>
                  </div>
                  <div className={styles.content}>
                    <ul>
                      <li><a href="#">Customer Service</a></li>
                      <li><a href="#">My Account</a></li>
                      <li><a href="#">Find a Store</a></li>
                      <li><a href="#">Legal & Privacy</a></li>
                      <li><a href="#">Contact</a></li>
                      <li><a href="#">Gift Card</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bottom_footer}>
              <div className={`block md:grid grid-cols-12 py-5 ${styles.main_bottom_header}`}>
                <div className="copyright col-span-12 xl:col-span-6 lg:col-span-6 md:col-span-6">
                  <p className='text-sm text-center md:text-left'>Copyright © 2023
                    <a style={{ color: 'var(--main-color)' }} href="#"> Technocy</a>
                    . All rights reserved
                  </p>
                </div>
                <div className="policy col-span-12 xl:col-span-3 lg:col-span-6 md:col-span-6 pt-3 md:pt-0">
                  <div className={styles.main_policy}>
                    <ul className='flex justify-center md:justify-end text-sm'>
                      <li className='px-1'>
                        <a href="#">Privacy Policy</a>
                        <span className='ps-3 text-base text-zinc-100'>|</span>
                      </li>
                      <li className='px-1'>
                        <a href="#">Terms & Conditions</a>
                        <span className='ps-3 text-base text-zinc-100'>|</span>
                      </li>
                      <li className='px-1 pt-0.5'><a href="#">Cookie</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bottom_footer col-span-12 xl:col-span-3 lg:col-span-12 md:col-span-12">
                  <div className="pay flex justify-center xl:justify-end py-5 xl:py-0">
                    <img src={Pay} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className={` block xl:hidden ${styles.footer_fix}`}>
        <div className={` ${styles.navigation}`}>
          <div className={` flex ${styles.main_navigation}`}>
            <Link to="/" className=" item w-1/4 flex flex-col justify-center items-center py-2">
              <span ><IoHomeOutline /></span>
              <p className='font-bold text-xs md:text-base'>Home</p>
            </Link>
            <Link to="/Login" className="item w-1/4  flex flex-col justify-center items-center py-2">
              <span><FaRegUser /></span>
              <p className='font-bold text-xs md:text-base'>My Account</p>
            </Link>
            <a onClick={toggleDrawerSearch(true)} className="item w-1/4 flex flex-col justify-center items-center py-2">
              <span><FaSearch /></span>
              <p className='font-bold text-xs md:text-base'>Search</p>
            </a>
            <Drawer
              anchor="top"
              open={openSearch}
              onClose={toggleDrawerSearch(false)}
              className={styles.show_Search}
            >
              <div className={` relative py-5  ${styles.search}`}>
                <form
                  onClick={handleSearchButtonClick}
                  className="form text-center"
                  action=""
                  method="get"
                >
                  <input type="search" placeholder="Search products..." />
                  <button type="submit">
                    <FaSearch />
                  </button>
                </form>
              </div>
            </Drawer>
            <Link to="/WishList" className="item w-1/4 flex flex-col justify-center items-center py-2">
              <span><FaRegHeart /></span>
              <p className='font-bold text-xs md:text-base'>Wishlist</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer