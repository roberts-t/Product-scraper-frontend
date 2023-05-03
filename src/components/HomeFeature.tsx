import React from 'react';

export const HomeFeature: React.FC<IHomeFeatureProps> = (props) => {
    return (
        <div className="flex flex-col items-center space-y-1.5">
            <div className="bg-secondary/[0.18] rounded-md w-20 h-20 flex justify-center items-center">
                {props.icon}
            </div>
            <h3 className="font-bold text-center font-rubik text-lg text-slate-700">{props.title}</h3>
            <p className="text-center text-gray-500">{props.description}</p>
        </div>
    );
};

interface IHomeFeatureProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}