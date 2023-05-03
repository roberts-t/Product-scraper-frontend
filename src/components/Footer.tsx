import React from 'react';
import { ReactComponent as Logo } from '../assets/vectors/logo.svg';
import { AiFillGithub } from 'react-icons/ai';

const Footer = () => {
    return (
        <footer className="w-full py-2 bg-secondary text-white">
            <div className="flex flex-col justify-center items-center text-sm font-sans">
                <div className="flex flex-row items-center gap-x-1">
                    <Logo className="h-6 w-auto fill-white" />
                    <p className="font-bold font-rubik text-lg text-white mt-1">AtrodiLētāk</p>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                    <span>Roberts Turks @ 2023</span>
                    <div className="flex flex-row gap-x-2 mb-1">
                        <a href="https://github.com/roberts-t" target="_blank" rel="noreferrer" className="text-white hover:text-gray-200 transition-colors duration-300">
                            <AiFillGithub className="text-2xl" />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;