import { getAuth, signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Avatar from '../assets/images/user-icon.png';
import useAuth from '../customHook/useAuth';
import { authSlice } from '../store/slices/authSlice';
import { cartSlice } from '../store/slices/cartSlice';
import Overlay from "./common/Overlay";
// import Loading from './Loading/Loading';
import CartPopup from "./UI/CartPopup";
import { navMenus } from '../utils/path'
import { icons } from '../utils/icons';

const Header = () => {
    const { HiOutlineShoppingBag, AiOutlineLogin, AiOutlineUserAdd, HiOutlineMenuAlt1, AiOutlineClose, AiOutlineSearch, AiOutlineUser, AiOutlineDown, RiUserSettingsLine, AiOutlineLogout, HiOutlineUserCircle } = icons;
    const cartList = useSelector(state => state.cartList.cartItems);
    const [openMenuMobile, setOpenMenuMobile] = useState(false);
    const [openSearchPopup, setOpenSearchPopup] = useState(false);
    const [openCartPopup, setOpenCartPopup] = useState(false);
    const [userMobileNav, setUserMobileNav] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { currentUser } = useAuth();
    const auth = getAuth();
    const overlay = () => {
        setOpenMenuMobile(false)
        setOpenCartPopup(false)
        setOpenSearchPopup(false)
    }
    const handleLogOut = () => {
        setIsLoading(true)
        setTimeout(() => {
            signOut(auth).then(() => {
                setIsLoading(false)
                toast.success('Logout successfully!')
                dispatch(
                    authSlice.actions.LOGOUT()
                )
                dispatch(
                    cartSlice.actions.DELETE_ALL_ITEM()
                )
            }).catch((error) => {
                toast.error(error.message)
                setIsLoading(false)
            });
        }, 1500);
    }
    openMenuMobile || openSearchPopup || openCartPopup ? document.body.style.overflow = "hidden" : document.body.style.overflow = 'auto';
    return (
        <section className='fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl header'>
            {/* <Loading /> */}
            {isLoading &&
                <div>hihi</div>
            }
            <Overlay
                className={`${openMenuMobile || openCartPopup || openSearchPopup ? 'block' : 'hidden'}`}
                onClick={overlay}
            />

            {/* <SearchPopup
                className={`${openSearchPopup ? '!translate-y-0 transition-all duration-500 ease-in-out !opacity-100' : ''}`}
                onHandleCloseSearchPopup={() => setOpenSearchPopup(false)}
            /> */}

            <CartPopup className={`${openCartPopup ? '!translate-x-0 transition-all duration-500 ease-in-out' : ''}`}
                onHandleClose={() => setOpenCartPopup(false)}
                onHandleViewCart={() => setOpenCartPopup(false)}
                onHandleCheckout={() => setOpenCartPopup(false)}
                onHandleReturnShop={() => setOpenCartPopup(false)}
            />

            <div className="px-4 py-3 2xl:container 2xl:mx-auto md:px-14 lg:px-20">
                <div className='flex items-center justify-between'>
                    <div className='w-8 h-8 p-1 mx-2 text-2xl text-white cursor-pointer sm:p-2 sm:h-10 sm:w-10 lg:hidden bg-pink rounded-xl'
                        onClick={() => setOpenMenuMobile(true)}
                    >
                        <HiOutlineMenuAlt1 />
                    </div>
                    <div className='text-center lg:text-left grow'>
                        <Link to='/' className="text-4xl font-semibold font-lobster text-pink">
                            FoodStore
                        </Link>
                    </div>
                    <div className={`lg:bg-transparent bg-white flex lg:justify-center justify-start lg:items-center items-center flex-col lg:flex-row lg:static absolute top-0 left-0 z-50 w-full lg:w-auto md:w-[450px] h-screen lg:h-auto pt-20 lg:pt-0 md:pt-24 px-7 lg:px-0 pb-7 lg:pb-0 -translate-x-full lg:translate-x-0 transition-all duration-500 ease-in-out overflow-auto grow ${openMenuMobile
                        ? '!translate-x-0 transition-all duration-500 ease-in-out'
                        : ''}`}>
                        <div className="absolute top-0 left-0 z-30 flex items-center justify-center w-full h-12 text-xl text-white cursor-pointer lg:hidden bg-pink md:h-16"
                            onClick={() => setOpenMenuMobile(false)}
                        >
                            <span>Close</span>
                            <span><AiOutlineClose /></span>
                        </div>
                        <div className="w-full item__search lg:hidden"
                            onClick={() => setOpenMenuMobile(false)}
                        >
                            <h3 className="mb-3 text-sm font-semibold text-center text-black uppercase md:text-lg">
                                What are you looking for?
                            </h3>
                            <Link to="" className='flex items-center justify-between w-full h-10 px-4 mb-5 bg-white border border-gray-400 rounded-2xl'
                                onClick={() => setOpenSearchPopup(true)}
                            >
                                <span>Search</span>
                                <span><AiOutlineSearch size={20} /></span>
                            </Link>
                        </div>
                        <ul className="flex flex-col items-center justify-center w-full lg:space-x-10 lg:flex-row ">
                            {
                                navMenus.map((item, index) => (
                                    <li key={index} className="w-full mb-5 text-black capitalize border-b border-gray-400 border-dashed lg:w-auto lg:mb-0 lg:border-none hover:text-orange"
                                        onClick={() => setOpenMenuMobile(false)}
                                    >
                                        <NavLink
                                            to={item.path}
                                            className={(navClass) => navClass.isActive ? "text-pink font-medium" : "text-base text-black hover:text-pink font-medium block"}
                                        >{item.display}</NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className='w-full pt-6 pb-1 mb-5 text-base font-bold text-black border-b border-gray-400 border-dashed account lg:hidden'
                            onClick={() => setUserMobileNav(!userMobileNav)}
                        >
                            {
                                currentUser
                                    ?
                                    <div className='relative'>
                                        <div className='flex items-center justify-between cursor-pointer'>
                                            <div className="flex items-center gap-2">
                                                <img
                                                    className='object-contain w-10 h-10 rounded-full cursor-pointer'
                                                    src={currentUser && currentUser.photoURL ? currentUser.photoURL : Avatar}
                                                    alt="avt"
                                                />
                                                <p>
                                                    Welcome, {currentUser.displayName}
                                                </p>
                                            </div>
                                            <div>
                                                <AiOutlineDown />
                                            </div>
                                        </div>

                                        <div className={`absolute left-0 top-14 bg-white rounded py-3 w-full border border-gray-400 ${userMobileNav ? 'block' : 'hidden'}`}
                                            onClick={() => setOpenMenuMobile(false)}
                                        >
                                            <Link to='/update-profile' className='flex items-center gap-3 px-4 py-2 mx-2 text-black rounded-xl'>
                                                <span><RiUserSettingsLine size={20} /></span>
                                                <span>Edit profile</span>
                                            </Link>

                                            <Link to='/cart' className='flex items-center gap-3 px-4 py-2 mx-2 text-black rounded-xl'>
                                                <span className='relative after:content-[attr(quantity)] after:bg-pink after:w-4 after:h-4 after:absolute after:-top-2 after:-right-2 after:rounded-full after:text-white after:text-xs after:flex after:justify-center after:items-center' quantity={cartList.length}>
                                                    <HiOutlineShoppingBag size={20} />
                                                </span>
                                                <span>View cart</span>
                                            </Link>

                                            <p className="flex items-center px-4 !text-black py-2 m-2 rounded-xl bg-slate-300 shadow-md cursor-pointer gap-3" onClick={handleLogOut}>
                                                <span>
                                                    <AiOutlineLogout size={20} />
                                                </span>
                                                <span className='text-lg font-medium'>Logout</span>
                                            </p>
                                        </div>
                                    </div>
                                    :
                                    <Link
                                        to='/sign-in'
                                        className='flex items-center justify-start text-black'
                                        onClick={() => setOpenMenuMobile(false)}
                                    >
                                        <AiOutlineUser size={20} />
                                        <span className='ml-2'>Login / Register</span>
                                    </Link>
                            }
                        </div>
                    </div>

                    <ul className='flex items-center justify-end gap-5 grow-0 lg:grow'>
                        {/* <li className='mr-1.5 hidden xl:block'>
                        <div
                            className='border-none p-0 w-10 h-10 flex justify-center cursor-pointer items-center rounded-full bg-cream hover:!bg-pink hover:!text-white active:!text-white active:!border-pink'
                            onClick={() => setOpenSearchPopup(true)}
                        >
                            <AiOutlineSearch className='text-2xl' />
                        </div>
                    </li> */}

                        <li className='mx-1.5 relative after:content-[attr(quantity)] after:bg-pink after:w-6 after:h-6 after:absolute after:-top-1 after:-right-1 after:rounded-full after:text-white after:flex after:justify-center after:items-center'
                            quantity={cartList.length}
                        >
                            <div
                                className='border-none p-0 w-10 h-10 flex justify-center cursor-pointer items-center rounded-full bg-cream hover:!bg-pink hover:!text-white'
                                onClick={() => setOpenCartPopup(true)}
                            >
                                <HiOutlineShoppingBag size={24} />
                            </div>
                        </li>

                        <li className='hidden lg:block group'>
                            <div className="relative flex items-center gap-2 cursor-pointer">
                                <motion.img
                                    whileTap={{ scale: 0.6 }}
                                    className='w-10 h-10 rounded-full '
                                    src={currentUser && currentUser.photoURL ? currentUser.photoURL : Avatar}
                                    alt="avt"
                                />
                                <p>
                                    {currentUser?.displayName}
                                </p>
                                <div className="min-w-max w-[200px] absolute rounded-xl bg-white drop-shadow-2xl shadow-xl -right-6 top-12 hidden group-hover:block cursor-pointer before:w-full before:h-5 before:absolute before:bg-transparent before:-top-5 before:right-0">
                                    {currentUser ?
                                        <>
                                            {currentUser.email === 'admin@gmail.com' ?
                                                <Link
                                                    to='/admin'
                                                    className='flex items-center px-4 py-2 transition-colors duration-300 hover:bg-pink hover:text-white ease'>
                                                    {/* <span className='mr-3'><GoGraph /></span> */}
                                                    <span>Dashboard</span>
                                                </Link>
                                                : ''
                                            }
                                            <Link to='/account' className='flex items-center gap-3 px-4 py-2 transition-colors duration-300 hover:bg-pink hover:text-white ease'>
                                                <span><HiOutlineUserCircle size={20} /></span>
                                                <span>My account</span>
                                            </Link>
                                            <Link to='/my-order' className='flex items-center gap-3 px-4 py-2 transition-colors duration-300 hover:bg-pink hover:text-white ease'>
                                                <span><HiOutlineShoppingBag size={20} /></span>
                                                <span>My order</span>
                                            </Link>
                                            <Link to='/edit-profile' className='flex items-center gap-3 px-4 py-2 transition-colors duration-300 hover:bg-pink hover:text-white ease'>
                                                <span><RiUserSettingsLine size={20} /></span>
                                                <span>Edit profile</span>
                                            </Link>
                                            <Link to='/cart' className='flex items-center px-4 py-2 transition-colors duration-300 hover:bg-pink hover:text-white ease'>
                                                <span className='mr-3 relative after:content-[attr(quantity)] after:bg-pink after:w-4 after:h-4 after:absolute after:-top-2 after:-right-2 after:rounded-full after:text-white after:text-xs after:flex after:justify-center after:items-center' quantity={cartList.length}>
                                                    <HiOutlineShoppingBag size={20} />
                                                </span>
                                                <span>My cart</span>
                                            </Link>
                                            <hr />
                                            <p className="flex items-center gap-3 px-4 py-2 transition-colors duration-300 hover:bg-pink hover:text-white ease" onClick={handleLogOut}>
                                                <span>
                                                    <AiOutlineLogout size={20} />
                                                </span>
                                                <span>Logout</span>
                                            </p>
                                        </>
                                        :
                                        <>
                                            <Link
                                                to='/sign-in'
                                                className='flex items-center gap-3 px-4 py-2 font-medium rounded-lg cursor-pointer hover:bg-pink hover:text-white'
                                            >
                                                <AiOutlineLogin size={20} />
                                                <span className='grow'>Sign In</span>
                                            </Link>
                                            <Link
                                                to='/sign-up'
                                                className='flex items-center gap-3 px-4 py-2 font-medium rounded-lg cursor-pointer hover:bg-pink hover:text-white'
                                            >
                                                <span>
                                                    <AiOutlineUserAdd size={20} />
                                                </span>
                                                <span className='grow'>Sign Up</span>
                                            </Link>
                                        </>}

                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Header;