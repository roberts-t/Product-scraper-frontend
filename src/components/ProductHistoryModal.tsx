import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { requestPublic } from '../utils/request';
import { ProductChart } from './ProductChart';
import { RiHistoryLine } from 'react-icons/ri';
import { CgClose, CgSpinner } from 'react-icons/cg';

export const ProductHistoryModal: React.FC<ProductHistoryModalProps> = (props) => {
    let [isOpen, setIsOpen] = useState(false);
    const [productHistory, setProductHistory] = useState<any[]>([]);
    const [isChartLoading, setIsChartLoading] = useState<boolean>(false);
    const validPriceHistory = productHistory.filter((item) => !isNaN(item.price));
    const maxPrice = Math.max(...validPriceHistory.map((item) => item.price)).toFixed(2);
    const minPrice = Math.min(...validPriceHistory.map((item) => item.price)).toFixed(2);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsChartLoading(true);
        setIsOpen(true);

        requestPublic.post('/product/history', {
            productUrl: props.product.url
        }).then((res) => {
            setProductHistory(res.data);
            setIsChartLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsChartLoading(false);
        });
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="text-right flex flex-row items-center justify-center space-x-1"
            >
                <span className="text-xs leading-none text-primary font-semibold">Apskatīt<br/>vēsturi</span>
                <RiHistoryLine className="inline-block text-primary text-lg" />
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto font-sans">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-md bg-white sm:p-6 p-4 text-left align-middle shadow-xl transition-all">
                                    <div className="absolute top-2 right-3 p-1.5">
                                        <CgClose className="text-gray-400 text-2xl cursor-pointer" onClick={closeModal} />
                                    </div>
                                    <div className="flex flex-row space-x-3 mb-3">
                                        <div className="h-6">
                                            <img src={`${process.env.REACT_APP_API_ORIGIN}images/stores/${props.product.siteLogo}`} className="h-full" alt={props.product.site + " logo"} />
                                        </div>
                                        <div className="bg-primary text-white py-0.5 font-semibold px-3 rounded text-sm">
                                            {props.product.siteName}
                                        </div>
                                    </div>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-semibold text-gray-900"
                                    >
                                        {props.product.name}
                                    </Dialog.Title>
                                    {isChartLoading &&
                                        <div className="flex flex-col items-center justify-center h-60">
                                            <p className="font-bold text-primary mb-1 text-lg font-rubik">Meklē produkta vēsturi...</p>
                                            <CgSpinner className="animate-spin text-primary text-4xl mx-auto mb-1" />
                                        </div>
                                    }
                                    {productHistory.length > 0 && !isChartLoading &&
                                        <>
                                            <div className="my-4 flex flex-row justify-around gap-x-2 text-center">
                                                <div>
                                                    <p className="text-gray-500 sm:text-base text-sm">Zemākā cena</p>
                                                    <span className="block font-bold text-lg text-primary">{minPrice}€</span>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500 sm:text-base text-sm">Augstākā cena</p>
                                                    <span className="block font-bold text-lg text-primary">{maxPrice}€</span>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500 sm:text-base text-sm">Cena šobrīd</p>
                                                    <span className="block font-bold text-lg text-primary">{props.product.price}€</span>
                                                </div>
                                            </div>
                                            <ProductChart productHistory={productHistory} />
                                        </>
                                    }
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
};

interface ProductHistoryModalProps {
    product: any;
}