import React, { useRef } from 'react';
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import avt_img from '../../assets/images/user-icon.png'
import SectionSubtitle from '../common/SectionSubTitle';
import SectionTitle from '../common/SectionTitle';
import { icons } from '../../utils/icons';

const Testimonials = () => {
    const { RiDoubleQuotesL, HiArrowRight, HiArrowLeft } = icons
    const swiperRef = useRef(null)

    return (
        <section className='testimonials bg-background group'
            onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
            onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}
        >

            <div className='px-4 py-10 2xl:container 2xl:mx-auto lg:py-20 md:px-14 lg:px-20'>
                <SectionSubtitle title="Testimonials" />
                <SectionTitle title={<span>Our Customer <span className="font-lobster text-pink">Feedbacks</span></span>} />
                <p className='relative text-center text-black m-auto w-[300px] sm:w-[600px] mb-6'>
                    Objectively pontificate quality models before intuitive information. Dramatically recaptiualize multifunctional materials.
                </p>
                <Swiper
                    ref={swiperRef}
                    spaceBetween={20}
                    loop={true}
                    slidesPerView={3}
                    modules={[EffectFade,
                        Navigation,
                        Autoplay
                    ]}
                    speed={1000}
                    autoplay={{
                        delay: 1500,
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
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="!py-5"
                >
                    <SwiperSlide>
                        <div className='bg-white shadow-lg py-8 px-12 md:p-6 rounded-3xl min-h-[400px] md:min-h-[380px] lg:min-h-[324px] flex flex-col justify-between'>
                            <span className="mb-5 text-gray-700"><RiDoubleQuotesL size={72} /></span>
                            <p className='mb-4 text-lg text-gray-700 grow'>"&nbsp;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit ipsam laudantium placeat libero? Voluptatibus architecto at nam, recusandae incidunt harum?&nbsp;"</p>
                            <div className="flex items-center justify-between">
                                <img className='object-cover mr-6 rounded-full w-14 h-14' src={avt_img} alt="avt" />
                                <h3 className='text-xl font-lobster font-blod grow'>Ahihi</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='bg-white shadow-lg py-8 px-12 md:p-6 rounded-3xl min-h-[400px] md:min-h-[380px] lg:min-h-[324px] flex flex-col justify-between'>
                            <span className="mb-5 text-gray-700"><RiDoubleQuotesL size={72} /></span>
                            <p className='mb-4 text-lg text-gray-700 grow'>"&nbsp;Lorem ipsum dolor, &nbsp;"</p>
                            <div className="flex items-center justify-between">
                                <img className='object-cover mr-6 rounded-full w-14 h-14' src={avt_img} alt="avt" />
                                <h3 className='text-xl font-lobster font-blod grow'>Ahihi</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='bg-white shadow-lg py-8 px-12 md:p-6 rounded-3xl min-h-[400px] md:min-h-[380px] lg:min-h-[324px] flex flex-col justify-between'>
                            <span className="mb-5 text-gray-700"><RiDoubleQuotesL size={72} /></span>
                            <p className='mb-4 text-lg text-gray-700 grow'>"&nbsp;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit ipsam laudantium placeat libero? Voluptatibus architecto at nam, recusandae incidunt harum?&nbsp;"</p>
                            <div className="flex items-center justify-between">
                                <img className='object-cover mr-6 rounded-full w-14 h-14' src={avt_img} alt="avt" />
                                <h3 className='text-xl font-lobster font-blod grow'>Ahihi</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='bg-white shadow-lg py-8 px-12 md:p-6 rounded-3xl min-h-[400px] md:min-h-[380px] lg:min-h-[324px] flex flex-col justify-between'>
                            <span className="mb-5 text-gray-700"><RiDoubleQuotesL size={72} /></span>
                            <p className='mb-4 text-lg text-gray-700 grow'>"&nbsp;Lorem ipsum dolor, &nbsp;"</p>
                            <div className="flex items-center justify-between">
                                <img className='object-cover mr-6 rounded-full w-14 h-14' src={avt_img} alt="avt" />
                                <h3 className='text-xl font-lobster font-blod grow'>Ahihi</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='bg-white shadow-lg py-8 px-12 md:p-6 rounded-3xl min-h-[400px] md:min-h-[380px] lg:min-h-[324px] flex flex-col justify-between'>
                            <span className="mb-5 text-gray-700"><RiDoubleQuotesL size={72} /></span>
                            <p className='mb-4 text-lg text-gray-700 grow'>"&nbsp;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit ipsam laudantium placeat libero? Voluptatibus architecto at nam, recusandae incidunt harum?&nbsp;"</p>
                            <div className="flex items-center justify-between">
                                <img className='object-cover mr-6 rounded-full w-14 h-14' src={avt_img} alt="avt" />
                                <h3 className='text-xl font-lobster font-blod grow'>Ahihi</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='bg-white shadow-lg py-8 px-12 md:p-6 rounded-3xl min-h-[400px] md:min-h-[380px] lg:min-h-[324px] flex flex-col justify-between'>
                            <span className="mb-5 text-gray-700"><RiDoubleQuotesL size={72} /></span>
                            <p className='mb-4 text-lg text-gray-700 grow'>"&nbsp;Lorem ipsum dolor, &nbsp;"</p>
                            <div className="flex items-center justify-between">
                                <img className='object-cover mr-6 rounded-full w-14 h-14' src={avt_img} alt="avt" />
                                <h3 className='text-xl font-lobster font-blod grow'>Ahihi</h3>
                            </div>
                        </div>
                    </SwiperSlide>

                    <div className="slider-controler">
                        <div className="swiper-button-prev !left-0 group-hover:opacity-50 after:!content-[''] !w-10 !h-10 bg-pink rounded-full opacity-50 lg:opacity-0 hover:!opacity-100">
                            <span className="text-white"><HiArrowLeft size={20} /></span>
                        </div>
                        <div className="swiper-button-next !right-0 group-hover:opacity-50 after:!content-[''] !w-10 !h-10 bg-pink rounded-full opacity-50 lg:opacity-0 hover:!opacity-100">
                            <span className="text-white"><HiArrowRight size={20} /></span>
                        </div>
                    </div>
                </Swiper>
            </div>
        </section>
    )
}

export default Testimonials