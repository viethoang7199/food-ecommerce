
import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuth from '../customHook/useAuth'
import { Outlet } from 'react-router-dom';


const ProtectedRouter = () => {

    const { currentUser } = useAuth();

    return currentUser ? <Outlet /> : <Navigate to='/sign-in' />
}

export default ProtectedRouter