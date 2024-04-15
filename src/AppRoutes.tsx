// import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/layout'
import HomePage from './pages/HomePage'
import AuthCallBackPage from './pages/AuthCallBackPage'
import UserProfilePage from './pages/UserProfilePage'
import ProtectedRoute from './auth/ProtectedRoute'

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <Layout showHero>
                        <HomePage></HomePage>
                    </Layout>
                }
            />
            //this is called when the user is redirected back to the app after
            authentication from the auth0
            <Route path='/auth-callback' element={<AuthCallBackPage />} />
            <Route element={<ProtectedRoute />}>
                <Route
                    path='/user-profile'
                    element={
                        <Layout>
                            <UserProfilePage />
                        </Layout>
                    }
                />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}
