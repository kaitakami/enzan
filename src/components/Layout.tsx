import React from 'react'
import Navbar from './layout/navbar'

const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
