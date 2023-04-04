import React from 'react';
import AccessForm from '../components/forms/AccessForm';

export const Access = () => {
    return (
        <div className="min-h-screen bg-login bg-cover bg-center bg-no-repeat flex items-center justify-center">
            <div className="bg-white py-8 px-10 rounded-lg w-96 shadow-md">
                <h1 className="font-rubik text-2xl text-center text-slate-700">Piekļuve vietnei</h1>
                <p className="text-center mb-6 text-gray-500">Lai šobrīd piekļūtu vietnei, ir nepieciešams ievadīt piekļuves kodu</p>
                <AccessForm />
            </div>
        </div>
    );
};