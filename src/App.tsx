import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './screens/Home';
import { Search } from './screens/Search';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Access } from './screens/Access';

function App() {
    return (
        <Routes>
            <Route path="/" element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            } />
            <Route path="/search" element={
                <ProtectedRoute>
                    <Search />
                </ProtectedRoute>
            } />
            <Route path="/access" element={<Access />} />
        </Routes>
    );
}

export default App;
