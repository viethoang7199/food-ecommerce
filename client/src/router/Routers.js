import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Loading from '../components/Loading/Loading';
import AboutUs from '../pages/AboutUs';
import Blog from '../pages/Blog';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Contact from '../pages/Contact';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import ProductDetail from '../pages/ProductDetail';
import Products from '../pages/Products';
import Account from '../pages/users/Account';
import EditProfile from '../pages/users/EditProfile';
import ForgotPassword from '../pages/users/ForgotPassword';
import Order from '../pages/users/Order';
import ResetPassword from '../pages/users/ResetPassword';
import SignIn from '../pages/users/SignIn';
import SignUp from '../pages/users/SignUp';
import ProtectedRouter from './ProtectedRouter';

const Routers = () => {
    return <Routes>
        <Route path='' element={<Home />} />
        <Route path='*' element={<NotFound />} />
        <Route path='products' element={<Products />} />
        <Route path='products/:id' element={<ProductDetail />} />
        <Route path='products/category/:category' element={<Products />} />
        <Route path='about' element={<AboutUs />} />
        <Route path='contact' element={<Contact />} />
        <Route path='blog' element={<Blog />} />
        <Route path='cart' element={<Cart />} />

        <Route path='/*' element={<ProtectedRouter />}>
            <Route path='checkout' element={<Checkout />} />
        </Route>

        <Route path='my-order' element={<Order />} />
        {/* <Route path='loading' element={<Loading />} /> */}
        <Route path='account' element={<Account />} />
        <Route path='edit-profile' element={<EditProfile />} />


        <Route path='sign-in' element={<SignIn />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='reset-password' element={<ResetPassword />} />


    </Routes>
}

export default Routers