import React, { FunctionComponent } from 'react';
import { Route, Navigate } from 'react-router-dom';

// Simulated authentication check function
const isAuthenticated = (): boolean => {
  // Replace with actual logic to check if user is authenticated
  return true; // For demo purposes, assuming user is always authenticated
};

interface ProtectedRouteProps {
  path: string;
  element: React.ReactNode;
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({ path, element }) => {
  return isAuthenticated() ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

export default ProtectedRoute;
