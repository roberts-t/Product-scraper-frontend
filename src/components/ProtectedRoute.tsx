import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IState } from '../types';

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {

    const { accessToken, isLoading } = useSelector((state: IState) => state.auth);

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