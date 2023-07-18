import React from 'react'
import ProductCard from './ProductCard';
import notFound_img from '../../assets/images/404/NotFound.svg'

const ProductsList = ({ data }) => {
    return (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {data && data.length > 0 ? data.map((product) => (
                <ProductCard
                    key={product.id}
                    item={product}
                />
            ))
                :
                <div className='flex flex-col items-center justify-center w-full col-span-3 mt-20'>
                    <img src={notFound_img} className="h-[340px]" alt='' />
                    <p className="my-2 text-xl font-semibold text-headingColor">
                        Items Not Available
                    </p>
                </div>
            }
        </div>
    )
}

export default ProductsList