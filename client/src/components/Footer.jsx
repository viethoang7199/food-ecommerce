import React from 'react';
import { Link } from 'react-router-dom';

import footer_img from '../assets/images/background/bg_1.png';
import { subCategories } from '../pages/Products';
import Button from './common/Button';
import { icons } from '../utils/icons';

const Footer = () => {
    const { HiArrowRight, RiMapPin2Fill, RiFacebookFill, RiTwitterFill, RiInstagramFill, RiPhoneFill, RiMailFill } = icons
    return (
        <>
            <footer
                className='footer bg-[#010101] bg-cover'
                style={{ backgroundImage: `url(${footer_img})`, }}
            >
                <div className='px-4 py-10 2xl:container 2xl:mx-auto lg:py-20 md:px-8 lg:px-20'>
                    <div className='flex flex-col items-center justify-between pb-20 lg:flex-row'>
                        <h3 className="text-pink text-center font-bold text-5xl font-lobster lg:w-2/5 pb-[30px] lg:pb-0">FoodStore</h3>
                        <div className='flex flex-col items-center justify-between w-full gap-5 lg:flex-row grow'>
                            <div className='text-center border-gray-500 grow lg:pl-10 lg:border-l lg:text-left'>
                                <h3 className='text-white font-bold text-[28px] lg:text-[40px] mb-2'>Subscription News</h3>
                                <p className="text-gray-300">Get updates for new products</p>
                            </div>
                            <form action="" className='flex flex-col items-center w-full max-w-[550px] gap-5 lg:flex-row'>
                                <input type="text" className='w-full px-6 py-4 rounded-full outline-none' placeholder='Enter Email Address' />
                                <Button
                                    className="py-3"
                                    title={
                                        <span className="flex items-center gap-2">
                                            <span>Subcribe</span>
                                        </span>
                                    }
                                />
                            </form>
                        </div>
                    </div>
                    <hr className='border-gray-500' />
                    <div className='flex flex-col flex-wrap justify-between pt-20 md:flex-row'>
                        <div className="px-2 mb-10 md:w-2/4 lg:w-1/4 lg:mb-0">
                            <h3 className="text-white pb-3 text-xl uppercase font-bold relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-[100px] after:h-[3px] after:bg-gradient-to-r after:from-pink after:to-transparent">About store</h3>
                            <p className='text-gray-300 my-7'>Quickly supply alternative strategic theme areas vis-a-vis B2C mindshare. Objectively repurpose stand-alone synergy via user-centric architectures.</p>
                            <div className='mb-5'>
                                <p className='text-gray-300'>
                                    Monday - Friday: &nbsp;
                                    <span className='font-medium text-white'>8:10 AM - 6:10 PM</span>
                                </p>
                                <p className='text-gray-300'>
                                    Saturday - Sunday: &nbsp;
                                    <span className='font-medium text-white'>10:10 AM - 6:10 PM</span>
                                </p>
                            </div>
                            <ul className='flex items-center gap-5'>
                                <li className='flex items-center justify-center w-10 h-10 text-gray-300 border border-gray-500 rounded-full cursor-pointer hover:bg-pink hover:text-white hover:border-none'>
                                    <RiFacebookFill />
                                </li>
                                <li className='flex items-center justify-center w-10 h-10 text-gray-300 border border-gray-500 rounded-full cursor-pointer hover:bg-pink hover:text-white hover:border-none'>
                                    <RiTwitterFill />
                                </li>
                                <li className='flex items-center justify-center w-10 h-10 text-gray-300 border border-gray-500 rounded-full cursor-pointer hover:bg-pink hover:text-white hover:border-none'>
                                    <RiInstagramFill />
                                </li>
                            </ul>
                        </div>
                        <div className='px-2 mb-10 md:w-2/4 lg:w-auto lg:mb-0'>
                            <h3 className="text-white pb-3 text-xl uppercase font-bold relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-[100px] after:h-[3px] after:bg-gradient-to-r after:from-pink after:to-transparent">Quick Links</h3>
                            <ul className='mt-7'>
                                <li className='mb-3 text-gray-300 group'>
                                    <Link to="products" className='flex items-center'>
                                        <span className='transition-all duration-500 ease-in-out group-hover:text-pink group-hover:translate-x-3 group-hover:transition-all group-hover:duration-500 group-hover:ease-in-out'>
                                            <HiArrowRight />
                                        </span>
                                        <span className='ml-3'>Products</span>
                                    </Link>
                                </li>
                                <li className='mb-3 text-gray-300 group'>
                                    <Link to="cart" className='flex items-center'>
                                        <span className='transition-all duration-500 ease-in-out group-hover:text-pink group-hover:translate-x-3 group-hover:transition-all group-hover:duration-500 group-hover:ease-in-out'>
                                            <HiArrowRight />
                                        </span>
                                        <span className='ml-3'>Cart</span>
                                    </Link>
                                </li>
                                <li className='mb-3 text-gray-300 group'>
                                    <Link to="blog" className='flex items-center'>
                                        <span className='transition-all duration-500 ease-in-out group-hover:text-pink group-hover:translate-x-3 group-hover:transition-all group-hover:duration-500 group-hover:ease-in-out'>
                                            <HiArrowRight />
                                        </span>
                                        <span className='ml-3'>Blog</span>
                                    </Link>
                                </li>
                                <li className='mb-3 text-gray-300 group'>
                                    <Link to="about" className='flex items-center'>
                                        <span className='transition-all duration-500 ease-in-out group-hover:text-pink group-hover:translate-x-3 group-hover:transition-all group-hover:duration-500 group-hover:ease-in-out'>
                                            <HiArrowRight />
                                        </span>
                                        <span className='ml-3'>About Us</span>
                                    </Link>
                                </li>
                                <li className='mb-3 text-gray-300 group'>
                                    <Link to="contact" className='flex items-center'>
                                        <span className='transition-all duration-500 ease-in-out group-hover:text-pink group-hover:translate-x-3 group-hover:transition-all group-hover:duration-500 group-hover:ease-in-out'>
                                            <HiArrowRight />
                                        </span>
                                        <span className='ml-3'>Contact Us</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='px-2 mb-10 md:w-2/4 lg:w-auto lg:mb-0'>
                            <h3 className="text-white pb-3 text-xl uppercase font-bold relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-[100px] after:h-[3px] after:bg-gradient-to-r after:from-pink after:to-transparent">Categories</h3>
                            <ul className='text-white mt-7'>

                                {subCategories.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`mb-3 text-gray-300 group cursor-pointer`}
                                        onClick={() => {
                                            window.scroll(0, 550)
                                        }}
                                    >
                                        <Link to={`/products/category/${item.type}`} className='flex items-center'>
                                            <span className='transition-all duration-500 ease-in-out group-hover:text-pink group-hover:translate-x-3 group-hover:transition-all group-hover:duration-500 group-hover:ease-in-out'>
                                                <HiArrowRight />
                                            </span>
                                            <span className='ml-3 text-lg font-normal'>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='px-2 mb-10 md:w-2/4 lg:w-1/4 lg:mb-0'>
                            <h3 className="text-white pb-3 text-xl uppercase font-bold relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-[100px] after:h-[3px] after:bg-gradient-to-r after:from-pink after:to-transparent">Contact now</h3>
                            <div className="flex items-center gap-3 mb-5 mt-7">
                                <span className="bg-pink text-white w-[30px] h-[30px] rounded-full inline-flex items-center justify-center">
                                    <RiMapPin2Fill />
                                </span>
                                <span className="text-gray-300">
                                    Hòa An - Cẩm Lệ <br /> Đà Nẵng, Việt Nam
                                </span>
                            </div>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="bg-pink text-white w-[30px] h-[30px] rounded-full inline-flex items-center justify-center">
                                    <RiPhoneFill />
                                </span>
                                <span className="text-gray-300">
                                    0123456789
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="bg-pink text-white w-[30px] h-[30px] rounded-full inline-flex items-center justify-center">
                                    <RiMailFill />
                                </span>
                                <span className="text-gray-300">
                                    support@example.com
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
            <div className="bg-black">
                <div className="px-4 py-6 2xl:container 2xl:mx-auto md:px-14 lg:px-20">
                    <div className="flex items-center justify-between">
                        <p className="text-center text-white grow lg:text-left">Copyright &copy; 2022 Food. All Rights Reserved.</p>
                        <ul className="items-center justify-end hidden gap-2 text-white grow lg:flex">
                            <li>
                                <Link to="" className="hover:text-pink">
                                    <span className="relative after:content-['|'] after:pl-2">Privacy Policy</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="" className="hover:text-pink">
                                    <span>Terms & Condition</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;