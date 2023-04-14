import React, { useContext } from 'react';
import * as Yup from 'yup';
import { FormikForm } from '../FormikForm';
import { Field, FormikHelpers, useFormikContext } from 'formik';
import { ImSearch } from 'react-icons/im';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export const SearchForm: React.FC<SearchFormProps> = (props) => {
    const { checkToken } = useContext(AuthContext);
    // TODO: Remove hardcoded localhost link

    const initialValues = {
        query: ''
    };

    const validationSchema = {
        query: Yup.string()
            .required('Ievadiet produkta nosaukumu')
            .max(50, 'Produkta nosaukums nevar būt garāks par 50 rakstzīmēm')
    };

    const onSubmit = async (values: ISearchFormValues, actions: FormikHelpers<ISearchFormValues>) => {
        if (props.isLoading) {
            return;
        }
        if (checkToken) {
            await checkToken();
        }
        props.setProducts([]);
        props.setIsLoading(true);

        axios.post(`${process.env.REACT_APP_API_URL}products`, {
            sites: ['rimi', 'barbora', 'top', 'nuko', 'lats', 'pienaveikals'],
            query: values.query
        }).then((res) => {
            props.setProducts(res.data);
            props.setIsLoading(false);
            props.setSearched(true);
            props.setQuery(values.query);
            actions.setSubmitting(false);
        }).catch((err) => {
            console.log(err);
            props.setIsLoading(false);
            actions.setSubmitting(false);
        });
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

interface SearchFormProps {
    setProducts: (products: any[]) => void;
    setIsLoading: (isLoading: boolean) => void;
    setSearched: (searched: boolean) => void;
    setQuery: (query: string) => void;
    isLoading: boolean;
}

interface ISearchFormValues {
    query: string;
}