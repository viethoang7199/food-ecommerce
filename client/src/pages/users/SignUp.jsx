import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import isEmpty from 'validator/lib/isEmpty';
import bg_img from '../../assets/images/background/bg_1.png';
import Button from '../../components/common/Button';
import Helmet from '../../components/Helmet';
import { auth, db } from '../../firebase';
import isEmail from 'validator/lib/isEmail';
import Loading from "../../components/Loading/AudioLoading";
import isLength from 'validator/lib/isLength';
import { icons } from "../../utils/icons";

const SignUn = () => {
    const { RiEyeOffLine, RiEyeLine, RiGoogleFill } = icons;
    const [type, setType] = useState('password');
    const [eye, setEye] = useState(<RiEyeOffLine />);
    const [isLoading, setIsLoading] = useState(false);
    const [validationMsg, setValidationMsg] = useState('');
    const navigate = useNavigate();
    const [formValSignUp, setFormValSignUp] = useState({
        fullName: '',
        email: '',
        password: '',
    })

    const handleChangeFieldSignUp = (e) => {
        const { name, value } = e.target;
        setFormValSignUp({
            ...formValSignUp,
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

    const validateAll = () => {
        let msg = {}
        if (isEmpty(formValSignUp.fullName)) {
            msg.fullName = 'The full name field is required'
        }
        if (isEmpty(formValSignUp.email)) {
            msg.email = 'Please fill in this field'
        } else if (!isEmail(formValSignUp.email)) {
            msg.email = 'Please enter a valid email address.'
        }
        if (isEmpty(formValSignUp.password)) {
            msg.password = 'The full name field is required'
        } else if (!isLength(formValSignUp.password, { min: 6 })) {
            msg.password = 'Password must have 6 characters'
        }
        setValidationMsg(msg)

        if (Object.keys(msg).length > 0) {
            return false
        } else {
            return true
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) {
            return
        }
        setIsLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formValSignUp.email,
                formValSignUp.password
            );
            const user = userCredential.user;
            await updateProfile(user, {
                displayName: formValSignUp.fullName,
            });
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName: formValSignUp.fullName,
                email: formValSignUp.email,
                createdAt: serverTimestamp(),
            })
            setIsLoading(false);
            toast.success("Account created successfully!");
            navigate("/sign-in")
        } catch (error) {
            toast.error(error.message)
            setIsLoading(false);
        }
    }

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return <Helmet title='Sign Up'>
        <section className="h-full bg-white"
            style={{ backgroundImage: `url(${bg_img})`, }}
        >
            {isLoading && <Loading />}
            <div className="px-4 py-10 2xl:container 2xl:mx-auto lg:py-20 md:px-14 lg:px-20">
                <div className="m-auto md:w-3/4">
                    <div className="px-10 py-10 mx-auto bg-white shadow-2xl mt-14 lg:mt-0 lg:w-4/5 xl:w-3/5 rounded-xl">
                        <form
                            onSubmit={handleSignUp}
                        >
                            <div className='pb-10 text-center'>
                                <h4 className='mb-2 text-5xl font-bold md:text-6xl text-pink font-lobster'>Create Account</h4>
                                <p className='text-sm text-dark-gray'>Sign up by entering the information below</p>
                            </div>
                            <div className='mb-5 text-center'>
                                <input
                                    type='text'
                                    className='w-full px-4 py-2 border border-gray-400 rounded-md outline-none'
                                    placeholder="Full Name"
                                    name='fullName'
                                    value={formValSignUp.fullName}
                                    onChange={handleChangeFieldSignUp}
                                />
                                <p className='mt-1 ml-2 text-left text-pink'>{validationMsg.fullName}</p>
                            </div>
                            <div className='mb-5 text-center'>
                                <input
                                    type='text'
                                    className='w-full px-4 py-2 border border-gray-400 rounded-md outline-none'
                                    placeholder="Email"
                                    name='email'
                                    value={formValSignUp.email}
                                    onChange={handleChangeFieldSignUp}
                                />
                                <p className='mt-1 ml-2 text-left text-pink'>{validationMsg.email}</p>
                            </div>
                            <div className='relative mb-5 text-center'>
                                <input
                                    type={type}
                                    className='w-full py-2 pl-4 pr-8 border border-gray-400 rounded-md outline-none'
                                    placeholder="Password"
                                    name='password'
                                    value={formValSignUp.password}
                                    onChange={handleChangeFieldSignUp}
                                />
                                <span
                                    className="absolute z-10 cursor-pointer top-2/4 -translate-y-2/4 right-2"
                                    onClick={handleTogglePassword}
                                >{eye}</span>
                                <p className='mt-1 ml-2 text-left text-pink'>{validationMsg.password}</p>
                            </div>
                            <div className='mb-5 text-center'>
                                <Button
                                    title='SIGN UP'
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
                            <Link to='/sign-in'
                                className='font-bold text-pink hover:underline hover:text-pink'>
                                <span>Sign In</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Helmet>
};

export default SignUn;