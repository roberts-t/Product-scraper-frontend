import React from 'react';

export const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className="container mx-auto px-32">
            {children}
        </div>
    );
};

interface ContainerProps {
    children: React.ReactNode;
}