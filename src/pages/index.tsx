import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";

import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import Layout from '../components/Layout';

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Enzan</title>
        <meta name="description" content="This website is in construction!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <>
          <main className="min-h-screen flex items-center bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-[#f1f1f1] via-slate-100 to-white dark:from-slate-900 dark:via-slate-700 dark:to-slate-800">
            <h1 className="md:text-5xl  lg:text-6xl sm:text-4xl text-3xl font-black md:px-32 sm:px-8 px-2 max-w-4xl">
              Colabora con otros developers y crea tu portfolio ideal
            </h1>
          </main>
        </>
      </Layout>
    </>
  );
};

export default Home;


