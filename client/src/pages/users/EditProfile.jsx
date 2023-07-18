import { updateProfile } from 'firebase/auth';
import { collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import edit_profile_bg from '../../assets/images/background/bg_1.png';
import Button from '../../components/common/Button';
import Helmet from '../../components/Helmet';
import Loading from '../../components/Loading/AudioLoading';
import BreadCrumb from '../../components/UI/BreadCrumb';
import useAuth from '../../customHook/useAuth';
import useGetData from '../../customHook/useGetData';
import { db, storage } from '../../firebase';
import { icons } from '../../utils/icons';


const EditProfile = React.memo(() => {
    const { RiDeleteBinLine, RiUploadCloud2Line } = icons
    const [isLoading, setIsLoading] = useState(false);
    const [avtImg, setAvtImg] = useState(null);
    const { currentUser } = useAuth();
    console.log(currentUser);
    const colletionRef = collection(db, 'users');

    const { data: users } = useGetData('users')
    const abc = users.filter(item => item.uid === currentUser.uid);

    const [formValEdit, setFormValEdit] = useState({
        displayName: '',
        phoneNumber: '',
        address: '',
        birthDay: '',
    })


    const handleChangeFieldEdit = (e) => {
        const { name, value } = e.target;
        setFormValEdit({
            ...formValEdit,
            [name]: value
        })
    }

    const handleUploadImageAvt = (e) => {
        setIsLoading(true);
        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `avatar/${Date.now()}-${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const uploadProgress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(uploadProgress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setAvtImg(downloadURL);
                    setIsLoading(false);
                });
            }
        );
    };

    const handleDeleteImageAvt = () => {
        setIsLoading(true);
        const deleteRef = ref(storage, avtImg);
        deleteObject(deleteRef).then(() => {
            setAvtImg(null);
            setIsLoading(false);
        });
    }

    const handleUpdateAvt = async () => {
        setIsLoading(true)
        updateProfile(currentUser, {
            photoURL: avtImg
        })
        const profileRef = doc(colletionRef, currentUser.uid);
        updateDoc(profileRef, {
            photoURL: avtImg,
        });
        setIsLoading(false)
        toast.success("Update Avatar successfully!!!")
    }

    const infoUserUpdate = {
        displayName: currentUser?.displayName || formValEdit.displayName,
        phoneNumber: parseFloat(formValEdit.phoneNumber),
        address: formValEdit.address,
        birthDay: formValEdit.birthDay,
        lastUpdate: serverTimestamp(),
    }

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        updateProfile(currentUser, {
            displayName: currentUser?.displayName || formValEdit.displayName,
            phoneNumber: parseFloat(formValEdit.phoneNumber)
        })
            .then(() => {
                const profileRef = doc(colletionRef, currentUser.uid);
                updateDoc(profileRef, infoUserUpdate);
                setIsLoading(false)
                toast.success('Update profile successfully!')
            })
            .catch((error) => {
                toast.error(error.message)
                setIsLoading(false)
            });
    }

    return <Helmet title="Edit Profile">
        <BreadCrumb title={<span>Edit <span className="text-orange">Profile</span></span>} />
        <section
            style={{ backgroundImage: `url(${edit_profile_bg})`, }}
        >
            {isLoading && <Loading />}
            <div className="px-4 py-10 2xl:container 2xl:mx-auto lg:py-20 md:px-14 lg:px-20">
                <div className="flex justify-between gap-20">
                    {
                        abc && abc.map(info => (
                            <form className="w-3/5 p-10 border border-gray-400 rounded-lg"
                                onSubmit={handleSubmitEdit} key={info.id}
                            >
                                <div className="grid grid-cols-2 gap-10 mb-6">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full name</label>
                                        <input
                                            type="text"
                                            className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            name="displayName"
                                            placeholder={info.displayName || ''}
                                            value={info.displayName || formValEdit.displayName || ''}
                                            onChange={handleChangeFieldEdit}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder={info?.email}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-10 mb-6">
                                    <div>
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            name="phoneNumber"
                                            placeholder={info.phoneNumber || ''}
                                            value={info.phoneNumber || formValEdit.phoneNumber || ''}
                                            onChange={handleChangeFieldEdit}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="birthday" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birthday</label>
                                        <input
                                            type="date"
                                            id="birthday"
                                            className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            name="birthDay"
                                            placeholder={info?.birthDay}
                                            value={info.birthDay || formValEdit.birthDay || ''}
                                            onChange={handleChangeFieldEdit}
                                        />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="address"
                                        placeholder={info?.address}
                                        value={formValEdit.address || ''}
                                        onChange={handleChangeFieldEdit}
                                    />
                                </div>
                                <Button
                                    className="py-2 rounded-lg"
                                    title="Save"
                                />
                            </form>
                        ))
                    }

                    <div className="p-10 border border-gray-400 rounded-lg grow">
                        {!avtImg ? (
                            <>
                                <label className="flex flex-col items-center justify-center w-full h-[250px] cursor-pointer">
                                    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                                        <span className="text-gray-500 hover:text-black">
                                            <RiUploadCloud2Line size={30} />
                                        </span>
                                        <p className="text-gray-500 hover:text-black">
                                            Click here to upload
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        name="uploadimage"
                                        accept="image/*"
                                        onChange={handleUploadImageAvt}
                                        className="w-0 h-0"
                                    />
                                </label>
                            </>
                        ) : (
                            <div className="relative h-[250px]">
                                <img
                                    src={avtImg}
                                    alt="uploadedimage"
                                    className="object-contain w-[200px] h-[200px] mx-auto"
                                />
                                <Button
                                    className="absolute !p-0 w-10 h-10 text-xl transition-all duration-500 ease-in-out bg-red-500 rounded-full outline-none cursor-pointer bottom-3 right-20 hover:shadow-md"
                                    title={<span className="text-white"><RiDeleteBinLine /></span>}
                                    onClick={handleDeleteImageAvt}
                                />
                            </div>
                        )}
                        <div className="text-center">
                            <Button
                                onClick={handleUpdateAvt}
                                className="py-2 mt-5"
                                title="Update Avatar"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Helmet>
})

export default EditProfile