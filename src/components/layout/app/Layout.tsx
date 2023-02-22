import Navbar from './navbar'
import Footer from './footer'
import HeadLayout from '../HeadLayout';

const Layout: React.FC<{ children: JSX.Element, title?: string, description?: string }> = ({
  children,
  title,
  description
}) => {
  return (
    <>
    <HeadLayout title={title} description={description} />
      <Navbar />
      <div className='min-h-screen pt-16'>
        {children}
      </div>
      <Footer />
    </>)
}

export default Layout
