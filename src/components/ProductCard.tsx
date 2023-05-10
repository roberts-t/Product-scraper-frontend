import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/lv';
import { ProductHistoryModal } from './ProductHistoryModal';
import { MdOutlineImageNotSupported } from 'react-icons/md';

export const ProductCard: React.FC<ProductCardProps> = (props) => {
    const [imgError, setImgError] = useState<boolean>(false);
    const price = Number(props.product.price);
    moment().locale('lv');

    return (
        <div className="border-2 border-primary rounded shadow">
            <div className="flex flex-col h-full">
                <div className="px-3 py-2.5 mb-2 flex justify-between flex-row">
                    <a href={props.product.siteUrl} target="_blank" rel="noreferrer">
                        <div className="h-6">
                            <img
                                src={`${process.env.REACT_APP_API_ORIGIN}images/stores/${props.product.siteLogo}`}
                                className="h-full"
                                alt={props.product.site + " logo"}
                            />
                        </div>
                    </a>
                    <a href={props.product.siteUrl} target="_blank" rel="noreferrer">
                        <div className="bg-primary text-white py-0.5 font-semibold px-3 rounded text-sm">
                            {props.product.siteName}
                        </div>
                    </a>
                </div>
                <a href={props.product.url} target="_blank" rel="noreferrer">
                    <div className="h-32 mb-2 px-3">
                        {!imgError &&
                            <img
                                src={props.product.image}
                                className="h-full mx-auto"
                                alt={props.product.name}
                                onError={() => setImgError(true)}
                            />
                        }
                        {imgError &&
                            <div className="h-full flex justify-center items-center">
                                <MdOutlineImageNotSupported className="text-gray-400 text-7xl" />
                            </div>
                        }
                    </div>
                </a>
                <div className="flex flex-col justify-between flex-1 px-4">
                    <a href={props.product.url} target="_blank" rel="noreferrer">
                        <p className="font-medium text-center font-montserrat font-semibold ">{props.product.name}</p>
                    </a>
                    <div className="mt-3">
                        <div className="text-gray-400 text-sm my-1 flex flex-col mb-3">
                            {props.product.dealDuration &&
                                <p>Cena spēkā: {props.product.dealDuration}</p>
                            }
                            {props.product.manufacturer &&
                                <p>Ražotājs: {props.product.manufacturer}</p>
                            }
                            {props.product.country &&
                                <p>Ražots: {props.product.country}</p>
                            }
                        </div>
                        <div className="flex flex-row justify-between">
                            {props.product.available ?
                                <p className="text-primary font-bold font-montserrat text-2xl">{isNaN(price) ? "-" : price.toFixed(2)}<span>€</span></p>
                                :
                                <p className="text-red-500 font-semibold font-montserrat leading-none text-center my-auto">Šobrīd nav pieejams</p>
                            }
                            <ProductHistoryModal product={props.product} />
                        </div>
                    </div>
                </div>
                <div className="text-sm text-gray-400 px-3 pb-3">Atjaunots {moment(props.product.createdAt).fromNow()}</div>
            </div>
        </div>
    );
};

interface ProductCardProps {
    product: any;

}