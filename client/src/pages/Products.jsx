import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import notFound_img from '../assets/images/404/NotFound.svg';
import Button from '../components/common/Button';
import Overlay from '../components/common/Overlay';
import Helmet from '../components/Helmet';
import BreadCrumb from '../components/UI/BreadCrumb';
import Pagination from '../components/UI/Pagination';
import ProductList from '../components/UI/ProductsList';
import useGetData from '../customHook/useGetData';
import { db } from "../firebase";
import { icons } from "../utils/icons";

const sortOptions = [
    { name: 'Name: A to Z', type: 'nameAz' },
    { name: 'Name: Z to A', type: 'nameZa' },
    { name: 'Price: Low to High', type: 'priceLowest' },
    { name: 'Price: High to Low', type: 'priceHighest' },
]

export const subCategories = [
    // { name: 'All products', type: 'all-products' },
    { name: 'Pizza', type: 'pizza' },
    { name: 'Hamburger', type: 'hamburger' },
    { name: 'Salad', type: 'salad' },
    { name: 'Spaghetti', type: 'spaghetti' },
]

const Product = () => {
    const { HiChevronDown, RiFilterLine, AiOutlineClose } = icons
    const { data: products } = useGetData('products')
    const productsData = products
    const [productList, setProductList] = useState(productsData);
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(12);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [sortDisplay, setSortDisplay] = useState(false);
    const [filterByCategory, setFilterByCategory] = useState('all');
    const [sortProducts, setSortProducts] = useState('')
    const [priceRange, setPriceRange] = useState(0)
    const [stickyFilter, setStickyFilter] = useState(false);

    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProduct = productList.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "products"), (snapShot) => {
            let commit = [];
            try {
                snapShot.docs.forEach((doc) =>
                    commit.push({ id: doc.id, ...doc.data() })
                );
                setProductList(commit);
            } catch (error) {
                console.log(error);
            }
        });

        return () => unsub();
    }, [])

    useEffect(() => {
        const stickyFilter = () => {
            if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
                setStickyFilter(true)
            } else {
                setStickyFilter(false)
            }
        }

        window.addEventListener("scroll", stickyFilter)

        return () => window.removeEventListener("scroll", stickyFilter)
    }, [])

    useEffect(() => {
        if (filterByCategory === 'all') {
            setProductList(productsData);
        }
        if (filterByCategory === 'pizza') {
            const filtered = productsData.filter(item => item.category === 'pizza')
            setProductList(filtered)
            window.scroll(0, 550)

        }
        if (filterByCategory === 'hamburger') {
            const filtered = productsData.filter(item => item.category === 'hamburger')
            setProductList(filtered)
            window.scroll(0, 550)

        }
        if (filterByCategory === 'salad') {
            const filtered = productsData.filter(item => item.category === 'salad')
            setProductList(filtered)
            window.scroll(0, 550)

        }
        if (filterByCategory === 'spaghetti') {
            const filtered = productsData.filter(item => item.category === 'spaghetti')
            setProductList(filtered)
            window.scroll(0, 550)

        }
        if (filterByCategory === 'drink') {
            const filtered = productsData.filter(item => item.category === 'drink')
            setProductList(filtered)
            window.scroll(0, 550)

        }

        if (sortProducts === 'nameAz') {
            const nameAz = [...productsData].sort((a, b) =>
                a.productName.toLowerCase() > b.productName.toLowerCase() ? 1 : -1,
            );
            setProductList(nameAz)
        }
        if (sortProducts === 'nameZa') {
            const nameZa = [...productsData].sort((a, b) =>
                a.productName.toLowerCase() > b.productName.toLowerCase() ? -1 : 1,
            );
            setProductList(nameZa)
        }
        if (sortProducts === 'priceLowest') {
            const priceLowest = [...productsData].sort((a, b) => a.price - b.price);
            setProductList(priceLowest)
        }
        if (sortProducts === 'priceHighest') {
            const priceHighest = [...productsData].sort((a, b) => b.price - a.price);
            setProductList(priceHighest)
        }
    }, [filterByCategory, sortProducts, productsData])

    useEffect(() => {
        if (priceRange === 0) {
            setProductList(productsData)
        } else {
            const filteredPrice = productsData.filter(item => item.price >= Math.max(priceRange))
            setProductList(filteredPrice)
        }
    }, [priceRange, productsData])

    mobileFiltersOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = 'auto';

    const handleChangeFilterPrice = (e) => {
        setPriceRange(e.target.value)
    }

    const handleSearchProducts = (e) => {
        const searchProduct = e.target.value;
        const searchedProduct = productsData.filter(item => item.productName?.toLowerCase().includes(searchProduct?.toLowerCase()) || item.category?.toLowerCase().includes(searchProduct?.toLowerCase()))
        setProductList(searchedProduct)
    }

    const navigate = useNavigate();

    const handleClearFilter = (e) => {
        e.preventDefault();
        setFilterByCategory()
        setSortProducts('')
        setPriceRange(0)
        setProductList(productsData)
        navigate('/products')
    }

    // useEffect(() => {
    //     window.scroll(0, 0)
    // }, [])

    return (
        <Helmet title='Shop'>
            <BreadCrumb title='Shop' />
            <div className="bg-white">
                <div>
                    <Overlay
                        className={mobileFiltersOpen ? 'block' : 'hidden'}
                        onClick={() => setMobileFiltersOpen(false)}
                    />
                </div>
                <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-5 px-4 py-6 mt-16 shadow-xl md:flex-row">
                        <div className='text-lg font-medium'>
                            {/* Showing {currentPage} - {productPerPage} of {productsData.length} products */}
                            {productList.length} Products Available
                        </div>
                        <div className='mx-16 grow lg:mx-24'>
                            <input
                                type='search'
                                className='border !border-gray-400 rounded-md py-1 px-4 outline-none w-full'
                                placeholder='Search...'
                                onChange={handleSearchProducts}
                            />
                        </div>
                        <div className="flex items-center">
                            <div className="relative inline-block text-left">
                                <div className="inline-flex items-center justify-center px-4 text-lg font-medium text-gray-700 cursor-pointer hover:text-gray-900"
                                    onClick={() => setSortDisplay(!sortDisplay)}
                                >
                                    <span>Sort</span>
                                    <span className="flex-shrink-0 w-5 h-5 ml-1 -mr-1"><HiChevronDown /></span>
                                </div>
                                <ul className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-gray-200 rounded-md shadow-2xl ">
                                    {sortOptions.map((item, index) => (
                                        <li
                                            key={index}
                                            className={`px-4 py-3 min-w-max ${sortDisplay ? 'block' : 'hidden'}`}
                                            onClick={() => {
                                                setSortProducts(item.type)
                                                setSortDisplay(false)
                                            }}
                                        >
                                            <span className='cursor-pointer'>{item.name}</span>
                                            <hr className='border-gray-400' />
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button
                                type="button"
                                className="-m-2 ml-4 p-2 !text-black hover:!text-gray-500 sm:ml-6 lg:hidden !bg-transparent"
                                onClick={() => setMobileFiltersOpen(true)}
                                title={<span className="w-5 h-5"><RiFilterLine size={24} /></span>}
                            />
                        </div>
                    </div>
                    <hr />
                    <section className="pt-6 pb-24">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className={`p-4 lg:col-span-1 fixed lg:relative top-0 right-0 z-50 lg:z-0 w-3/4 lg:w-full h-full lg:h-full shadow-xl translate-x-full lg:translate-x-0 bg-white transition-all duration-500 ease-in-out ${mobileFiltersOpen ? '!translate-x-0 overflow-y-auto transition-all duration-500 ease-in-out' : ''}`}>
                                <div className='flex items-center justify-between lg:hidden'>
                                    <h3 className='p-4 text-2xl'>Filter</h3>
                                    <span className="cursor-pointer"
                                        onClick={() => setMobileFiltersOpen(false)}>
                                        <span className="w-6 h-6 mx-4"><AiOutlineClose /></span>
                                    </span>
                                </div>
                                <hr className='block lg:hidden' />
                                <div className={`${stickyFilter ? "sticky top-20" : ""}`}>

                                    <h3 className="px-4 pt-8 pb-2 text-2xl font-medium">Categories</h3>
                                    <div className="pb-6 text-sm font-medium text-gray-900 border-b border-gray-200">
                                        {subCategories.map((item, index) => (
                                            <Link to={`/products/category/${item.type}`}
                                                key={index}
                                                className={`px-4 py-2 mx-4 cursor-pointer hover:shadow-xl hover:font-semibold rounded-lg transition-all duration-300 ease-in-out block ${filterByCategory === item.type ? "bg-pink text-white shadow-xl" : ""}`}
                                                onClick={() => {
                                                    setFilterByCategory(item.type)
                                                    setMobileFiltersOpen(false)
                                                }}
                                            >
                                                <span className='text-lg font-normal'>{item.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className='mb-5'>
                                        <h3 className="px-4 pt-8 pb-2 text-2xl font-medium">Price</h3>
                                        <div className='flex items-center justify-between'>
                                            <div className='px-4 font-semibold text-pink'>
                                                ${priceRange}
                                            </div>
                                        </div>
                                        <input
                                            type="range"
                                            max={100}
                                            // min={0}
                                            value={priceRange}
                                            onChange={handleChangeFilterPrice}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-300"
                                        />
                                    </div>
                                    <hr />
                                    <div className='mt-5 text-center'>
                                        <Button
                                            onClick={handleClearFilter}
                                            title='Reset filter'
                                        />
                                    </div>
                                </div>
                            </form>


                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                {/* Replace with your content */}
                                {currentProduct.length > 0
                                    ?
                                    <ProductList data={currentProduct} />
                                    :
                                    <div className='flex flex-col items-center justify-center w-full col-span-3 mt-20'>
                                        <img src={notFound_img} className="h-[340px]" alt='' />
                                        <p className="my-2 text-2xl !text-black text-center">
                                            No products are found!
                                        </p>
                                    </div>
                                }
                                <Pagination totalItem={productList.length} perPage={productPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                                {/* /End replace */}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </Helmet>
    )
}

export default Product