import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
import HeadLayout from '../Head'
import Loading from '@/components/Loading';
import Sidebar from './Sidebar'

const Layout: React.FC<{ children: JSX.Element, title?: string, description?: string }> = ({
  children,
  title,
  description
}) => {
  const { toast } = useToast()
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    async function redirect() {
      await router.push('/')
    }

    if (session.status === 'unauthenticated') {
      redirect().finally(() => toast({ variant: 'destructive', title: 'Inicia sesión primero', description: 'Tienes que tener una cuenta para acceder esta página' }))
    }
  }, [router, session, toast])

  if (session.status === 'authenticated') {
    return (
      <>
        <HeadLayout title={title} description={description} />
        <div className='min-h-screen flex'>
          <Sidebar />
          {children}
        </div>
      </>)
  }

  return (
    <Loading />
  )
}

export default Layout
