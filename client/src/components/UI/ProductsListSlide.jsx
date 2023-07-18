import React, { useRef } from 'react';
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from './ProductCard';
import { icons } from '../../utils/icons';

const ProductsListSlide = ({ data }) => {
    const { HiArrowRight, HiArrowLeft } = icons
    const swiperRef = useRef(null)

    return (
        <div
            className="products-list-slide group"
            onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
            onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}
        >
            <div className="item 2xl:container 2xl:mx-auto">
                <Swiper
                    ref={swiperRef}
                    spaceBetween={20}
                    loop={true}
                    slidesPerView={4}
                    modules={[EffectFade,
                        Navigation,
                        Autoplay
                    ]}
                    speed={1000}
                    autoplay={{
                        delay: 1500,
                        // disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        clickable: true,
                    }}

                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        480: {
                            slidesPerView: 2,
                        },
                        780: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        }
                    }}
                    className="!py-5"
                >
                    {data.map(product => (
                        <SwiperSlide key={product.id}>
                            <ProductCard
                                item={product}
                            />
                        </SwiperSlide>
                    ))}
                    <div className="slider-controler">
                        <div className="swiper-button-prev !left-0 group-hover:opacity-50 after:!content-[''] !w-10 !h-10 bg-pink rounded-full opacity-50 lg:opacity-0 hover:!opacity-100">
                            <span className="text-white">
                                <HiArrowLeft size={20} />
                            </span>
                        </div>
                        <div className="swiper-button-next !right-0 group-hover:opacity-50 after:!content-[''] !w-10 !h-10 bg-pink rounded-full opacity-50 lg:opacity-0 hover:!opacity-100">
                            <span className="text-white">
                                <HiArrowRight size={20} />
                            </span>
                        </div>
                    </div>
                </Swiper>
            </div>
        </div>
    )
}

export default ProductsListSlide