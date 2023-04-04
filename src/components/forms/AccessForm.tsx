import React, { useContext } from 'react';
import * as Yup from 'yup';
import { FormikForm } from '../FormikForm';
import { FormField } from './fields/FormField';
import { AuthContext } from '../../context/AuthContext';

const AccessForm = () => {
    const [error, setError] = React.useState<string | null>(null);
    const { login } = useContext(AuthContext)

    const initialValues = {
        code: ''
    }

    const validationSchema = {
        code: Yup.string().required('Required')
    }

    const onSubmit = async (values: any) => {
        if (login) {
            login(values.code, setError);
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
                className="border-2 border-gray-200 rounded p-2 placeholder-gray-500/[0.9] w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Piekļuves kods"
            />
            {error && <div className="text-red-500 text-center">{error}</div>}
            <button
                type="submit"
                className="bg-primary mt-5 w-full block hover:bg-primary/[0.8] transition text-white font-bold py-2 px-4 rounded"
            >Piekļūt</button>
        </FormikForm>
    );
};

export default AccessForm;