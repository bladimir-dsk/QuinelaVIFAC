import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { LandingPage, Login } from './lazyComponents'

export default function RouteApp() {
    return (
        <Suspense>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </Suspense>
    )
}
