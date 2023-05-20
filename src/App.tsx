import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './screens/Home';
import { Search } from './screens/Search';
import { Access } from './screens/Access';
import ReactGA from 'react-ga';
ReactGA.initialize("G-V3JW0EHKPG");

function App() {
    return (
        <Routes>
            <Route path="/" element={
                <Home />
            } />
            <Route path="/search" element={
                <Search />
            } />
            <Route path="/access" element={<Access />} />
        </Routes>
    );
}

export default App;
