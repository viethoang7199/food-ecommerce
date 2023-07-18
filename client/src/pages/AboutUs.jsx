import React, { useEffect } from 'react';
import BreadCrumb from '../components/UI/BreadCrumb';

import about_img_01 from '../assets/images/about/inpage/about_1_1.png';
import about_img_02 from '../assets/images/about/inpage/about_1_2.png';
import about_img_03 from '../assets/images/about/inpage/about_2_1.png';
import about_img_shape_01 from '../assets/images/about/inpage/shape/bg_shape_1.png';
import about_img_shape_02 from '../assets/images/about/inpage/shape/bg_shape_2.png'
import about_icon_01 from '../assets/images/about/icons/offer.png';
import about_icon_02 from '../assets/images/about/icons/healthy.png';
import about_icon_03 from '../assets/images/about/icons/service.png';
import about_img_strength_01 from '../assets/images/about/icons/strength/burger.png'
import about_img_strength_02 from '../assets/images/about/icons/strength/healthy.png'
import about_img_strength_03 from '../assets/images/about/icons/strength/hygienic.png'

import Button from '../components/common/Button';
import SectionSubtitle from '../components/common/SectionSubTitle';
import SectionTitle from '../components/common/SectionTitle';

import Helmet from '../components/Helmet';
import Testimonials from '../components/UI/Testimonials'
import { icons } from '../utils/icons';

