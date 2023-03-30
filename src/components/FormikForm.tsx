import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

export const FormikForm: React.FC<FormikFormProps<IFormValues>> = (props) => {
    return (
        <Formik
            initialValues={props.initialValues}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object(props.validationSchema)}
            validateOnBlur={false}
            validateOnChange={false}
        >
            <Form className={props.className}>
                {props.children}
            </Form>
        </Formik>
    );
};

interface FormikFormProps<T> {
    initialValues: T;
    onSubmit: (values: any, actions: FormikHelpers<any>) => void;
    validationSchema: Yup.ObjectShape;
    className?: string;
    children: React.ReactNode;
}

interface IFormValues {
    [key: string]: any;
}