import React, { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import hamburger from '../../assets/images/categories/hamburger.png';
import drink from '../../assets/images/categories/drink.png';
import spaghetti from '../../assets/images/categories/spaghetti.png';
import salad from '../../assets/images/categories/salad.png';
import pizza from '../../assets/images/categories/pizza.png';
import SectionTitle from '../common/SectionTitle';

const Categories = () => {

    const swiperRef = useRef(null)

    return (
        <section
            className="categories bg-background"
            onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
            onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}>
            <div className="2xl:container 2xl:mx-auto py-5 md:py-10 lg:py-16 px-4 md:px-14 lg:px-20">
                <div className="md:-mt-[40px] lg:-mt-[70px] mb-0 lg:mb-7">
                    <SectionTitle title="Categories" className="text-[18px] md:text-[18px] xl:!text-[24px]" />
                </div>
                <Swiper
                    ref={swiperRef}
                    spaceBetween={20}
                    loop={true}
                    slidesPerView={5}
                    modules={[Autoplay]}
                    speed={2000}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}

                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                        },
                        480: {
                            slidesPerView: 2,
                        },
                        780: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                        1280: {
                            slidesPerView: 5,
                        },
                    }}

                >
                    <SwiperSlide>
                        <div className="text-center p-2">
                            <img
                                className="w-12 h-12 mx-auto"
                                src={hamburger}
                                alt="burger" />
                            <p className="text-lg font-medium mt-5">Hamburger</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="text-center p-2">
                            <img
                                className="w-12 h-12 mx-auto"
                                src={pizza}
                                alt="burger" />
                            <p className="text-lg font-medium mt-5">Pizza</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="text-center p-2">
                            <img
                                className="w-12 h-12 mx-auto"
                                src={spaghetti}
                                alt="burger" />
                            <p className="text-lg font-medium mt-5">Spaghetti</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="text-center p-2">
                            <img
                                className="w-12 h-12 mx-auto"
                                src={salad}
                                alt="burger" />
                            <p className="text-lg font-medium mt-5">Salad</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="text-center p-2">
                            <img
                                className="w-12 h-12 mx-auto"
                                src={drink}
                                alt="burger" />
                            <p className="text-lg font-medium mt-5">Drink</p>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </section>
    )
}

export default Categories