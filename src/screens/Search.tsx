import React, { useEffect, useRef, useState } from 'react';
import { Page } from '../components/Page';
import ShoppingCart from '../assets/images/search-products.png';
import ProductsNotFound from '../assets/images/search-notfound.png';
import { SearchForm } from '../components/forms/SearchForm';
import { ProductCard } from '../components/ProductCard';
import { CgSpinner } from 'react-icons/cg';
import { Container } from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../types';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductSortDropdown } from '../components/dropdowns/ProductSortDropdown';
import { Pagination } from '../components/Pagination';
import { AppDispatch } from '../app/store';
import { searchProducts } from '../features/products/productsSlice';
import { HiOutlineRefresh } from 'react-icons/hi';
import { InfoTooltip } from '../components/InfoTooltip';

const PRODUCTS_PER_PAGE = 28;
export const Search = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { productsSorted, updateAvailable, isLoading, query, isSearched, errorMsg } = useSelector((state: IState) => state.products);
    const [page, setPage] = useState(1);
    const productContainer = useRef<HTMLDivElement | null>(null);
    const didMountRef = useRef<boolean>(false);

    const resetPagination = () => {
        setPage(1);
    }

    useEffect(() => {
        if (errorMsg) {
            toast.error("Notika kļūda, mēģiniet vēlreiz");
        }
    }, [errorMsg]);

    useEffect(() => {
        if (productContainer.current && didMountRef.current) {
            productContainer.current.scrollIntoView({ block: "start", behavior: 'smooth' });
        } else if (!didMountRef.current) {
            didMountRef.current = true;
        }
    }, [page])

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
            const productsSortedPaginated = productsSorted.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);
            const productCards = productsSortedPaginated.map((product, i) => {
                return <ProductCard key={product.name + '-' + i} product={product} />
            });
            return (
                <div>
                    <div className="font-sans mb-5">
                        <p className="text-xl leading-none">Rezultāti meklēšanai: "<span className="text-primary font-semibold">{query}</span>"</p>
                        <p className="text-gray-500">Atrasti <span className="font-semibold">{productsSorted.length}</span> produkti</p>
                    </div>
                    <div className="flex flex-row gap-x-5">
                        {productsSorted.length > 0 ?
                            <div>
                                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                                    {productCards}
                                </div>
                                <Pagination
                                    productsPerPage={PRODUCTS_PER_PAGE}
                                    totalProducts={productsSorted.length}
                                    currentPage={page}
                                    setCurrentPage={setPage}
                                />
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
                    <SearchForm resetPagination={resetPagination} />
                </div>
                <div className="mt-3 flex sm:flex-row flex-col sm:space-x-8 space-y-5">
                    {productsSorted.length > 1 &&
                        <ProductSortDropdown />
                    }
                    {updateAvailable && productsSorted.length > 1 &&
                        <div className="mt-6 flex flex-row items-center sm:space-x-1.5 space-x-3">
                            <button
                                className="bg-highlight px-3 py-2 rounded shadow transition hover:bg-highlight/[0.8] text-white flex items-center justify-center"
                                onClick={async () => await dispatch(searchProducts({query: query as string, updateProducts: true}))}
                            >
                                <HiOutlineRefresh className="inline-block text-xl mr-1" /> Atjaunot
                            </button>
                            <InfoTooltip text="Daži e-veikalu produkti var būt atjaunoti pirms ilgāka laika. Ja nepieciešams iegūt pēc iespējas jaunākus cenu datus, nospiediet pogu 'Atjaunot' (Ne visu e-veikalu produktus ir iespējams atjaunot)." />
                        </div>
                    }
                </div>
            </Container>
            <div className="bg-white flex-1 pb-10" ref={productContainer}>
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