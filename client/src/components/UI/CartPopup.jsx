import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatMoney } from '../../utils/formatMoney';
import Button from '../common/Button';
import { cartSlice } from '../../store/slices/cartSlice';
import '../../styles/cart-popup.css'
import { icons } from '../../utils/icons';

const CartPopup = ({ onHandleClose, className, onHandleViewCart, onHandleCheckout, onHandleReturnShop }) => {
    const { AiOutlineClose, RiShoppingBasket2Line } = icons
    const cartList = useSelector(state => state.cartList.cartItems);
    const totalAmount = useSelector(state => state.cartList.totalAmount);
    const dispatch = useDispatch();
    const handleRemoveProductInCart = (productId) => {
        dispatch(cartSlice.actions.REMOVE_ITEM(productId));
    }
    const handleDecreaseQty = (productId) => {
        dispatch(cartSlice.actions.DECREASE(productId));
    }
    const handleIncreaseQty = async (cart) => {
        dispatch(
            cartSlice.actions.INCREASE(cart)
        );
    }

    return (
        <div className={`cartpopup bg-white fixed top-0 right-0 z-50 md:w-96 w-full h-full translate-x-full transition-all duration-500 ease-in-out overflow-hidden ${className}`}>
            <div className='flex items-center justify-between p-5 bg-gray-800'>
                <span className='text-xl font-bold text-white uppercase'>Order cart</span>
                <span
                    className="p-1 bg-white rounded-full cursor-pointer text-pink hover:text-white active:opacity-50 hover:bg-pink"
                    onClick={onHandleClose}>
                    <AiOutlineClose />
                </span>

            </div>
            <div className='cart-popup-center p-4 overflow-auto h-[calc(100%-17rem)] md:h-[calc(100%-20rem)]'>
                {cartList.length > 0
                    ?
                    cartList.map((cart) => (
                        <div className='relative flex items-center self-center gap-2 py-4 border-b border-gray-300' key={cart.id}>
                            <div className='absolute flex items-center justify-center w-5 h-5 text-black rounded-full cursor-pointer top-2 right-2 hover:scale-125 active:text-pink hover:bg-pink hover:text-white'>
                                <span
                                    onClick={() => handleRemoveProductInCart(cart.id)}
                                >
                                    <AiOutlineClose />
                                </span>
                            </div>
                            <div className='flex items-center justify-center'>
                                <img className="object-contain w-20 h-20 p-1 border border-gray-300 rounded" src={cart.imageURL} alt={cart.productName} />
                            </div>

                            <div className='flex flex-col justify-between p-4 grow'>
                                <h5 className='mb-2 font-bold capitalize'>{cart.productName}</h5>
                                <div className='flex items-center justify-between w-full'>
                                    <p className='font-semibold'>
                                        {cart.discounted
                                            ?
                                            <>
                                                <span className="mr-2 text-pink">
                                                    {formatMoney(cart.discounted)}
                                                </span>
                                                <span className="font-semibold text-gray-300 line-through">
                                                    {formatMoney(cart.price)}
                                                </span>
                                            </>
                                            :
                                            <span className="text-pink">
                                                {formatMoney(cart.price)}
                                            </span>
                                        }
                                    </p>
                                    <div className='flex items-center justify-center h-7'>
                                        <div className='inline-flex items-center justify-center'>
                                            <Button className='!text-black !p-0 w-6 h-6 flex justify-center items-center border border-gray-400 !bg-transparent rounded hover:!bg-transparent'
                                                onClick={() => handleDecreaseQty(cart.id)}
                                                title="-"
                                            />
                                            <div className='flex items-center justify-center w-8 h-6 p-0 mx-1 text-sm bg-transparent border border-gray-400 rounded outline-none'>
                                                {cart.quantity}
                                            </div>
                                            <Button className='!text-black !p-0 w-6 h-6 flex justify-center items-center border border-gray-400 !bg-transparent rounded hover:!bg-transparent'
                                                onClick={() => handleIncreaseQty(cart)}
                                                title="+"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <>
                        <div className='mt-16'>
                            <div className='relative flex items-center justify-center'>
                                <span className="absolute text-3xl text-gray-400 -top-2 left-2/4 -translate-x-2/4">
                                    <AiOutlineClose />
                                </span>
                                <span className="text-gray-400 text-9xl">
                                    <RiShoppingBasket2Line />
                                </span>
                            </div>
                        </div>
                        <div className='mx-auto mt-5'>
                            <p className='font bold text-3xl !text-black text-center mb-3'>Your cart is empty</p>
                            <Link
                                to='/products'
                                className="block text-center"
                            >
                                <Button
                                    title='Return to shop'
                                    className='rounded-3xl'
                                    onClick={onHandleReturnShop}
                                />
                            </Link>
                        </div>
                    </>
                }
            </div>

            {cartList.length > 0 ?
                <div className='h-56 px-8 py-4'>
                    <div className='flex items-center justify-between p-4 border-t border-solid border-slate-700'>
                        <span className='font-bold uppercase'>Total</span>
                        <span className='font-semibold text-pink'>{formatMoney(totalAmount)}</span>
                    </div>
                    <div>
                        <div className="mb-2 ">
                            <Link to='/cart'
                                onClick={onHandleViewCart}>
                                <Button title='View cart' className='w-full !rounded-2xl' />
                            </Link>
                        </div>
                        <div >
                            <Link to='/checkout'
                                onClick={onHandleCheckout}>
                                <Button title='Check out' className='w-full !rounded-2xl' />
                            </Link>
                        </div>
                    </div>
                </div>
                :
                ''}
        </div>
    );
};

export default CartPopup;