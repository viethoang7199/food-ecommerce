import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from '../components/Helmet';
import BreadCrumb from '../components/UI/BreadCrumb';
import Button from '../components/common/Button';
import { cartSlice } from '../store/slices/cartSlice';
import { formatMoney } from '../utils/formatMoney';
import { icons } from '../utils/icons';

const Cart = () => {
    const { RiDeleteBinLine } = icons
    const cartList = useSelector(state => state.cartList.cartItems);
    const totalAmount = useSelector(state => state.cartList.totalAmount);

    const dispatch = useDispatch();

    const handleDecreaseQty = (cartItemId) => {
        dispatch(cartSlice.actions.DECREASE(cartItemId));
    };

    const handleIncreaseQty = (cart) => {
        dispatch(
            cartSlice.actions.INCREASE(cart)
        );
    };

    const handleRemoveCartItem = (cartItemId) => {
        dispatch(cartSlice.actions.REMOVE_ITEM(cartItemId));
    }

    const [totalMoney] = useState(totalAmount);

    useEffect(() => {
        window.scroll(0, 0)
    }, [])



    return <Helmet title='Cart'>
        <BreadCrumb title="Cart" />
        <div className='cart__page' >
            {cartList.length > 0 ?
                <div className="px-4 py-10 2xl:container 2xl:mx-auto lg:py-20 md:px-14 lg:px-20">
                    <p className="mb-5">There are <span className="font-medium text-pink">{cartList.length} products</span> in your cart</p>
                    <div className="flex flex-col justify-between gap-10 lg:flex-row">
                        <div className="w-full">
                            <table className='w-full m-auto border-separate cart__page__table md:border-collapse md:border md:border-gray-200 rounded-xl'>
                                <thead className='hidden bg-gray-100 md:table-header-group'>
                                    <tr>
                                        <th className='px-2 py-3 font-bold'>Image</th>
                                        <th className='px-2 py-3 font-bold'>Product Name</th>
                                        <th className='px-2 py-3 font-bold'>Price</th>
                                        <th className='px-2 py-3 font-bold'>Quantity</th>
                                        <th className='px-2 py-3 font-bold'>Total</th>
                                        <th className='px-2 py-3 font-bold'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartList.map((cart) => (
                                        <tr
                                            key={cart.id}
                                            className='block mx-0 my-5 border border-gray-400 cart__page__table__item md:table-row'
                                        >
                                            <td
                                                data-title='Product'
                                                className='text-right md:text-center py-4 md:py-5 px-4 md:px-0 border-b md:border border-gray-400 md:border-gray-200 block md:table-cell w-full md:w-auto pl-[25%] relative md:static after:content-[attr(data-title)] after:absolute after:left-4 after:top-2/4 after:block md:after:hidden after:font-semibold after:-translate-y-2/4'
                                            >
                                                <img className='inline-block object-cover w-20 h-20 mx-auto cart__page__table__item-img' src={cart.imageURL} alt='' />
                                            </td>
                                            <td data-title='Name'
                                                className='text-right md:text-center py-4 md:py-5 px-4 md:px-0 border-b md:border border-gray-400 md:border-gray-200 block md:table-cell w-full md:w-auto pl-[25%] relative md:static after:content-[attr(data-title)] md:after:hidden after:absolute after:left-4 after:top-2/4 after:block after:font-semibold after:-translate-y-2/4'
                                            >
                                                <Link to={`/products/${cart.id}`}>
                                                    <span className='text-lg font-medium capitalize hover:text-pink'>
                                                        {cart.productName}
                                                    </span>
                                                </Link>
                                            </td>
                                            <td
                                                data-title='Price'
                                                className='text-right md:text-center py-4 md:py-5 px-4 md:px-0 border-b md:border border-gray-400 md:border-gray-200 block md:table-cell w-full md:w-auto pl-[25%] relative md:static after:content-[attr(data-title)] md:after:hidden after:absolute after:left-4 after:top-2/4 after:block after:font-semibold after:-translate-y-2/4'
                                            >
                                                {cart.discounted ? <>
                                                    <span className="mr-2 font-bold">
                                                        {formatMoney(cart.discounted)}
                                                    </span>
                                                    <span className="font-bold text-gray-400 line-through">
                                                        {formatMoney(cart.price)}
                                                    </span>
                                                </>
                                                    : <span className="font-bold">
                                                        {formatMoney(cart.price)}
                                                    </span>
                                                }
                                            </td>
                                            <td data-title='Quantity'
                                                className='text-right md:text-center py-4 md:py-5 px-4 md:px-0 border-b md:border border-gray-400 md:border-gray-200 block md:table-cell w-full md:w-auto pl-[25%] relative md:static after:content-[attr(data-title)] md:after:hidden after:absolute after:left-4 after:top-2/4 after:block after:font-semibold after:-translate-y-2/4'
                                            >
                                                <div className='inline-flex items-center justify-center'>
                                                    <Button className={`!p-0 w-6 h-6 flex justify-center items-center border border-gray-400 !bg-transparent rounded hover:!bg-transparent ${cart.quantity <= 1 ? "text-gray-300" : "text-black"}`}
                                                        onClick={() => handleDecreaseQty(cart.id)}
                                                        disabled={cart.quantity <= 1 ? true : false}
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
                                            </td>
                                            <td data-title='Total'
                                                className='text-right md:text-center py-4 md:py-5 px-4 md:px-0 border-b md:border border-gray-400 md:border-gray-200 block md:table-cell w-full md:w-auto pl-[25%] relative md:static after:content-[attr(data-title)] md:after:hidden after:absolute after:left-4 after:top-2/4 after:block after:font-semibold after:-translate-y-2/4'
                                            >
                                                <span className='font-semibold'>
                                                    {formatMoney(cart.totalPrice)}
                                                </span>
                                            </td>
                                            <td data-title='Remove'
                                                className="text-right md:text-center py-4 md:py-5 px-4 md:px-0 border-b md:border border-gray-400 md:border-gray-200 block md:table-cell w-full md:w-auto pl-[25%] relative md:static after:content-[attr(data-title)] md:after:hidden after:absolute after:left-4 after:top-2/4 after:block after:font-semibold after:-translate-y-2/4"
                                            >
                                                <span
                                                    className="flex items-center justify-center cursor-pointer text-pink"
                                                    onClick={() => handleRemoveCartItem(cart.id)}
                                                >
                                                    <RiDeleteBinLine size={20} />
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className='flex justify-center mx-0 my-5 border border-gray-400 md:table-row md:border-gray-200'>
                                        <td colSpan={6} className='px-4 py-4 md:py-5 md:px-0'>
                                            <div className="flex flex-col items-center justify-between px-4 lg:flex-row">

                                                <form
                                                    className='flex flex-col items-center gap-4 mb-10 lg:flex-row lg:mb-0'
                                                // onSubmit={handleSubmitCoupon}
                                                >
                                                    <input
                                                        className="w-full px-4 py-2 border border-gray-300 outline-none rounded-xl"
                                                        type="text"
                                                        placeholder="Coupon Code..."
                                                    // value={coupon}
                                                    // onChange={handleChangeCoupon}
                                                    />
                                                    <Button
                                                        title="Apply"
                                                        className="!py-2 !rounded-xl"
                                                    />
                                                </form>

                                                <Link to='/products' className='text-center md:w-auto'>
                                                    <Button
                                                        title='Continue order'
                                                        className="!py-2 !rounded-xl"
                                                    />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='h-full mx-4 mb-10 border-2 border-gray-300 border-solid rounded-2xl md:mx-0 lg:mb-0 md:w-6/12 lg:w-4/12'>
                            <div className="p-6">
                                <h4 className='mb-4 text-xl font-semibold'>Cart totals</h4>
                                <div className='flex items-center justify-between py-4 font-medium border-t border-solid border-light-gray text-dark-blue'>
                                    <span>Subtotal</span>
                                    <span className='font-semibold text-pink'>{formatMoney(totalAmount)}</span>
                                </div>
                                <div className='flex items-center justify-between py-4 font-medium border-t border-solid border-light-gray text-dark-blue'>
                                    <span>Shipping cost</span>
                                    <span className='font-semibold text-pink'>$2.00</span>
                                </div>
                                <div className='flex items-center justify-between py-4 font-medium border-t border-solid border-light-gray text-dark-blue'>
                                    <span>Total</span>
                                    <span className='font-semibold text-pink'>{formatMoney(totalMoney)}</span>
                                </div>
                                <p className='py-4 text-sm border-t border-solid border-light-gray text-dark-gray'>Taxes and shipping calculated at checkout</p>
                                <Link to='/checkout'>
                                    <Button
                                        title='Checkout'
                                        className="w-full !py-2 !rounded-xl"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="container mx-auto">
                    <div className='pt-20 mx-auto w-96 pb-80'>
                        <p className='mb-5 text-3xl text-center'>Your cart is empty.</p>
                        <Link to='/products' className='block mx-auto text-center w-52'>
                            <Button title='Return to shop' />
                        </Link>
                    </div>
                </div>
            }
        </div>
    </Helmet>
}

export default Cart