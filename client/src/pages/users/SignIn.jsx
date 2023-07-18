import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import bg_img from '../../assets/images/background/bg_1.png';
import Button from '../../components/common/Button';
import InputText from '../../components/common/InputText';
import Helmet from '../../components/Helmet';
import Loading from '../../components/Loading/AudioLoading';
import { auth } from '../../firebase';
import { authSlice } from '../../store/slices/authSlice';
import { icons } from '../../utils/icons';

const SignIn = () => {
    const { RiEyeOffLine, RiEyeLine, RiGoogleFill } = icons;
    const [type, setType] = useState('password');
    const [isLoading, setIsLoading] = useState(false);
    const [eye, setEye] = useState(<RiEyeOffLine />);
    const [validationMsg, setValidationMsg] = useState('');

    const dispatch = useDispatch();

    const [formValSignIn, setFormValSignIn] = useState({
        email: '',
        password: '',
    })

    const validateAll = () => {
        let msg = {}
        if (isEmpty(formValSignIn.email)) {
            msg.email = 'Please fill in this field'
        } else if (!isEmail(formValSignIn.email)) {
            msg.email = 'Invalid Email'
        }
        if (isEmpty(formValSignIn.password)) {
            msg.password = 'Please fill in this field'
        }
        setValidationMsg(msg)

        if (Object.keys(msg).length > 0) {
            return false
        } else {
            return true
        }
    }

    const handleChangeFieldSignIn = (e) => {
        const { name, value } = e.target;
        setFormValSignIn({
            ...formValSignIn,
            [name]: value
        })
    }

    const handleTogglePassword = () => {
        if (type === 'password') {
            setEye(<RiEyeLine />)
            setType('text')
        } else {
            setEye(<RiEyeOffLine />)
            setType('password')
        }
    }

    const navigate = useNavigate();


    const handleSubmitSignIn = async (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) {
            return
        }
        setIsLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formValSignIn.email, formValSignIn.password);
            const user = userCredential.user;
            console.log(user);
            dispatch(
                authSlice.actions.SET_USER({
                    email: user.email,
                    fullName: user.displayName,
                    userId: user.uid
                })
            )
            setIsLoading(false);
            toast.success('Sign in successfully!')
            navigate(-1)
        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return <Helmet title='Sign In'>
        <section className="h-full bg-white"
            style={{ backgroundImage: `url(${bg_img})`, }}
        >
            {isLoading && <Loading />}
            <div className="px-4 py-10 2xl:container 2xl:mx-auto lg:py-20 md:px-14 lg:px-20">
                <div className="m-auto sm:w-3/4">
                    <div className="px-10 py-10 mx-auto bg-white shadow-2xl mt-14 lg:mt-0 lg:w-4/5 xl:w-3/5 rounded-xl">
                        <form
                            onSubmit={handleSubmitSignIn}
                        >
                            <div className='pb-10 text-center'>
                                <h4 className='text-5xl font-bold md:text-6xl text-pink font-lobster'>Welcome</h4>
                                <p className='text-sm text-dark-gray'>Sign in by entering the information below</p>
                            </div>
                            <div className='mb-5 text-center'>
                                <InputText
                                    type='text'
                                    className='w-full px-4 py-2 border border-gray-400 rounded-md outline-none'
                                    placeholder="Email"
                                    name='email'
                                    value={formValSignIn.email}
                                    onChange={handleChangeFieldSignIn}
                                    autoComplete="email"
                                />
                                <p className='mt-1 ml-2 text-left text-pink'>{validationMsg.email}</p>
                            </div>
                            <div className='relative mb-3 text-center'>
                                <InputText
                                    type={type}
                                    className='w-full px-4 py-2 border border-gray-400 rounded-md outline-none'
                                    placeholder="Password"
                                    name='password'
                                    autoComplete="current-password"
                                    value={formValSignIn.password}
                                    onChange={handleChangeFieldSignIn}
                                />

                                <span
                                    className="absolute z-10 cursor-pointer top-2/4 -translate-y-2/4 right-2"
                                    onClick={handleTogglePassword}
                                >
                                    {eye}
                                </span>
                                <p className='mt-1 ml-2 text-left text-pink'>{validationMsg.password}</p>
                            </div>

                            <div className='mb-5'>
                                <Link to='/forgot-password' className='block font-medium text-right text-dark-blue hover:text-pink hover:underline'>Forgot Password?</Link>
                            </div>

                            <div className='mb-5 text-center'>
                                <Button
                                    title='SIGN IN'
                                    type='submit'
                                    className='w-full !py-2 text-xl md:w-3/4 rounded-2xl'
                                />
                            </div>
                            <hr />
                        </form>
                        <div className="my-5">
                            <p className='text-xl text-center !text-black mb-1'>Or</p>
                            <div className='text-center'>
                                <Button
                                    type="submit"
                                    className='w-full md:w-3/4 !p-[2px] bg-blue-500 text-white rounded lg:text-base 2xl:text-xl hover:!bg-blue-500'
                                    // onClick={signInWithGoogle}
                                    title={<span className="flex items-center justify-center">
                                        <span className="flex items-center justify-center w-10 h-10 text-white rounded">
                                            <RiGoogleFill size={30} />
                                        </span>
                                        <span>Sign In with Google</span>
                                    </span>}
                                />
                            </div>
                        </div>
                        <div className='pt-3 text-base text-center border-t border-dark-gray'>Don't have an account?&nbsp;
                            <Link to='/sign-up'
                                className='font-bold text-pink hover:underline hover:text-pink'>
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Helmet>
};

export default SignIn;