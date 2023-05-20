import React from 'react';
import * as Yup from 'yup';
import { FormikForm } from '../FormikForm';
import { Field, FormikHelpers, useFormikContext } from 'formik';
import { ImSearch } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { searchProducts } from '../../features/products/productsSlice';
import { IState } from '../../types';
import { IoWarning } from 'react-icons/io5';
import { BiErrorCircle } from 'react-icons/bi';
import ReactGA from 'react-ga';

export const SearchForm: React.FC<ISearchFormProps> = ({ resetPagination }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { isLoading } = useSelector((state: IState) => state.products);

    const initialValues = {
        query: ''
    };

    const validationSchema = {
        query: Yup.string()
            .required('Ievadiet produkta nosaukumu')
            .min(2, 'Produkta nosaukums nevar būt īsāks par 2 rakstzīmēm')
            .max(50, 'Produkta nosaukums nevar būt garāks par 50 rakstzīmēm')
    };

    const onSubmit = async (values: ISearchFormValues, actions: FormikHelpers<ISearchFormValues>) => {
        ReactGA.event({
            category: "Search",
            action: "Search for products",
            label: values.query
        });
        if (isLoading) return;
        resetPagination();
        await dispatch(searchProducts({query: values.query, updateProducts: false}));
        actions.setSubmitting(false);
    };


    return (
        <FormikForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            className="w-full"
        >
            <SearchFormBody />
        </FormikForm>
    );
};

const SearchFormBody = () => {
    const { errors, touched } = useFormikContext<ISearchFormValues>();
    const { rateLimited, rateLimitReset } = useSelector((state: IState) => state.products);
    const retryAfter = rateLimitReset ? rateLimitReset : 1;

    return (
        <>
            <div className="p-1.5 bg-neutral flex flex-row rounded items-center w-full">
                <div className="pl-1.5 pr-2 text-primary">
                    <ImSearch className="text-gray-400 text-lg" />
                </div>
                <Field
                    name="query"
                    type="text"
                    placeholder="Produkta nosaukums..."
                    className="h-8 text-black w-full bg-transparent focus:outline-none mr-4 px-2.5 rounded"
                />
                <button
                    type="submit"
                    className="bg-primary px-4 py-2 text-white rounded"
                >
                    Meklēt
                </button>
            </div>
            {errors.query && touched.query ? (
                <div className="bg-red-500 text-white text-sm rounded px-3 py-1.5 text-white flex flex-row gap-x-2 mt-2">
                    <BiErrorCircle className="flex-shrink-0 text-xl" />
                    {errors.query}
                </div>
            ) : null}
            {rateLimited && (
                <div className="bg-amber-500 text-white flex flex-row px-3 items-center text-sm gap-x-2 py-1.5 rounded mt-2">
                    <IoWarning className="text-xl flex-shrink-0" />
                    Pārāk daudz pieprasījumu, mēģiniet vēlreiz pēc {retryAfter} sekund{retryAfter > 1 ? 'ēm' : 'es'}
                </div>
            )}
        </>
    );
};

interface ISearchFormProps {
    resetPagination: () => void;
}

interface ISearchFormValues {
    query: string;
}