const AboutUs = () => {
    const { RiCheckboxCircleFill } = icons
    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return <Helmet title='About Us'>
        <div className='about'>
            <BreadCrumb title={<><span>About</span> <span className='text-orange'>Us</span></>} />
            <div className='px-4 2xl:container 2xl:mx-auto md:px-14 lg:px-20'>
                <div className="md:flex py-20 lg:border-l-2 lg:border-b-2 lg:rounded-bl-[50px] lg:border-dashed lg:border-black">
                    <div className='flex flex-col items-center pl-6 lg:flex-row lg:border-r lg:border-dashed lg:border-gray-400'>
                        <div className='bg-gray-100 w-20 h-20 min-w-[80px] leading-[80px] rounded-full  flex justify-center items-center'>
                            <img src={about_icon_01} alt="" className='w-10 h-10 min-w-[40px] leading-[40px]' />
                        </div>
                        <div className='px-5 py-4 text-center md:px-0 lg:px-5 xl:px-10 lg:py-0 lg:text-left'>
                            <h5 className='text-xl font-semibold'>Discount voucher</h5>
                            <p className='text-base text-gray-600'>Competently orchestrate integrated schema for quickly create.</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center pl-6 mt-10 lg:flex-row md:mt-0 lg:border-r lg:border-dashed lg:border-gray-400'>
                        <div className='bg-gray-100 w-20 h-20 min-w-[80px] leading-[80px] rounded-full  flex justify-center items-center'>
                            <img src={about_icon_02} alt="" className='w-10 h-10 min-w-[40px] leading-[40px]' />
                        </div>
                        <div className='px-5 py-4 text-center md:px-0 lg:px-5 xl:px-10 lg:py-0 lg:text-left'>
                            <h5 className='text-xl font-semibold'>Fresh healthy foods</h5>
                            <p className='text-base text-gray-600'>Quantimanes orchestrate integrated schema for quickly Taken.</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center pl-6 mt-10 lg:flex-row md:mt-0'>
                        <div className='bg-gray-100 w-20 h-20 min-w-[80px] leading-[80px] rounded-full  flex justify-center items-center'>
                            <img src={about_icon_03} alt="" className='w-10 h-10 min-w-[40px] leading-[40px]' />
                        </div>
                        <div className='px-5 py-4 text-center md:px-0 lg:px-5 xl:px-10 lg:py-0 lg:text-left'>
                            <h5 className='text-xl font-semibold'>Fast serve on table</h5>
                            <p className='text-base text-gray-600'>Mansikatils orchestrate integrated schema for quickly Harbest.</p>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-center gap-5 px-4 lg:flex-row md:px-12 lg:px-0 lg:py-20 lg:border-r-2 lg:border-dashed lg:border-black'>
                    <div className='relative lg:w-3/6'>
                        <img
                            className='mx-auto'
                            src={about_img_01}
                            alt=""
                        />
                        <img
                            className='absolute hidden top-2/4 -translate-y-2/4 -left-56 -z-10 md:block'
                            src={about_img_shape_01}
                            alt=""
                        />
                    </div>

                    <div className='lg:w-2/4 xl:pr-20 mt-9 lg:mt-0'>
                        <div className='mb-5'>
                            <p className='mb-2 text-xl font-semibold font-lobster text-pink'>About Us</p>
                            <h4 className='text-[28px] md:text-[32px] lg:text-[40px] text-dark-blue leading-tight font-extrabold mb-7'>Real Delicious Food Straight To <span className='font-semibold font-lobster text-pink'>Your Table</span></h4>
                            <p className='text-gray-600'>Assertively envisioneer high-payoff architectures after interactive service. Collaboratively whiteboard pandemic intellectual capital without cross-platform channels.</p>
                        </div>

                        <div className='flex flex-wrap gap-5 mb-5 md:flex-nowrap'>
                            <img className='rounded-2xl ' src={about_img_02} alt="" />

                            <ul>
                                <li className='flex items-center gap-2 mb-2'>
                                    <span>
                                        <span className="text-pink"><RiCheckboxCircleFill /></span>
                                    </span>
                                    <span className='font-medium'>Delicious & Healthy Foods</span>
                                </li>
                                <li className='flex items-center gap-2 mb-2'>
                                    <span>
                                        <span className="text-pink"><RiCheckboxCircleFill /></span>

                                    </span>
                                    <span className='font-medium'>Spacific Family & Kids Zone</span>
                                </li>
                                <li className='flex items-center gap-2 mb-2'>
                                    <span>
                                        <span className="text-pink"><RiCheckboxCircleFill /></span>

                                    </span>
                                    <span className='font-medium'>Best Price & Offers</span>
                                </li>
                                <li className='flex items-center gap-2 mb-2'>
                                    <span>
                                        <span className="text-pink"><RiCheckboxCircleFill /></span>

                                    </span>
                                    <span className='font-medium'>Made By Fresh Ingredients</span>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <span>
                                        <span className="text-pink"><RiCheckboxCircleFill /></span>

                                    </span>
                                    <span className='font-medium'>Music & Other Facilities</span>
                                </li>
                            </ul>
                        </div>

                        <hr />

                        <div className='mt-5'>
                            <Button title='Discover' className='px-20 text-xl rounded-full' />
                        </div>
                    </div>
                </div>

                <div className='py-20 flex flex-col-reverse lg:flex-row items-center px-4 md:px-12 lg:px-0 lg:border-l-2 lg:border-t-2 lg:rounded-tl-[50px] lg:border-dashed lg:border-black'>
                    <div className='w-full lg:w-2/4 lg:pl-24 xl:pl-40 lg:pr-20'>
                        <div className='mt-16 lg:mt-0 lg:mb-5'>
                            <p className='mb-2 text-xl font-semibold font-lobster text-pink'>Our Story</p>
                            <h4 className='text-[28px] lg:text-[40px] text-dark-blue leading-tight font-extrabold mb-7'>The Pizzer Has Excellent Of <span className='font-semibold font-lobster text-pink'>Quality Foods</span></h4>
                            <p className='mb-5 text-gray-600'>Compellingly supply professional material rather than out-of-the-box process improvements. Phosfluorescently communicate premium mindshare and extensive imperatives. Dynamically fashion.</p>
                            <p className='mb-5 text-gray-600'>Seamlessly conceptualize sticky functionalities after prospective data. Interactively unleash customized supply chains whereas goal oriented paradigm. Credibly reintermediate client-focused model for.</p>
                        </div>
                        <hr />
                        <div className='flex items-center gap-10 mt-5'>
                            <Button title='Discover' className='px-16 text-xl rounded-full' />
                            <div className='flex items-center gap-2'>
                                <p className='text-5xl font-black text-pink'>20</p>
                                <p className='flex flex-col'>
                                    <span className='text-base font-medium text-gray-600 uppercase'>Years of</span>
                                    <span className='text-xl font-bold uppercase text-dark-blue'>Experience</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='relative grow'>
                        <img src={about_img_03} alt="" />
                        <img
                            className='absolute -top-10 left-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] object-cover -z-10 '
                            src={about_img_shape_02}
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <section className='pt-20 pb-32 bg-black our-strength'>
                <div className="px-4 xl:container xl:mx-auto md:px-12 lg:px-8">
                    <SectionSubtitle title='Our Strength' />
                    <SectionTitle title={<span className="text-white">Our Most Loved <span className='font-semibold font-lobster text-pink'>Foods</span></span>} className='text-white' />
                    <p className='relative text-center !text-white m-auto w-[300px] sm:w-[600px]'>
                        Objectively pontificate quality models before intuitive information. Dramatically recaptiualize multifunctional materials.
                    </p>

                    <div className="mx-auto xl:w-3/4">
                        <div className='flex flex-col items-center mt-10 md:flex-row'>
                            <div className='text-center md:pr-10 md:border-r md:border-dashed md:border-white'>
                                <img className='w-[120px] h-full object-cover mx-auto mb-5' src={about_img_strength_01} alt="" />
                                <h3 className='mb-2 text-2xl font-bold text-white capitalize'>Fast foods</h3>
                                <p className='text-white'>Professionally fabricate e-business vortals and impactful core competencie. Compellingly impact technically sound</p>
                            </div>
                            <div className='mt-10 text-center md:px-10 md:mt-0 md:border-r md:border-dashed md:border-white'>
                                <img className='w-[120px] h-[120px] object-cover mx-auto mb-5' src={about_img_strength_02} alt="" />
                                <h3 className='mb-2 text-2xl font-bold text-white capitalize'>Healthy foods</h3>
                                <p className='text-white'>Professionally fabricate e-business vortals and impactful core competencie. Compellingly impact technically sound</p>
                            </div>
                            <div className='mt-10 text-center md:pl-10 md:mt-0'>
                                <img className='w-[120px] h-[120px] object-cover mx-auto mb-5' src={about_img_strength_03} alt="" />
                                <h3 className='mb-2 text-2xl font-bold text-white capitalize'>Hygienic foods</h3>
                                <p className='text-white'>Professionally fabricate e-business vortals and impactful core competencie. Compellingly impact technically sound</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Testimonials />
        </div>
    </Helmet>
}

export default AboutUs