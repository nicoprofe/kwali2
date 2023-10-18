import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function RootLayout({ children}) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <main className='flex-1 overflow-hidden'>{children}</main>
      <Footer/>
    </div>
  )
}
