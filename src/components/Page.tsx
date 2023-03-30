import React from 'react';
import { Navbar } from './Navbar';

export const Page = ({ children }: PageProps) => {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Navbar />
            <div className="w-full bg-neutral flex-1 flex flex-col">
                {children}
            </div>
        </div>
    );
};

interface PageProps {
    children: React.ReactNode;
}