import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import fp_bg from '../../assets/images/background/bg_1.png'
import Helmet from '../../components/Helmet';
import Loading from '../../components/Loading/AudioLoading';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [validationMsg, setValidationMsg] = useState('');

    const validateAll = () => {
        let msg = {}
        if (isEmpty(email)) {
            msg.email = 'Please fill in this field'
        } else if (!isEmail(email)) {
            msg.email = 'Invalid Email'
        }

        setValidationMsg(msg)

        if (Object.keys(msg).length > 0) {
            return false
        } else {
            return true
        }
    }

    const handleResetPassword = (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) {
            return
        }
        setIsLoading(true)
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false)
                toast.success('An email has been sent, please check your email');
                setEmail("")
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false)
            });
    }

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return <Helmet title="Forgot Password">
        <section className='bg-background'
            style={{ backgroundImage: `url(${fp_bg})`, }}
        >
            {isLoading && <Loading />}
            <div className="px-4 py-10 2xl:container 2xl:mx-auto lg:py-20 md:px-14 lg:px-20">
                <div className="flex justify-center">
                    <div className="flex w-full xl:w-3/4 lg:w-11/12">
                        <div className="hidden w-full h-auto bg-cover rounded-r-none shadow-2xl lg:block lg:w-1/2 rounded-xl">
                            <img className='rounded-r-none rounded-xl' src="https://img.freepik.com/premium-vector/forgot-password-concept-isolated-white_263070-194.jpg" alt="" />
                        </div>
                        <div className="w-full p-5 shadow-2xl lg:w-1/2 bg-background rounded-xl lg:rounded-l-none">
                            <div className="px-8 mb-4 text-center">
                                <h3 className="pt-4 mb-2 text-[28px] font-bold">Forgot Your Password?</h3>
                                <p className="mb-4 text-sm text-dark-gray">
                                    We get it, stuff happens. Just enter your email address below and we'll send you a
                                    link to reset your password!
                                </p>
                            </div>
                            <form className="px-8 pt-6 pb-8 mb-4"
                                onSubmit={handleResetPassword}
                            >
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-bold text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 leading-tight text-gray-700 !border-dark-gray border rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="Enter Email Address..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <p className='mt-1 ml-2 text-left text-pink'>{validationMsg.email}</p>
                                </div>
                                <div className="mb-6 text-center">
                                    <Button
                                        className="w-full py-2 text-white rounded-lg"
                                        title='Reset Password'
                                    />
                                </div>
                            </form>

                            <hr className="mb-6 border-t" />
                            <div className="text-center">
                                <Link to='/sign-up'
                                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                >
                                    Create an Account!
                                </Link>
                            </div>
                            <div className="text-center">
                                <Link to='/sign-in'
                                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                >
                                    Already have an account? Login!
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Helmet>
};

export default ForgotPassword;