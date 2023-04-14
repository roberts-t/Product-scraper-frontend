import React from 'react';
import { BiCart } from 'react-icons/bi';

// TODO: Remove hardcoded localhost link
export const ProductCard: React.FC<ProductCardProps> = (props) => {
    return (
        <div className="border-2 border-primary rounded p-3 shadow">
            <div className="flex flex-col h-full">
                <div className="h-6 mb-2">
                    <img src={`${process.env.REACT_APP_API_ORIGIN}images/stores/${props.product.site}.png`} className="h-full" alt={props.product.site + " logo"} />
                </div>
                <div className="h-32 mb-2">
                    <img src={props.product.image} className="h-full mx-auto" alt="Product" />
                </div>
                <div className="flex flex-col justify-between flex-1">
                    <p className="font-medium text-center font-montserrat">{props.product.name}</p>
                    <div className="mt-3 flex flex-row justify-between">

                        <p className="text-primary font-bold font-montserrat text-2xl">{props.product.price}<span>€</span></p>
                        <a href={props.product.url} target="_blank" className="bg-primary rounded p-2 w-fit" rel="noreferrer">
                            <BiCart className="text-white text-xl" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ProductCardProps {
    product: any;

}