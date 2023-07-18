import { confirmPasswordReset } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import rs_bg from '../../assets/images/background/subscribe_bg_1.png';
import Button from '../../components/common/Button';
import Helmet from '../../components/Helmet';
import Loading from '../../components/Loading/AudioLoading';
import { auth } from '../../firebase';
import isEmpty from 'validator/lib/isEmpty';
import { icons } from '../../utils/icons';

const useQuery = () => {
    const location = useLocation();
    return new URLSearchParams(location.search)
}

function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword)
}

const ResetPassword = () => {
    const { RiEyeOffLine, RiEyeLine } = icons
    const query = useQuery();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [validationMsg, setValidationMsg] = useState('');
    const [type, setType] = useState('password');
    const [eye, setEye] = useState(<RiEyeOffLine />);

    const [formNewPass, setFormNewPass] = useState({
        password: '',
        cPassword: ''
    })

    const validateAll = () => {
        let msg = {}
        if (isEmpty(formNewPass.password)) {
            msg.password = 'Please fill in this field'
        }
        if (isEmpty(formNewPass.cPassword)) {
            msg.cPassword = 'Please fill in this field'
        }
        setValidationMsg(msg)

        if (Object.keys(msg).length > 0) {
            return false
        } else {
            return true
        }
    }

    const handleChangeNewPassword = (e) => {
        const { name, value } = e.target;
        setFormNewPass({
            ...formNewPass,
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

    const changePassword = (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) {
            return
        }
        setIsLoading(true)
        setTimeout(() => {
            resetPassword(query.get('oobCode'), formNewPass.password)
                .then(res => {
                    setIsLoading(false)
                    toast.success('Change password successfully!')
                    navigate('/sign-in')
                })
                .catch(error => {
                    setIsLoading(false)
                    toast.error(error.message)
                })
        }, 3000);
    }

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return <Helmet title="Reset Password">
        <section className="bg-white bg-no-repeat bg-cover h-[500px]"
            style={{ backgroundImage: `url(${rs_bg})`, }}
        >
            {isLoading && <Loading />}
            <div className="px-4 py-10 2xl:container 2xl:mx-auto lg:py-20 md:px-14 lg:px-20">
                <div className="flex items-center justify-center">
                    <div className="w-full p-6 bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md dark:border-gray-700 sm:p-8">
                        <h2 className="mb-5 text-xl font-bold leading-tight tracking-tight text-center md:text-3xl">
                            New Password
                        </h2>
                        <form onSubmit={changePassword}
                        >
                            <div className='relative mb-5'>
                                <input
                                    type={type}
                                    className='w-full px-4 py-2 border border-gray-400 outline-none rounded-xl'
                                    placeholder="New Password"
                                    name='password'
                                    value={formNewPass.password}
                                    onChange={handleChangeNewPassword}
                                />
                                <span
                                    className="absolute z-10 cursor-pointer top-2 right-2"
                                    onClick={handleTogglePassword}
                                >{eye}</span>
                                <p className='mt-1 ml-2 text-left text-pink'>{validationMsg.password}</p>
                                <p className='mt-1 ml-2 text-left text-pink'>{validationMsg.password}</p>
                            </div>
                            <div className='relative mb-5'>
                                <input
                                    type={type}
                                    className='w-full px-4 py-2 border border-gray-400 outline-none rounded-xl'
                                    placeholder="Confirm Password"
                                    name='cPassword'
                                    value={formNewPass.cPassword}
                                    onChange={handleChangeNewPassword}
                                />
                                <span
                                    className="absolute z-10 cursor-pointer top-2 right-2"
                                    onClick={handleTogglePassword}
                                >{eye}</span>
                                <p className='mt-1 ml-2 text-left text-pink'>{validationMsg.password}</p>
                                <p className='mt-1 ml-2 text-left text-pink'>{validationMsg.cPassword}</p>
                            </div>
                            <div className='text-center'>
                                <Button title='Change' className='py-2 rounded-xl' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </Helmet>;
};

export default ResetPassword;