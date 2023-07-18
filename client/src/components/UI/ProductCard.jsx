import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { cartSlice } from '../../store/slices/cartSlice';
import { formatMoney } from '../../utils/formatMoney';
import { arrayUnion, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import useAuth from '../../customHook/useAuth'
import moment from 'moment';
import { icons } from '../../utils/icons';

const ProductCard = ({ item }) => {
    const { RiLoader4Line, MdAddShoppingCart } = icons
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const { currentUser } = useAuth();

    const productItem = {
        id: item.id,
        imageURL: item.imageURL,
        productName: item.productName,
        price: item.price,
        discounted: item.discounted || '',
        category: item.category,
        quantity: 1,
        createdAt: moment().format('MMMM DD, YYYY, h:mm a'),
    }

    const colletionRef = collection(db, 'cart');

    const handleAddToCart = async () => {
        setIsLoading(true)
        setTimeout(() => {
            dispatch(
                cartSlice.actions.ADD_ITEM({
                    id: item.id,
                    imageURL: item.imageURL,
                    productName: item.productName,
                    price: item.price,
                    discounted: item.discounted,
                    category: item.category,
                    quantity: 1
                })
            )
            toast.success(`"${item.productName}" has been added to cart!`)
            setIsLoading(false)

        }, 1500);

        try {
            const cartRef = doc(colletionRef, currentUser.uid);
            if (cartRef) {
                await updateDoc(cartRef, {
                    products: arrayUnion(productItem),
                });
            } else {
                await setDoc(doc(colletionRef, currentUser.uid), {
                    products: arrayUnion(productItem)
                })
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }


    return (
        <div className="relative p-4 mt-5 transition-all duration-500 bg-white shadow-lg product rounded-xl hover:drop-shadow-xl hover:duration-500 hover:transition-all">
            {
                item.discounted ? <>
                    <div className="absolute top-0 right-0 z-20 px-2 rounded bg-pink">
                        <span className="text-white">-{Math.ceil(((item.price - item.discounted) / item.price) * 100)}%</span>
                    </div>
                </> : ""
            }

            {/* <div className="absolute z-20 px-2 bg-red-200 rounded top-1 left-1">
                <span className="text-pink">Hot</span>
            </div> */}

            <div className="min-h-[200px]">
                <Link to={`/products/${item.id}`}>
                    <img
                        onClick={() => window.scroll(0, 400)}
                        className="duration-1000 hover:scale-110 hover:duration-1000 h-[200px] w-[250px] object-contain mx-auto"
                        src={item.imageURL}
                        alt={item.productName}
                    />
                </Link>
            </div>
            <div className="mt-6">
                <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                <Link to={`/products/${item.id}`}>
                    <span onClick={() => window.scroll(0, 400)} className="block mt-2 mb-3 text-xl font-medium capitalize hover:text-pink">{item.productName}</span>
                </Link>
                {/* <div className="flex items-center">
                    <span>
                        <Star stars={item.reviews} />
                    </span>
                    {
                        item.reviews?.length
                            ?
                            <span className="ml-2 text-sm">{`(${item.reviews?.length})`}</span>
                            :
                            ''
                    }
                </div> */}
                <div className="flex items-end justify-between">
                    {item.discounted ? <>
                        <div>
                            <span className="mr-2 text-lg font-bold text-pink">
                                {formatMoney(item.discounted)}
                            </span>
                            <span className="text-base font-bold text-gray-400 line-through">
                                {formatMoney(item.price)}
                            </span>
                        </div>
                    </>
                        : <span className="text-lg font-bold text-pink">
                            {formatMoney(item.price)}
                        </span>
                    }
                    <Button
                        className="w-20 !px-0 !py-1 !rounded-lg"
                        title={
                            isLoading
                                ?
                                <span className="flex items-center justify-center">
                                    <span className="animate-spin">
                                        <RiLoader4Line size={24} />
                                    </span>
                                </span>
                                :
                                <span className="flex items-center justify-center gap-1">
                                    <MdAddShoppingCart />
                                    <span>Add</span>
                                </span>
                        }
                        onClick={handleAddToCart}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCard