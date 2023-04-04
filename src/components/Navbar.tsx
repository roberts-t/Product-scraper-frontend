import React, { useContext } from 'react';
import { ReactComponent as Logo } from '../assets/vectors/logo.svg';
import { Container } from './Container';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BiLogOut } from 'react-icons/bi';

export const Navbar = () => {

    const { logout } = useContext(AuthContext);

    return (
        <nav className="w-full h-16 bg-white shadow border-secondary py-3">
            <Container>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row">
                        <div className="flex flex-row items-center gap-x-2">
                            <Logo className="h-10 w-auto" />
                            <p className="font-bold font-rubik text-2xl text-primary mt-1">AtrodiLētāk</p>
                        </div>
                        <div className="ml-14 sm:block hidden">
                            <ul className="space-x-10 text-slate-700 flex flex-row items-center h-full">
                                <li>
                                    <Link
                                        to="/"
                                    >
                                        Sākums
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/search"
                                    >
                                        Meklēšana
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={logout}
                            type="button"
                            className="flex flex-row items-center gap-x-1 text-slate-700"
                        >
                            <BiLogOut className="inline-block text-lg" /> Iziet
                        </button>
                    </div>
                </div>
            </Container>
        </nav>
    );
};