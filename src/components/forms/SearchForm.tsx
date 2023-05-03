import React from 'react';
import * as Yup from 'yup';
import { FormikForm } from '../FormikForm';
import { Field, FormikHelpers, useFormikContext } from 'formik';
import { ImSearch } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { searchProducts } from '../../features/products/productsSlice';
import { IState } from '../../types';

export const SearchForm: React.FC<ISearchFormProps> = ({ resetPagination }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { isLoading } = useSelector((state: IState) => state.products);

    const initialValues = {
        query: ''
    };

    const validationSchema = {
        query: Yup.string()
            .required('Ievadiet produkta nosaukumu')
            .max(50, 'Produkta nosaukums nevar būt garāks par 50 rakstzīmēm')
    };

    const onSubmit = async (values: ISearchFormValues, actions: FormikHelpers<ISearchFormValues>) => {
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

    return (
        <>
            <div className="p-1.5 bg-neutral flex flex-row rounded items-center w-full">
                <div className="pl-1.5 pr-3 text-primary">
                    <ImSearch className="text-gray-400 text-lg" />
                </div>
                <Field
                    name="query"
                    type="text"
                    placeholder="Produkta nosaukums..."
                    className="h-8 text-black w-full bg-transparent focus:outline-none pr-4"
                />
                <button
                    type="submit"
                    className="bg-primary px-4 py-2 text-white rounded"
                >
                    Meklēt
                </button>
            </div>
            {errors.query && touched.query ? (
                <div className="text-red-500 text-center mt-1">{errors.query}</div>
            ) : null}
        </>
    );
};

interface ISearchFormProps {
    resetPagination: () => void;
}

interface ISearchFormValues {
    query: string;
}