import React from 'react'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'
import { Navigate, Outlet } from 'react-router'

export default function PrivateRouteBackup() {
  const { loggedIn, checkStatus } = useAuthStatus()
  if(checkStatus) {
    return <Spinner/>
  }
  return loggedIn ? <Outlet/> : <Navigate to={"/sign-in"}/>
}
