import React from 'react';
import { Page } from '../components/Page';
import shoppingCartHero from '../assets/images/shopping-cart-hero.png';
import { Link } from 'react-router-dom';

export const Home = () => {

    return (
        <Page>
            <div className="bg-white">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 p-20 font-sans">
                        <div>
                            <h2 className="font-semibold text-white mb-1 bg-secondary w-fit px-3.5 py-0.5 rounded-2xl">Mēģini iepirkties lētāk?</h2>
                            <h1 className="font-extrabold text-slate-800 leading-tight text-6xl font-montserrat">Atrodi lētākos produktus<br /> vienuviet</h1>
                            <p className="font-medium text-slate-700 text-xl my-2">Meklē sev nepieciešamos produktus un atrodi to cenas vairākos Latvijas e-veikalos</p>
                            <Link to={'/search'} className="bg-primary text-white px-8 py-3.5 rounded-md text-xl mt-5 inline-block shadow hover:bg-secondary transition">
                                Meklēt produktus
                            </Link>
                        </div>
                        <div className="flex items-center justify-center">
                            <img className="w-9/12 h-auto" src={shoppingCartHero} alt="shopping cart" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </Page>
    );
};