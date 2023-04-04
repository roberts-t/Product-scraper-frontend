import React, { useState } from 'react';
import { Page } from '../components/Page';
import ShoppingCart from '../assets/images/search-products.png';
import { SearchForm } from '../components/forms/SearchForm';
import { ProductCard } from '../components/ProductCard';
import { CgSpinner } from 'react-icons/cg';
import { Container } from '../components/Container';

export const Search = () => {

    const [products, setProducts] = useState([] as any[]);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSearched, setIsSearched] = useState(false);

    const setProductsSorted = (products: any[]) => {
        const sortedProducts = products.sort((a, b) => {
            return a.price - b.price;
        });
        setProducts(sortedProducts);
    }

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
        } else if (products.length > 0) {
            const productCards = products.map((product, i) => {
                return <ProductCard key={i} product={product} />
            });
            return (
                <div>
                    <div className="font-sans mb-5">
                        <p className="text-xl leading-none">Rezultāti meklēšanai: "<span className="text-primary font-semibold">{query}</span>"</p>
                        <p className="text-gray-500">Atrasti <span className="font-semibold">{products.length}</span> produkti</p>
                    </div>
                    <div className="flex flex-row gap-x-5">

                        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                            {productCards}
                        </div>
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
                    <SearchForm
                        setQuery={setQuery}
                        setProducts={setProductsSorted}
                        setIsLoading={setIsLoading}
                        setSearched={setIsSearched}
                        isLoading={isLoading}
                    />
                </div>
            </Container>
            <div className="bg-white flex-1">
                <Container className="py-10">
                    {renderProducts()}
                </Container>
            </div>

        </Page>
    );
};