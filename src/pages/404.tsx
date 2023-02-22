import Link from 'next/link'
import Layout from '@/components/layout/app/Layout'
const NotFoundPage = () => {
  return (
    <Layout title='Error 404 :('>
      <main className="grid min-h-screen place-items-center py-24 px-6 sm:py-32 lg:px-8 -mb-20">
        <div className="text-center pb-40">
          <p className="text-5xl md:text-8xl  font-semibold bg-gradient-to-tl from-green-700 to-emerald-600 bg-clip-text text-transparent font">404</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">Error :(</h1>
          <p className="mt-6 text-base leading-7 darktext-gray-300">La página que buscas aún no existe</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-gradient-to-tl from-green-700 to-emerald-600 px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-slate-100"
            >
              Regresar
            </Link>
            <Link href="https://twitter.com/kaitakami_" target="_blank" className="text-sm font-semibold">
              Contacto <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default NotFoundPage
