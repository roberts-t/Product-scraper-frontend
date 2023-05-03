import React from 'react';
import { Navbar } from './Navbar';
import Footer from './Footer';

export const Page = ({ children }: PageProps) => {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Navbar />
            <div className="w-full bg-neutral flex-1 flex flex-col">
                {children}
            </div>
            <Footer />
        </div>
    );
};

interface PageProps {
    children: React.ReactNode;
}