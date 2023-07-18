import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import breadcrumb_img from '../../assets/images/breadcrumb/breadcrumb-bg.png';

const BreadCrumb = ({ title, hehe }) => {
    const location = useLocation();
    const breadCrumbView = () => {
        const { pathname } = location;
        const pathnames = pathname.split("/").filter((item) => item);
        const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
        return (
            <div className="breadcrumb h-[400px] w-full relative mt-16"
                style={{ backgroundImage: `url(${breadcrumb_img})`, }}
            >
                <div className="w-full px-4 2xl:container 2xl:mx-auto py-36 md:px-14 lg:px-40">
                    <div className="mb-6 font-medium text-white capitalize text-7xl font-lobster">
                        <span>{title}</span>
                    </div>
                    <div>
                        {pathnames.length > 0 ? (
                            <Link to="/"
                                className='text-white'
                            >Home {">"} </Link>
                        ) : (
                            <p className='text-white'>Home</p>
                        )}
                        {pathnames.map((name, index) => {
                            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                            const isLast = index === pathnames.length - 1;
                            return isLast ? (
                                <span key={index} className="text-white">{capatilize(name)}</span>
                            ) : (
                                <span key={index}>
                                    <Link to={`${routeTo}`} className="text-white">{capatilize(name)} {">"} </Link>
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    return <>{breadCrumbView()}</>;
}

export default BreadCrumb