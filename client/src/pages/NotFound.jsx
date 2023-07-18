import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import error_img from '../assets/images/404/error_img.png';
import Button from '../components/common/Button';
import { icons } from '../utils/icons';

const NotFound = () => {
    const { AiOutlineHome } = icons;
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <div className='px-4 py-28 md:px-8 lg:px-0' >
            <div className='container mx-auto'>
                <div className='pb-10'>
                    <img src={error_img} alt="error_img" className='mx-auto' />
                </div>
                <div className='pb-20 text-center'>
                    <h2 className='mb-4 text-5xl font-bold md:text-7xl font-lobster'>Page not found</h2>
                    <p className='mb-8 text-lg font-medium text-gray-600 md:font-semibold md:text-2xl'>The cause may be a technical error that we are working to fix.</p>
                    <Link to='/'>
                        <Button
                            className="py-2 text-xl"
                            title={
                                <span className='flex items-center gap-3'>
                                    <span><AiOutlineHome /></span>
                                    <span className='font-medium'>Back home</span>
                                </span>
                            }
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound