import React from 'react';
import serviceData from '../../assets/data/serviceData';

const Services = () => {
    return (
        <section
            className='services bg-background'
        >
            <div className="px-4 py-5 2xl:container 2xl:mx-auto md:py-10 md:px-14 lg:px-20">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
                    {serviceData.map((item, index) => (
                        <div className="flex flex-col items-center justify-center p-5" key={index}>
                            <span className="p-3 border rounded-full text-pink">{item.icon}</span>
                            <h3 className='mt-4 text-lg font-bold capitalize'>{item.title}</h3>
                            <p>{item.subtitle}</p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )

}

export default Services