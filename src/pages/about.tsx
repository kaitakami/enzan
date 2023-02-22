import Layout from "@/components/layout/app/Layout"
import Link from "next/link"
import kaiImage from "../../public/kaiTakami.jpg"
import Image from "next/image"

const about = () => {
  return (
    <Layout>
      <>
        <section>
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
            <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Nosotros</h2>
              <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400"></p>
            </div>
            <div className="flex gap-8 mb-6 lg:mb-16 justify-center">
              <div className="items-center bg-gray-50 rounded-lg sm:flex dark:bg-gray-800 dark:border-gray-700 shadow-2xl sm:pr-12">
                <Link href="https://www.kaitakami.dev">
                  <Image className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg hover:opacity-90 transition-opacity" width={300} height={300} src={kaiImage} alt="Kai Takami Image" priority />
                </Link>
                <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:opacity-90 transition-opacity">
                    <Link href="https://www.kaitakami.dev">Kai Takami</Link>
                  </h3>
                  <span className="text-gray-500 dark:text-gray-400">Founder - Web dev</span>
                  <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">I build stuff for the web.</p>
                  <ul className="flex space-x-4 sm:mt-0">
                    <li>
                      <Link href="https://twitter.com/kaitakami_" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://github.com/kaitakami" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </section>
      </>
    </Layout>
  )
}

export default about
