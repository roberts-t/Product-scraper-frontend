import React from 'react';
import { useField } from 'formik';

export const FormField: React.FC<FormFieldProps> = (props) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.name} className={props.labelClassName}>
                {props.label}
            </label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="text-red-500 mt-0.5">{meta.error}</div>
            ) : null}
        </>
    );
};

interface FormFieldProps {
    name: string;
    type: string;
    placeholder?: string;
    className?: string;
    labelClassName?: string;
    label?: string;
    autoComplete?: string;
}