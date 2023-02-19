import React from 'react'
import Head from 'next/head'
import Navbar from './layout/navbar'
import Footer from './layout/footer'

const Layout: React.FC<{ children: JSX.Element, title?: string, description?: string }> = ({
  children,
  title = "Enzan",
  description = "Crea proyectos con otros developers y aprende nuevas tecnologías en Enzan. Desarrolla tu portfolio mientras que desarrollas habilidades blandas."
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Kai Takami" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="manifest" href="/images/site.webmanifest" />
        <link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Navbar />
      <div className='min-h-screen pt-16'>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout
