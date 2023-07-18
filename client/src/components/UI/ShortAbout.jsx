import React from 'react';
import { Link } from 'react-router-dom';

import about_img_01 from '../../assets/images/about/about-thumbnail-1.png';
import about_img_02 from '../../assets/images/about/about-thumbnail-2.png';
import about_img_03 from '../../assets/images/about/about-thumbnail-3.png';
import about_img_04 from '../../assets/images/about/about-thumbnail-4.png';
import about_img_05 from '../../assets/images/about/about-thumbnail-5.png';
import about_icon_01 from '../../assets/images/about/icons/dish.png';
import about_icon_03 from '../../assets/images/about/icons/price.png';
import about_icon_02 from '../../assets/images/about/icons/water-drop.png';
import discount_bg_1 from '../../assets/images/discount/discount_bg_1.png';
import discount_bg_2 from '../../assets/images/discount/discount_bg_2.png';
import discount_bg_3 from '../../assets/images/discount/discount_bg_3.png';

import Button from '../common/Button';
import SectionSubtitle from '../common/SectionSubTitle';

const ShortAbout = () => {
    return (
        <section className='short-about'>
            <div className="px-4 py-10 2xl:container 2xl:mx-auto lg:py-20 md:px-14 lg:px-20">
                <div className="grid-cols-3 lg:grid">
                    <div className='col-span-2 lg:pr-24'>
                        <div className='grid grid-cols-3 gap-3 md:gap-5'>
                            <div className='flex flex-col col-span-2 gap-3 md:gap-5 grow'>
                                <img className='w-full h-[180px] lg:h-[330px] object-cover rounded-xl' src={about_img_01} alt="about-thumbnail" />
                                <div className='flex justify-between gap-3 md:gap-5'>
                                    <img className='grow w-3/4 h-[128px] lg:h-[230px] object-cover rounded-xl' src={about_img_04} alt="about-thumbnail" />
                                    <img className='w-[35px] md:w-[60px] xl:w-[84px] h-[128px] lg:h-[230px] object-cover rounded-xl' src={about_img_03} alt="about-thumbnail" />
                                </div>
                            </div>
                            <div className='flex flex-col justify-center col-span-1 gap-3 md:gap-5'>
                                <img className='w-full h-[120px] lg:h-[210px] object-cover rounded-xl' src={about_img_05} alt="about-thumbnail" />
                                <img className='w-full h-[120px] lg:h-[210px] object-cover rounded-xl' src={about_img_02} alt="about-thumbnail" />

                                <div className='flex flex-col items-center justify-center gap-1 sm:flex-row md:gap-5'>
                                    <p className='text-3xl font-black md:text-5xl text-pink'>20</p>
                                    <p className='flex flex-col'>
                                        <span className='text-xs font-medium text-gray-600 uppercase md:text-base'>Years of</span>
                                        <span className='uppercase text-dark-blue text-[10px] sm:text-sm md:text-xl font-bold'>Experience</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='pt-10'>
                        <div className='mb-5'>
                            <SectionSubtitle title='About' className="!justify-start" />
                            <h4 className='text-[40px] text-dark-blue leading-tight font-extrabold mb-7'>We Always Provide Quality Fast Foods For You</h4>
                            <p className='text-gray-600'>Seamlessly conceptualize sticky functionalities after prospective data. Interactively unleash customized supply chains whereas goal oriented paradigm.</p>
                        </div>

                        <div className='flex items-center justify-center gap-5 md:gap-24 lg:gap-0 lg:justify-between mb-7'>
                            <div>
                                <img
                                    className='w-10 h-10 mx-auto mb-3 md:w-12 md:h-12'
                                    src={about_icon_01}
                                    alt="" />
                                <p className='font-semibold uppercase'>Delicious</p>
                            </div>
                            <div>
                                <img
                                    className='w-10 h-10 mx-auto mb-3 md:w-12 md:h-12'
                                    src={about_icon_02}
                                    alt="" />
                                <p className='font-semibold uppercase'>Fresh</p>
                            </div>
                            <div>
                                <img
                                    className='w-10 h-10 mx-auto mb-3 md:w-12 md:h-12'
                                    src={about_icon_03}
                                    alt="" />
                                <p className='font-semibold uppercase'>Best price</p>
                            </div>
                        </div>
                        <hr />
                        <Link to='about' className='block mt-5'>
                            <Button title="About more" />
                        </Link>
                    </div>
                </div>

                <div className='grid gap-5 pt-20 md:grid-cols-2 lg:grid-cols-3'>
                    <div
                        className='bg-no-repeat bg-[left_center] bg-cover rounded-xl p-10'
                        style={{ backgroundImage: `url(${discount_bg_1})`, }}
                    >
                        <h3 className='mb-2 text-2xl font-bold text-white uppercase'>Burger</h3>
                        <p className='text-white max-w-[145px] mb-2'>Get a 20% Discount on This Week</p>
                        <Link
                            to=''
                            className='text-white uppercase font-medium text-sm relative before:absolute before:left-0 before:-bottom-[2px] before:w-full before:bg-white before:h-[1px]'
                        >
                            Buy now
                        </Link>
                    </div>
                    <div
                        className='bg-no-repeat bg-[left_center] bg-cover rounded-xl p-10'
                        style={{ backgroundImage: `url(${discount_bg_2})`, }}
                    >
                        <h3 className='mb-2 text-2xl font-bold text-white uppercase'>Spaghetti</h3>
                        <p className='text-white max-w-[145px] mb-2'>Get a 30% Discount on This Week</p>
                        <Link
                            to=''
                            className='text-white uppercase font-medium text-sm relative before:absolute before:left-0 before:-bottom-[2px] before:w-full before:bg-white before:h-[1px]'
                        >
                            Buy now
                        </Link>
                    </div>
                    <div
                        className='bg-no-repeat bg-[left_center] bg-cover rounded-xl p-10'
                        style={{ backgroundImage: `url(${discount_bg_3})`, }}
                    >
                        <h3 className='mb-2 text-2xl font-bold text-white uppercase'>Pizza</h3>
                        <p className='text-white max-w-[145px] mb-2'>Get a 20% Discount on This Week</p>
                        <Link
                            to=''
                            className='text-white uppercase font-medium text-sm relative before:absolute before:left-0 before:-bottom-[2px] before:w-full before:bg-white before:h-[1px]'
                        >
                            Buy now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ShortAbout