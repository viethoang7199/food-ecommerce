import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import hero_bg_01 from '../../assets/images/hero/hero_bg/hero_bg_1.png';
import hero_bg_02 from '../../assets/images/hero/hero_bg/hero_bg_3.png';
import hero_text_01 from '../../assets/images/hero/hero_text/hero_text_1.png';
import hero_text_02 from '../../assets/images/hero/hero_text/hero_text_3.png';
import hero_curve_line_01 from '../../assets/images/hero/hero_curve_line/curve_line_1.png';
import hero_curve_line_02 from '../../assets/images/hero/hero_curve_line/curve_line_2.png';
import hero_btn_01 from '../../assets/images/hero/hero_button/button_1.png';
import hero_btn_02 from '../../assets/images/hero/hero_button/button_2.png';
import hero_shape_01 from '../../assets/images/hero/hero_shape/hero_shape_1.png';
import { icons } from '../../utils/icons';


const Hero = () => {
    const { HiArrowLeft, HiArrowRight } = icons
    const swiperRef = useRef(null)
    return (
        <div
            className='mt-16 hero bg-background group'
            onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
            onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}
        >
            <Swiper
                ref={swiperRef}
                spaceBetween={20}
                effect={"fade"}
                loop={true}

                modules={[EffectFade, Navigation, Autoplay]}
                speed={2500}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
            >
                <SwiperSlide>
                    <img
                        className="w-full"
                        src={hero_bg_01}
                        alt="hero-background" />
                    <img
                        className="w-1/4 h-full object-contain absolute top-0 left-[7%] -translate-x-[7%] animate-wiggle"
                        src={hero_text_01}
                        alt="hero-text" />
                    <img
                        className="w-1/12 absolute top-3/4 -translate-y-3/4 left-[31%] -translate-x-[31%]"
                        src={hero_curve_line_01}
                        alt="hero-line" />
                    <img
                        className="w-[10%] lg:w-[7%] absolute top-[78%] -translate-y-[78%] left-[23%] lg:left-[25%] -translate-x-[23%] lg:-translate-x-[25%] animate-button"
                        src={hero_btn_01}
                        alt="hero-btn" />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="w-full"
                        src={hero_bg_02}
                        alt="hero-background" />
                    <img
                        className="w-1/4 h-full object-contain absolute top-2/4 right-[7%] -translate-x-[7%] -translate-y-2/4"
                        src={hero_text_02}
                        alt="hero-text" />
                    <img
                        className="w-[29%] absolute top-[26%] right-[6%] -translate-x-[6%] -translate-y-[26%] animate-pingHero"
                        src={hero_shape_01}
                        alt="hero-shape" />
                    <img
                        className="w-1/12 absolute top-3/4 -translate-y-3/4 right-[34%] -translate-x-[34%]"
                        src={hero_curve_line_02}
                        alt="hero-line" />
                    <img
                        className="w-[10%] lg:w-[7%] absolute top-[78%] -translate-y-[78%] right-[30%] lg:right-[32%] -translate-x-[30%] lg:-translate-x-[32%] animate-button"
                        src={hero_btn_02}
                        alt="hero-btn" />
                </SwiperSlide>
                <div className="slider-controler">
                    <div className="swiper-button-prev !left-10 after:!content-[''] !w-[50px] !h-[50px] bg-pink rounded-full opacity-0 lg:opacity-50 lg:hover:!opacity-100">
                        <span className="text-white"><HiArrowLeft size={36} /></span>
                    </div>
                    <div className="swiper-button-next !right-10 after:!content-[''] !w-[50px] !h-[50px] bg-pink rounded-full opacity-0 lg:opacity-50 lg:hover:!opacity-100">
                        <span className="text-white"><HiArrowRight size={36} /></span>
                    </div>
                </div>
            </Swiper>
        </div>
    )
}

export default Hero