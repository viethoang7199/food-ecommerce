import React, { useEffect } from 'react';
import contact_bg from '../assets/images/background/bg_1.png';
import contact_info_bg from '../assets/images/contact/contact_info_bg.png';
import Helmet from '../components/Helmet';
import BreadCrumb from '../components/UI/BreadCrumb';
import Button from '../components/common/Button';
import { icons } from '../utils/icons';

const Contact = () => {
    const { RiMapPin2Fill, RiPhoneFill, RiMailFill } = icons
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return <Helmet title="Contact Us">
        <BreadCrumb title={<span>Contact <span className="text-orange">Us</span></span>} />
        <section className="bg-background"
            style={{ backgroundImage: `url(${contact_bg})`, }}
        >
            <div className="px-4 py-10 2xl:container 2xl:mx-auto lg:py-20 md:px-14 lg:px-20">
                <div className="flex gap-10">
                    <div className="w-full px-4 py-12 text-center bg-no-repeat bg-[center_center] bg-cover rounded-md shadow-lg"
                        style={{ backgroundImage: `url(${contact_info_bg})`, }}
                    >
                        <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-pink mb-7">
                            <span className="text-white "><RiPhoneFill size={48} /></span>
                        </div>
                        <h4 className="mb-2 text-2xl font-semibold">Phone</h4>
                        <p>0123456789</p>
                    </div>
                    <div className="w-full px-4 py-12 text-center bg-no-repeat bg-[center_center] bg-cover rounded-md shadow-lg"
                        style={{ backgroundImage: `url(${contact_info_bg})`, }}
                    >
                        <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-pink mb-7">
                            <span className="text-white"><RiMailFill size={48} /></span>
                        </div>
                        <h4 className="mb-2 text-2xl font-semibold">Email</h4>
                        <p>example@example.com</p>
                    </div>
                    <div className="w-full px-4 py-12 text-center bg-no-repeat bg-[center_center] bg-cover rounded-md shadow-lg"
                        style={{ backgroundImage: `url(${contact_info_bg})`, }}
                    >
                        <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-pink mb-7">
                            <span className="text-white"><RiMapPin2Fill size={48} /></span>
                        </div>
                        <h4 className="mb-2 text-2xl font-semibold">Location</h4>
                        <p>Đắk Lắk</p>
                    </div>
                </div>

                <div className="w-2/4 p-20 mx-auto mt-20 bg-white shadow-lg rounded-xl">
                    <h3 className='text-4xl font-semibold text-center'>Get in touch</h3>
                    <p className="text-lg text-center text-gray-600">For enquiries, please email us using the form below</p>

                    <form action="" className='mt-10'>
                        <input type="text" placeholder="Your name" className="w-full px-4 py-2 mb-8 border border-gray-400 rounded-lg outline-none" />
                        <input type="text" placeholder="Your email" className="w-full px-4 py-2 mb-8 border border-gray-400 rounded-lg outline-none" />
                        <input type="text" placeholder="Your message" className="w-full px-4 py-2 mb-8 border border-gray-400 rounded-lg outline-none" />
                        <div className='text-center'>
                            <Button
                                className="py-2"
                                title="Send message"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </section>

    </Helmet>
}

export default Contact