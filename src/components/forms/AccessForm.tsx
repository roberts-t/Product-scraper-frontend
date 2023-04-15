import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { FormikForm } from '../FormikForm';
import { FormField } from './fields/FormField';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { resetProducts } from '../../features/products/productsSlice';
import { AppDispatch } from '../../app/store';
import { IState } from '../../types';
import { CgSpinner } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

const AccessForm = () => {
    const [error, setError] = React.useState<string | null>(null);
    const { accessToken, errorMsg, isLoading } = useSelector((state: IState) => state.auth);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const initialValues = {
        code: ''
    }

    const validationSchema = {
        code: Yup.string().required('Required')
    }

    useEffect(() => {
        if (errorMsg) {
            getAndSetError(errorMsg);
        } if (accessToken) {
            navigate('/');
        }
    }, [errorMsg, accessToken, navigate]);

    const onSubmit = async (values: any) => {
        if (isLoading) return;
        dispatch(login(values.code));
        dispatch(resetProducts());
    }

    const getAndSetError = (error: string) => {
        if (error === "INCORRECT_TOKEN") {
            setError("Piekļuves kods ir nepareizs");
        } else {
            setError("Kaut kas nogāja greizi, lūdzu, mēģiniet vēlāk");
        }
    }

    return (
        <FormikForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            <FormField
                name="code"
                type="password"
                autoComplete="off"
                className="border-2 border-gray-200 rounded p-2 placeholder-gray-500/[0.9] w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Piekļuves kods"
            />
            {error && <div className="text-red-500 text-center">{error}</div>}
            <button
                type="submit"
                className="bg-primary mt-5 w-full block hover:bg-primary/[0.8] transition text-white font-bold h-10 px-4 rounded"
            >{isLoading ?
                <CgSpinner className="animate-spin text-white text-lg mx-auto mb-1" />
                :
                "Piekļūt"
            }
            </button>
        </FormikForm>
    );
};

export default AccessForm;