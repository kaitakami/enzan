import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import Layout from '../components/Layout';
import { siteConfig } from '../config/siteConfig';
import { Github } from "lucide-react";
import ProjectsList from "@/components/Home/ProjectsList";
import FAQ from "@/components/Home/FAQ";

const Home: NextPage = () => {

  return (
    <>
      <Layout>
        <>
          <section className="bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-[#f1f1f1] via-slate-100 to-white dark:from-slate-900 dark:via-slate-700 dark:to-slate-800 min-h-screen sm:pt-28 pt-10">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
              <Link href="/backlog" className="group inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
                <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3 group-hover:animate-pulse">Nuevo</span> <span className="text-sm font-medium">Enzan ya está aquí! Mira las novedades</span>
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              </Link>
              <div className="space-y-5">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white max-w-xl m-auto">{siteConfig.secondDescription}</h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{siteConfig.description}</p>
                <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                  <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    Sobre
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path></svg>
                  </a>
                  <Link href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 space-x-1">
                    <Github />
                    <span>Registra tu cuenta</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <main>
            <ProjectsList />
            <FAQ />
          </main>
        </>
      </Layout>
    </>
  );
};

export default Home;


