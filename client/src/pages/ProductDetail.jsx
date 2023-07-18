
import { arrayUnion, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import moment from 'moment/moment';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Helmet from '../components/Helmet';
import Loading from '../components/Loading/AudioLoading';
import BreadCrumb from '../components/UI/BreadCrumb';
import Pagination from '../components/UI/Pagination';
import ProductsListSlide from '../components/UI/ProductsListSlide';
import Star from '../components/UI/Star';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import InputTextArea from '../components/common/InputTextArea';
import useAuth from '../customHook/useAuth';
import useGetData from '../customHook/useGetData';
import { db } from '../firebase';
import { cartSlice } from '../store/slices/cartSlice';
import { formatMoney } from '../utils/formatMoney';
import { icons } from '../utils/icons';

const ProductDetail = () => {
    const { HiChevronUp, HiChevronDown, MdAddShoppingCart, RiCalendar2Line, RiStarLine, RiStarFill, RiPencilFill, AiOutlineUser } = icons
    const [tabs, setTabs] = useState('desc');
    const { id } = useParams();
    const [rating, setRating] = useState(5)
    const [hoverRating, setHoverRating] = useState(null)
    const dispatch = useDispatch();
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false)

    const [product, setProduct] = useState({})

    const { data: products } = useGetData('products')

    // const { data: userOrders } = useGetData('orders')
    const { data: userOrders } = useGetData('orders')

    const docRef = doc(db, 'products', id)

    useEffect(() => {
        const getProduct = async () => {
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setProduct(docSnap.data())
            } else {
                console.log('no product!');
            }
        }
        getProduct()
    }, [])


    const { imageURL, productName, price, category, reviews, discounted, description } = product;
    const related = products.filter(item => item.category === category);

    const [quantity, setQuantity] = useState(1);

    const numberQty = parseFloat(quantity)

    const handleAddToCart = (item) => {
        setIsLoading(true)
        setTimeout(() => {
            dispatch(
                cartSlice.actions.ADD_ITEM({
                    id: item.id,
                    productName: item.productName,
                    price: item.price,
                    discounted: item.discounted,
                    imageURL: item.imageURL,
                    category: item.category,
                    quantity: numberQty,
                })
            )
            toast.success(`"${item.productName}" has been added to cart!`)
            setIsLoading(false)
        }, 1500);
        setQuantity(1)
    }

    const [formReview, setFormReview] = useState({
        name: '',
        content: ''
    })

    const handleChangeFieldsReview = (e) => {
        const { name, value } = e.target;
        setFormReview({
            ...formReview,
            [name]: value
        })
    }

    const colletionRef = collection(db, 'products');

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const reviews = {
            id: nanoid(),
            name: formReview.name,
            rating,
            content: formReview.content,
            dateTime: moment().format('MMMM DD, YYYY, h:mm a'),
        };
        try {
            const profileRef = doc(colletionRef, id);
            updateDoc(profileRef, {
                reviews: arrayUnion(reviews)
            });
            toast.success('Send reviews successfully!')
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
        }
        setFormReview({
            name: '',
            content: ''
        })
    }

    const sum = reviews?.reduce((accumulator, object) => {
        return accumulator + object.rating;
    }, 0);

    const avgRating = sum / reviews?.length;

    const [readMore, setReadMore] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(3);

    const indexOfLastProduct = currentPage * reviewsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - reviewsPerPage;
    const currentReviews = reviews?.slice(indexOfFirstProduct, indexOfLastProduct);

    // useEffect(() => {
    //     window.scroll(0, 0)
    // }, [])


    return <Helmet title={productName}>
        <>
            <BreadCrumb title={<span className='text-orange'>{productName}</span>} name={productName} />
            <div className="h-full">
                {isLoading && <Loading />}
                <div className="px-4 py-10 2xl:container 2xl:mx-auto lg:py-16 md:px-14 lg:px-20">
                    <div className='grid-cols-2 gap-6 px-4 mb-20 lg:grid md:px-6 lg:px-0'>
                        <div className='p-4 mx-auto mb-10 border border-gray-300 rounded-lg md:p-12 md:w-full lg:mb-0'>
                            <img className='rounded-2xl h-[315px] object-contain m-auto' src={imageURL} alt={productName} />
                        </div>
                        <div className='px-4 md:px-8'>
                            <p className='mb-4 text-xl font-medium text-gray-600 capitalize'>{category}</p>

                            <h2 className='mb-3 text-4xl font-bold capitalize'>{productName}</h2>
                            <div className='flex items-center mb-3'>
                                <Star stars={avgRating} />
                                <div>
                                    {
                                        avgRating
                                            ?
                                            <span className='ml-3 text-gray-700'>{`(${avgRating.toFixed(2)})`}</span>
                                            :
                                            <span className="ml-3">{`(No reviews)`}</span>
                                    }
                                </div>
                            </div>
                            <div className='mb-1'>
                                {discounted ? <>
                                    <div className="flex items-center gap-2">
                                        <p className="text-black font-medium text-[38px]">
                                            {formatMoney(discounted)}
                                        </p>
                                        <p className="flex flex-col">
                                            <span className="text-sm font-medium uppercase text-pink">
                                                ({Math.ceil(((price - discounted) / price) * 100)}%) off
                                            </span>
                                            <span className="text-gray-400 font-medium text-[16px] line-through">
                                                {formatMoney(price)}
                                            </span>
                                        </p>
                                    </div>
                                </>
                                    : <span className="text-black font-medium text-[38px]">
                                        {formatMoney(price)}
                                    </span>
                                }
                            </div>

                            <div className='mb-5'>
                                <p>{description?.substr(0, 150)}</p>
                            </div>

                            <div className='flex items-center gap-10 mb-7'>
                                <div className='flex items-center border border-gray-400 w-[120px] rounded-md relative'>
                                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="py-2 outline-none flex text-center rounded-l-md border-r border-gray-400 w-[60px] h-[50px]" />
                                    <div className="relative w-full">
                                        <Button
                                            className='!text-black !p-0 !bg-transparent rounded hover:!bg-transparent absolute right-4 bottom-0'
                                            onClick={() => setQuantity(quantity + 1)}
                                            title={<span><HiChevronUp size={24} /></span>}
                                        />
                                        <Button
                                            className={`!p-0 !bg-transparent rounded hover:!bg-transparent absolute right-4 top-0 ${quantity <= 1 ? "!text-gray-400" : "!text-black"}`}
                                            onClick={() => setQuantity(quantity - 1)}
                                            disabled={quantity <= 1 ? true : false}
                                            title={<HiChevronDown size={24} />}
                                        />
                                    </div>
                                </div>
                                <Button
                                    className="px-4 !py-0 h-[50px] !rounded-lg"
                                    title={<span className="flex items-center gap-1"><MdAddShoppingCart /> <span>Add to cart</span></span>}
                                    onClick={() => handleAddToCart(product)}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='flex items-center justify-center gap-5 mb-10'>
                            <div className={`w-36 md:w-52 lg:w-72 xl:w-96 text-center border border-black py-2 text-lg font-medium rounded-2xl cursor-pointer hover:bg-black hover:text-white transition-all duration-500 ease-in-out ${tabs === 'desc' ? 'bg-pink text-white border-none' : ''}`}
                                onClick={() => setTabs('desc')}>
                                Description
                            </div>
                            <div className={`w-36 md:w-52 lg:w-72 xl:w-96 text-center border border-black py-2 text-lg font-medium rounded-2xl cursor-pointer hover:bg-black hover:text-white transition-all duration-500 ease-in-out ${tabs === 'review' ? 'bg-pink text-white border-none' : ''}`}
                                onClick={() => setTabs('review')}>
                                <span>Review&nbsp;</span>
                                <span>{reviews?.length ? <span>{`(${reviews?.length})`}</span> : ''}</span>
                            </div>
                        </div>
                        <hr />
                        <div className='px-4 pt-10 md:px-8 lg:px-0'>
                            {tabs === 'desc'
                                ?
                                <p className='w-full lg:w-3/4 px-4 lg:px-8 !text-black mx-auto mb-8'>{description}</p>
                                :
                                <div className='w-full m-auto'>
                                    <div className="border border-gray-400 rounded-lg max-w-max min-w-[800px] lg:mx-auto lg:flex gap-14">
                                        <div className="w-full py-5 ml-5">
                                            <h3 className='inline-block mb-5 text-3xl font-medium border-b border-gray-400'>Customer reviews</h3>
                                            {
                                                reviews && reviews?.length >= 1
                                                    ?
                                                    currentReviews?.map((item) => (
                                                        <div className='p-5 border-b border-gray-400'
                                                            key={item.id}>
                                                            <p className='mb-2 text-xl font-medium capitalize text-dark-blue'>{item.name}</p>
                                                            <p className='flex items-center gap-2 mb-2 text-gray-500'>
                                                                <span><RiCalendar2Line /></span>
                                                                <span>{item.dateTime}</span>
                                                            </p>
                                                            <p className='flex items-center gap-2 mb-5'>
                                                                <span><Star stars={item.rating} /> </span>
                                                                <span>({item.rating?.toFixed(2)})</span>
                                                            </p>
                                                            <div className='w-[700px]'>
                                                                {readMore
                                                                    ?
                                                                    <span className='text-gray-800'>{item.content}</span>
                                                                    :
                                                                    <span className='text-gray-800'>{item.content.substr(0, 100)}</span>
                                                                }
                                                                {
                                                                    item.content.length > 100
                                                                        ?
                                                                        <span className='font-medium text-gray-800 cursor-pointer' onClick={() => setReadMore(!readMore)}>
                                                                            {readMore ? " Hide away" : "... Read more"}
                                                                        </span>
                                                                        :
                                                                        ''
                                                                }
                                                            </div>
                                                        </div>
                                                    ))
                                                    :
                                                    <p>No reviews</p>
                                            }
                                            <Pagination totalItem={reviews?.length} perPage={reviewsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                                        </div>
                                        {
                                            userOrders
                                        }
                                        <form className='w-full p-5 mt-10 lg:mt-0'
                                            onSubmit={handleSubmitReview}
                                        >
                                            <h3 className='inline-block mb-5 text-3xl font-medium border-b border-gray-400'>Add a review</h3>
                                            <div className='flex items-center mb-5 text-2xl'>
                                                {
                                                    [...Array(5)].map((star, index) => {
                                                        const valueRating = index + 1;
                                                        return (
                                                            <label key={index}>
                                                                <input
                                                                    className='hidden'
                                                                    type='radio'
                                                                    name='rating'
                                                                    value={valueRating}
                                                                    onClick={() => setRating(valueRating)}
                                                                />
                                                                <span className="cursor-pointer"
                                                                    onMouseEnter={() => setHoverRating(valueRating)}
                                                                    onMouseLeave={() => setHoverRating(null)}
                                                                >
                                                                    {
                                                                        valueRating <= (hoverRating || rating)
                                                                            ?
                                                                            <span className="text-orange"><RiStarFill /></span>
                                                                            :
                                                                            <span className="text-orange"><RiStarLine /></span>
                                                                    }
                                                                </span>
                                                            </label>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className='relative mb-5'>
                                                <InputText
                                                    type='text'
                                                    className='w-full pr-14 py-2 px-4 rounded-xl border !border-dark-gray'
                                                    placeholder='Your name'
                                                    name='name'
                                                    value={formReview.name}
                                                    onChange={handleChangeFieldsReview}
                                                />
                                                <span className="absolute top-2/4 -translate-y-2/4 right-4"><AiOutlineUser size={20} /></span>
                                            </div>
                                            <div className='relative mb-5'>
                                                <InputTextArea
                                                    className='w-full py-2 px-4 border !border-dark-gray'
                                                    placeholder='Write a Message'
                                                    name='content'
                                                    value={formReview.content}
                                                    onChange={handleChangeFieldsReview}
                                                />
                                                <span className="absolute top-4 right-4"><RiPencilFill size={20} /></span>
                                            </div>
                                            <div className='mt-5 text-center'>
                                                <Button className="py-2 rounded-lg" title='Post review' />
                                            </div>
                                        </form>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
                <div className='px-4 py-10 md:px-8 lg:px-0 bg-background'>
                    <div className='text-center'>
                        <h3 className='mb-4 text-3xl font-bold md:text-4xl xl:text-5xl'>Related Products</h3>
                        <p className='w-full lg:w-3/5 xl:w-2/5 mx-auto !text-black'>Objectively pontificate quality models before intuitive information. Dramatically recaptiualize multifunctional materials.</p>
                    </div>
                    <div className='w-5/6 py-4 mx-auto related'>
                        <ProductsListSlide data={related} />
                    </div>
                </div>
            </div>
        </>
    </Helmet>
};

export default ProductDetail;