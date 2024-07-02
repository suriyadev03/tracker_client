import React, { FunctionComponent } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from 'react-router-dom';
import { ErrorBoundaries } from '../components/ErrorBoundaries';
import { Home } from '../pages/Home';
import { Login } from '../pages/Auth/Login';
import { Register } from '../pages/Auth/Register';
import { ForgetPassword } from '../pages/Auth/ForgetPassword';
import { Team } from '../pages/Home/TeamMembers';
import { BirthDays } from '../pages/Home/BirthDays';
import { AvailableBalance } from '../pages/Home/AvailableBalance';
import { Calenders } from '../pages/Home/Calender';
import { RegularTreat } from '../pages/Home/RegularTreat';
import { Profile } from '../pages/Home/Profile';
import Layout from './Layout';
import { PageNotFount } from '../components/PageNotFount';
import { ExpenceTracker } from '../pages/Home/ExpenceTracker';

interface RouteConfig {
    path: string;
    element: React.ReactNode;
    children?: RouteConfig[];
}

const routerConfig: RouteConfig[] = [
    {
        path: '/',
        element: (<Layout />),
        children: [{
            path: 'home',
            element: (
                <Home />
            ),
        },
        {
            path: '/',
            element: (
                <Home />
            ),
        },
        {
            path: '*',
            element: (
                <PageNotFount/>
            ),
        },
        {
            path: 'teammembers',
            element: (
                <Team />
            ),
        },
        {
            path: 'RegularTreat',
            element: (
                <RegularTreat />
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
            path: 'profile',
            element: (
                <Profile />
            ),
        },
        {
            path: 'expenceTracker',
            element: (
                <ExpenceTracker />
            ),
        }]
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
]

const router = createBrowserRouter(routerConfig);

const Routers: FunctionComponent = () => (
    <>
        <RouterProvider router={router} />
    </>
);

export default Routers;
