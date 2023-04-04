import React from 'react';

export const Container: React.FC<ContainerProps> = ({ children, className }) => {
    return (
        <div className={`container mx-auto xl:px-32 md:px-14 sm:px-10 px-5 ${className}`}>
            {children}
        </div>
    );
};

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}