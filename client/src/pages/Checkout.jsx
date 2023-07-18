import { collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import notFound_img from '../assets/images/404/NotFound.svg';
import Helmet from '../components/Helmet';
import Loading from '../components/Loading/AudioLoading';
import BreadCrumb from '../components/UI/BreadCrumb';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import useAuth from '../customHook/useAuth';
import { db } from '../firebase';
import { cartSlice } from '../store/slices/cartSlice';
import { formatMoney } from '../utils/formatMoney';
import { icons } from '../utils/icons';

const Checkout = () => {
    const { RiDeleteBinLine } = icons
    const cartList = useSelector(state => state.cartList.cartItems);
    const totalAmount = useSelector(state => state.cartList.totalAmount);

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const { currentUser } = useAuth();

    // const { data: users } = useGetData('users');

    // const abc = users.filter(item => item.uid === currentUser.uid)

    const handleRemoveItem = (cartItemId) => {
        setIsLoading(true);
        setTimeout(() => {
            dispatch(cartSlice.actions.REMOVE_ITEM(cartItemId));
            setIsLoading(false)
            toast.success('The product has been removed from the cart');
        }, 1000)
    }

    const [formVal, setFormVal] = useState({
        id: nanoid(),
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
    })

    const handleChangeFields = (e) => {
        const { name, value } = e.target;
        setFormVal({
            ...formVal,
            [name]: value
        })
    }

    const information = {
        id: currentUser.uid,
        fullName: currentUser.displayName,
        email: currentUser.email,
        phoneNumber: formVal.phoneNumber,
        address: formVal.address,
        orderAt: serverTimestamp(),
    };

    const colletionRef = collection(db, 'orders');

    const handleSubmitOrder = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const orderRef = doc(colletionRef, currentUser.uid);
            if (!orderRef) {
                await updateDoc(colletionRef, {
                    information,
                    cartList,
                    status: 'Wait confirm'
                });
            } else {
                await setDoc(doc(db, 'orders', currentUser.uid), {
                    information,
                    cartList,
                    status: 'Wait confirm'
                })
            }
            toast.success('Order Successfullyyyyyyyyyyyyyyy!');
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error.message);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        // window.scroll(0, 0)
    }, [])

    // const [values, setValues] = useState([])

    // useEffect(() => {
    //     const fetchDataCity = async () => {
    //         const res = await fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
    //         const resCity = await res.json();
    //         setValues(resCity)
    //     }
    //     fetchDataCity();
    // }, [])


    return <Helmet title='Checkout'>
        <BreadCrumb title='Checkout' />
        {isLoading && <Loading />}
        <div className="px-4 py-10 2xl:container 2xl:mx-auto lg:py-20 md:px-14 lg:px-20">
            {
                cartList.length > 0 ?
                    <div className="grid grid-cols-3 gap-10">
                        <div className="order-last col-span-3 px-6 py-10 space-y-12 border border-gray-300 lg:col-span-2 lg:px-12 lg:-order-none">
                            <div className="rounded-md">
                                <form onSubmit={handleSubmitOrder}>
                                    <h2 className="my-2 text-lg font-semibold tracking-wide text-gray-700 uppercase">Shipping & Billing Information</h2>
                                    <div className='mb-5'>
                                        <InputText
                                            name="fullName"
                                            type="text"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                                            placeholder="Try Odinsson"
                                            value={currentUser?.displayName || formVal.fullName}
                                            onChange={handleChangeFields}
                                        />
                                    </div>
                                    <div className='mb-5'>
                                        <InputText
                                            name="email"
                                            type="email"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                                            placeholder="try@example.com"
                                            value={currentUser?.email || formVal.email}
                                            onChange={handleChangeFields}
                                        />
                                    </div>
                                    <div className='mb-5'>
                                        <InputText
                                            name="phoneNumber"
                                            type="text"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                                            placeholder="0123456789"
                                            value={currentUser.phoneNumber || formVal.phoneNumber}
                                            onChange={handleChangeFields}
                                        />
                                    </div>
                                    <div className='mb-5'>
                                        <InputText
                                            name="address"
                                            type="text"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                                            placeholder="10 Street XYZ 654"
                                            value={currentUser.address || formVal.address}
                                            onChange={handleChangeFields}
                                        />
                                    </div>

                                    <Button
                                        className="w-full px-4 py-3 text-xl font-semibold text-white transition-colors bg-pink-400 rounded-full focus:ring focus:outline-none"
                                        title="Place order"
                                    // type="button"
                                    />
                                </form>
                            </div>
                        </div>
                        <div className="col-span-3 bg-white border border-gray-300 lg:col-span-1">
                            <h1 className="px-8 py-6 text-xl text-black border-b">Order Summary</h1>
                            <ul className="px-6 py-6 space-y-6 border-b lg:px-8">
                                {
                                    cartList.map(item => (
                                        <li key={item.id}>
                                            <div className="relative flex items-center self-center gap-3 lg:gap-5">
                                                <img src={item.imageURL} alt={item.productName}
                                                    className="object-contain w-20 h-20 p-1 border border-gray-300 rounded"
                                                />
                                                <div className="flex flex-col py-2 grow">
                                                    <p className="text-lg font-medium text-black lg:pb-3">{item.productName}</p>
                                                    <div className="flex flex-col justify-between lg:items-center lg:flex-row">
                                                        <p>
                                                            {item.discounted ? <>
                                                                <span className="mr-2 text-base font-medium text-black">
                                                                    {formatMoney(item.discounted)}
                                                                </span>
                                                                <span className="text-base font-medium text-gray-300 line-through">
                                                                    {formatMoney(item.price)}
                                                                </span>
                                                            </>
                                                                : <span className="text-base font-medium text-black">
                                                                    {formatMoney(item.price)}
                                                                </span>
                                                            }
                                                        </p>
                                                        <p className="font-medium text-black ">
                                                            Quantity: {item.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    className="absolute top-0 right-0 flex items-center justify-center !px-2 py-0 rounded-md !bg-transparent border text-black border-gray-500 border-dashed cursor-pointer hover:!bg-pink hover:text-white"
                                                    title={<span><RiDeleteBinLine /></span>}
                                                    onClick={() => handleRemoveItem(item.id)}
                                                />
                                            </div>
                                            <hr className="mt-5" />
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className="px-8 border-b">
                                <div className="flex justify-between py-4 text-black">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-pink-500">{formatMoney(totalAmount)}</span>
                                </div>
                                <div className="flex justify-between py-4 text-black">
                                    <span>Shipping</span>
                                    <span className="font-semibold text-pink-500">Free</span>
                                </div>
                            </div>
                            <div className="flex justify-between px-8 py-8 text-xl font-semibold text-black">
                                <span>Total</span>
                                <span className="text-pink">{formatMoney(totalAmount)}</span>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='flex flex-col items-center justify-center'>
                        <img src={notFound_img} className="h-[340px]" alt='' />
                        <p className="my-2 text-2xl !text-black text-center">
                            Your cart is empty!
                        </p>
                        <Link to='/products'>
                            <Button className="py-2" title='Return to shop' />
                        </Link>
                    </div>
            }
        </div>
    </Helmet>
};

export default Checkout;