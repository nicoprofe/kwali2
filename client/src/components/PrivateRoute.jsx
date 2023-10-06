import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

export default function PrivateRoute({adminRequired = false}) {
    const { loggedIn, isAdmin, checkStatus } = useAuthStatus()

    if(checkStatus) {
        return <Spinner/>
    }

    if (loggedIn) {
      if (adminRequired && isAdmin) {
        return <Outlet/>
      } else if (!adminRequired) {
        return <Outlet/>
      }
    }

    return <Navigate to={'/sign-in'}/>
}