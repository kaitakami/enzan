import Navbar from './layout/navbar'
import Footer from './layout/footer'
import HeadLayout from './Dashboard/layout/HeadLayout';

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
