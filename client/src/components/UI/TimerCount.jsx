import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Clock from './Clock';
import timer_count_img from '../../assets/images/background/timer-bg.png'

const TimerCount = () => {
    return (
        <section className="time-sale bg-no-repeat bg-cover bg-[center_center]"
            style={{ backgroundImage: `url(${timer_count_img})`, }}
        >
            <div className="2xl:container 2xl:mx-auto py-10 lg:py-[120px] px-4 md:px-14 lg:px-20 lg:w-[1200px]">
                <div className="flex items-start lg:items-center flex-col lg:flex-row md:p-8 lg:p-0">
                    <Clock />
                    <div className="w-[80%] md:w-[60%] lg:w-2/4 xl:w-[40%] lg:ml-24 mt-10">
                        <h2 className="text-white font-semibold text-2xl md:text-3xl lg:text-4xl -mt-2 mb-4">Delicious Pizza & Burger <br /> in Restaurant</h2>
                        <p className="text-white mb-6">Progressively simplify effective e-tailers and process-centric methods of empowerment. Quickly pontificate parallel.</p>
                        <Link to="/products">
                            <Button
                                title="Order now"
                                className="!px-10 mt-5 !bg-white !text-black py-2 text-xl !rounded-full hover:!bg-pink hover:!text-white"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TimerCount