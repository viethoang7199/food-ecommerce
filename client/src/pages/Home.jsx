import React, { useEffect } from 'react'
import bg_1 from '../assets/images/background/bg_1.png'
import Helmet from '../components/Helmet'
import Hero from '../components/UI/Hero'
import ProductsListSlide from '../components/UI/ProductsListSlide'
import Services from '../components/UI/Services'
import ShortAbout from '../components/UI/ShortAbout'
import Testimonials from '../components/UI/Testimonials'
import TimerCount from '../components/UI/TimerCount'
import SectionSubtitle from '../components/common/SectionSubTitle'
import SectionTitle from '../components/common/SectionTitle'
import useGetData from '../customHook/useGetData'

const Home = () => {

    const { data: products } = useGetData('products')

    const filteredTrendingProducts = products.filter(item => item.category === 'pizza');
    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return <Helmet title="Home">
        <Hero />
        <Services />
        <ShortAbout />
        <section
            className="bg-background"
            style={{ backgroundImage: `url(${bg_1})`, }}
        >
            <div className="px-4 py-10 2xl:container 2xl:mx-auto lg:py-20 md:px-14 lg:px-20">
                <SectionSubtitle title="Popular Menu" />
                <SectionTitle title={<span>Our Popular Delicious <span className="font-lobster text-pink">Foods</span></span>} />
                <p className="max-w-[560px] mx-auto text-center leading-[1.75] mb-6">Objectively pontificate quality models before intuitive information. Dramatically recaptiualize multifunctional materials.</p>
                <ProductsListSlide
                    data={filteredTrendingProducts}
                />
            </div>
        </section>

        <TimerCount />
        <Testimonials />

    </Helmet>
}

export default Home