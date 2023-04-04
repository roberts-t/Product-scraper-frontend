import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {

    const { accessToken, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <div>Loading...</div>;
    } else if (!accessToken) {
        return <Navigate to={'/access'} replace />;
    }

    return children;
};

interface ProtectedRouteProps {
    children: React.ReactElement;
}