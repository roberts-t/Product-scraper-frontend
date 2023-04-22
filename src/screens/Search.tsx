import React, { useEffect } from 'react';
import { Page } from '../components/Page';
import ShoppingCart from '../assets/images/search-products.png';
import ProductsNotFound from '../assets/images/search-notfound.png';
import { SearchForm } from '../components/forms/SearchForm';
import { ProductCard } from '../components/ProductCard';
import { CgSpinner } from 'react-icons/cg';
import { Container } from '../components/Container';
import { useSelector } from 'react-redux';
import { IState } from '../types';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductSortDropdown } from '../components/dropdowns/ProductSortDropdown';

export const Search = () => {

    const { productsSorted, isLoading, query, isSearched, errorMsg } = useSelector((state: IState) => state.products);

    useEffect(() => {
        if (errorMsg) {
            toast.error("Notika kļūda, mēģiniet vēlreiz");
        }
    }, [errorMsg]);

    const renderProducts = () => {
        if (!isSearched && !isLoading) {
            return (
                <div className="text-center">
                    <h2 className="text-slate-800 text-2xl font-rubik">Atrastie produkti tiks parādīti šeit</h2>
                    <p className="text-gray-600 text-lg">Pamēģiniet atrast kādu produktu</p>
                    <img src={ShoppingCart} alt="Shopping Cart" className="w-80 mt-3 mx-auto" />
                </div>
            )
        } else if (isLoading) {
            return (
                <div className="border-2 border-primary rounded-md p-4 text-center">
                    <CgSpinner className="animate-spin text-primary text-4xl mx-auto mb-1" />
                    <p className="text-primary text-xl font-rubik">Meklē produktus...</p>
                    <p className="text-primary mb-1">Tiek meklēti izdevīgākie produkti no vairākiem e-veikaliem</p>
                </div>
            )
        } else if (productsSorted.length >= 0) {
            const productCards = productsSorted.map((product, i) => {
                return <ProductCard key={i} product={product} />
            });
            return (
                <div>
                    <div className="font-sans mb-5">
                        <p className="text-xl leading-none">Rezultāti meklēšanai: "<span className="text-primary font-semibold">{query}</span>"</p>
                        <p className="text-gray-500">Atrasti <span className="font-semibold">{productsSorted.length}</span> produkti</p>
                    </div>
                    <div className="flex flex-row gap-x-5">
                        {productsSorted.length > 0 ?
                            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                                {productCards}
                            </div>
                            :
                            <div className="mx-auto mt-5 text-center">
                                <h2 className="text-slate-800 text-xl font-rubik">Diemžēl netika atrasts neviens produkts</h2>
                                <p className="text-gray-600">Pamēģiniet atrast citu produktu</p>
                                <img src={ProductsNotFound} alt="Shopping Cart" className="w-80 mx-auto" />
                            </div>
                        }
                    </div>
                </div>
            );
        }
    }

    return (
        <Page>
            <Container className="py-10">
                <h1 className="font-rubik text-3xl font-bold text-slate-700 py-3">Produktu meklēšana</h1>
                <p className="text-lg text-gray-500">Meklē izdevīgākos produktus no pārtikas veikaliem kā
                    <span className="text-primary font-semibold"> Rimi</span>,
                    <span className="text-primary font-semibold"> Barbora</span>,
                    <span className="text-primary font-semibold"> Top! </span>
                    un citiem.
                </p>
                <div className="bg-white rounded-md shadow-sm lg:w-5/12 md:w-8/12 sm:w-10/12 w-full mt-3 flex p-5 border border-gray-200">
                    <SearchForm />
                </div>
                <div className="mt-3">
                    {productsSorted.length > 1 &&
                        <ProductSortDropdown />
                    }
                </div>
            </Container>
            <div className="bg-white flex-1">
                <Container className="py-10">
                    {renderProducts()}
                </Container>
            </div>
            <ToastContainer
                position="bottom-right"
                pauseOnHover
                transition={Slide}
            />
        </Page>
    );
};