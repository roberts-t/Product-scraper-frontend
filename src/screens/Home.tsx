import React from 'react';
import { Page } from '../components/Page';
import shoppingCartHero from '../assets/images/shopping-cart-hero.png';
import { Link } from 'react-router-dom';
import { ImSearch } from 'react-icons/im';
import { HiOutlineScale } from 'react-icons/hi';
import { RiHistoryLine } from 'react-icons/ri';
import { BiStoreAlt } from 'react-icons/bi';
import { HomeFeature } from '../components/HomeFeature';

export const Home = () => {

    return (
        <Page>
            <div className="bg-white">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 grid-cols-1 sm:p-20 p-10 font-sans">
                        <div className="lg:order-1 order-2">
                            <h2 className="font-semibold text-white mb-1 bg-secondary w-fit px-3.5 py-0.5 rounded-2xl">Mēģini iepirkties lētāk?</h2>
                            <h1 className="font-extrabold text-slate-800 leading-tight sm:text-6xl text-5xl font-montserrat">Atrodi lētākos produktus<br /> vienuviet</h1>
                            <p className="font-medium text-slate-700 text-xl my-2">Meklē sev nepieciešamos produktus un atrodi to cenas vairākos Latvijas e-veikalos</p>
                            <Link to={'/search'} className="bg-primary text-white px-8 py-3.5 rounded-md text-xl mt-5 inline-block shadow hover:bg-secondary transition">
                                Meklēt produktus
                            </Link>
                        </div>
                        <div className="flex items-center justify-center lg:order-2 order-1 lg:mb-0 mb-5">
                            <img className="lg:w-9/12 sm:w-4/6 h-auto" src={shoppingCartHero} alt="shopping cart" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto mb-10">
                <div className="sm:px-20 sm:pb-20 sm:pt-14 p-10 font-sans">
                    <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 xl:px-10 lg:px-2 xl:gap-x-7 lg:gap-x-5 gap-x-10 gap-y-10">
                        <HomeFeature
                            icon={<ImSearch className="text-primary text-4xl" />}
                            title="Meklē produktus pēc nosaukuma"
                            description='Meklē produktus pēc nosaukuma, piemēram, "Piens", "Sviests Exporta", "Šokolādes saldējums"'
                        />
                        <HomeFeature
                            icon={<BiStoreAlt className="text-primary text-5xl" />}
                            title="Vairāku e-veikalu produkti"
                            description='Meklētie produkti tiks attēloti no vairākiem Latvijas pārtikas e-veikaliem, piemēram, "Rimi", "Barbora", "Elvi", "Lidl" un citiem'
                        />
                        <HomeFeature
                            icon={<RiHistoryLine className="text-primary text-5xl" />}
                            title="Apskati produktu cenu vēsturi"
                            description='Apskati katra produkta cenu vēsturi, lai uzzinātu vai produktam ir tendence kļūt lētākam vai dārgākam'
                        />
                        <HomeFeature
                            icon={<HiOutlineScale className="text-primary text-5xl" />}
                            title="Salīdzini produktu cenas"
                            description='Salīdzini produktu cenas no vairākiem e-veikaliem, lai atrastu lētāko cenu vai izdevīgāko piedāvājumu'
                        />
                    </div>
                </div>
            </div>
        </Page>
    );
};