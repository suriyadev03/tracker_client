import React, { FunctionComponent } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from 'react-router-dom';
import { ErrorBoundaries } from '../components/ErrorBoundaries';
import { App } from '../pages/Home';
import { Login } from '../pages/Auth/Login';
import { Register } from '../pages/Auth/Register';
import { ForgetPassword } from '../pages/Auth/ForgetPassword';
import { Team } from '../pages/Home/TeamMembers';
import { DailyTreat } from '../pages/Home/DailyTreat';
import { BirthDays } from '../pages/Home/BirthDays';
import { AvailableBalance } from '../pages/Home/AvailableBalance';
import { Calenders } from '../pages/Home/Calender';

interface RouteConfig {
    path: string;
    element: React.ReactNode;
    children?: RouteConfig[];
}

// Router configuration

const routerConfig: RouteConfig[] = [
    {
        path: 'home',
        element: (
            <App />
        ),
    },
    {
        path: '/',
        element: (
            <Login />
        ),
    },
    {
        path: '*',
        element: (
            <div>Page not found</div>
        ),
    },
    {
        path: 'teammembers',
        element: (
            <Team />
        ),
    },
    {
        path: 'dailytreat',
        element: (
            <DailyTreat />
        ),
    },
    {
        path: 'birthdays',
        element: (
            <BirthDays />
        ),
    },
    {
        path: 'availablebalance',
        element: (
            <AvailableBalance />
        ),
    },
    {
        path: 'calender',
        element: (
            <Calenders />
        ),
    },
    {
        path: 'auth',
        element: (
            <ErrorBoundaries>
                <Outlet />
            </ErrorBoundaries>
        ),
        children: [
            {
                path: 'login',
                element: (
                    <Login />
                ),
            },
            {
                path: 'register',
                element: (
                    <Register />
                ),
            },
            {
                path: 'forgetpassword',
                element: (
                    <ForgetPassword />
                ),
            },

        ],
    },
];

const router = createBrowserRouter(routerConfig);

const Routers: FunctionComponent = () => (
    <RouterProvider router={router} />
);

export default Routers;
