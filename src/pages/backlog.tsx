import Layout from '@/components/Layout'

const backlog = () => {
  return (
    <Layout>
      <section className='max-w-6xl m-auto pt-20 space-y-12'>
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>Backlog</h1>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          <li className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-fuchsia-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-fuchsia-900">
              <svg aria-hidden="true" className="w-3 h-3 text-fuchsia-800 dark:text-fuchsia-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Enzan en construcción<span className="bg-fuchsia-100 text-fuchsia-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-fuchsia-900 dark:text-fuchsia-300 ml-3">Latest</span></h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Febrero 19, 2023</time>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Estoy dedicando todo mi tiempo libre en este proyecto!</p>
          </li>
        </ol>
      </section>

    </Layout>
  )
}

export default backlog
