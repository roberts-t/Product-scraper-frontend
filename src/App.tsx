import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './screens/Home';
import { Search } from './screens/Search';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
        </Routes>
    );
}

export default App;
