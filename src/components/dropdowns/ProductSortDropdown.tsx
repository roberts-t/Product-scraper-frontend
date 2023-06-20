import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { TbArrowsSort } from 'react-icons/tb';
import { FaChevronDown } from 'react-icons/fa';
import { productSortTypes } from '../../features/products/productsService';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { IState } from '../../types';
import { changeProductSort } from '../../features/products/productsSlice';

export const ProductSortDropdown = () => {

    const { sortType } = useSelector((state: IState) => state.products);

    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (value: string) => {
        dispatch(changeProductSort(value));
    }

    return (
        <div>
            <p className="text-sm text-gray-500">Kārtot pēc:</p>
            <div className="w-72">
                <Listbox value={sortType} onChange={handleChange}>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full bg-white rounded shadow py-3 px-10 text-left focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <TbArrowsSort className="text-xl text-gray-700" />
                            </span>
                            <span className="block truncate">{productSortTypes[sortType]}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <FaChevronDown className="text-gray-500" />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {Object.keys(productSortTypes).map((sortType, index) => (
                                    <Listbox.Option
                                        key={index}
                                        className={({ active }) =>
                                            `cursor-pointer py-2 px-4 ${active ? 'text-white bg-primary' : 'text-gray-900'}`
                                        }
                                        value={sortType}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`${ selected ? 'font-bold' : 'font-normal' }`}
                                                >
                                                    {productSortTypes[sortType as keyof typeof productSortTypes]}
                                                </span>
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
        </div>
    );
};
