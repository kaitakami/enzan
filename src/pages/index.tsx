import { type NextPage } from "next";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { buttonVariants } from "@/components/ui/button";
import Layout from '../components/layout/app/Layout';
import { siteConfig } from '../config/siteConfig';
import { Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast"
import ProjectsSection from "@/components/ProjectFilter/ProjectsSection";
import FAQ from "@/components/Home/FAQ";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";


const Home: NextPage = () => {
  const { toast } = useToast()
  const session = useSession()
  const router = useRouter()
  if (session.status === 'authenticated') {
    router.push('/dashboard').catch(() => toast({
      variant: "destructive",
      title: "Uh oh!",
      description: "No pudimos redirigirte a tu dashboard :(",
      action: <ToastAction altText="Reintentar">Reintentar</ToastAction>
    }))
  } else if (session.status === 'unauthenticated') {
    return (
      <Layout>
        <>
          <section className="from-[#f1f1f1] via-slate-100 to-[#fafafa] dark:from-slate-900 dark:via-slate-800 dark:to-slate-800 h-screen sm:pt-16 pt-5 bg-gradient-to-b max-h-[1200px] relative">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
              <Link href="/backlog" className="group inline-flex justify-between items-center py-1 px-1 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
                <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3 group-hover:animate-pulse">Nuevo</span> <span className="text-sm font-medium umami--click--backlog-hero-section">Enzan ya está aquí! Mira las novedades</span>
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              </Link>
              <div className="space-y-2 sm:space-y-5">
                <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none bg-gradient-to-b from-slate-900 via-slate-800 to-slate-800 md:text-7xl lg:text-8xl bg-clip-text text-transparent dark:text-slate-100 sm:max-w-xs sm:px-0 md:max-w-2xl  lg:max-w-4xl py-3 md:py-8 m-auto backdrop-blur-3xl">{siteConfig.secondDescription}</h1>
                <p className="mb-8 text-base sm:text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 backdrop-blur-xl">{siteConfig.description}</p>
                <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                  <Link href="/about" className={buttonVariants({
                    size: "lg",
                    variant: "colored",
                    className: "py-6 max-w-sm sm:max-w-none w-full mx-auto sm:m-0 sm:w-auto umami--click--about-hero-section"
                  })}>
                    Sobre
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path></svg>
                  </Link>
                  <button
                    className={buttonVariants({
                      size: "lg",
                      variant: "outline",
                      className: "bg-white dark:bg-inherit py-6 space-x-2 max-w-sm sm:max-w-none w-full mx-auto sm:m-0 sm:w-auto umami--click--register-github-hero-section"
                    })}
                    onClick={() => {
                      toast({
                        title: "Cargando...",
                        description: "Estamos conectando tu cuenta de GitHub",
                      })

                      signIn('github').catch(() => {
                        toast({
                          variant: "destructive",
                          title: "Uh oh!",
                          description: "Hubo un error :(",
                          action: <ToastAction altText="Reintentar">Reintentar</ToastAction>
                        })
                      })
                    }
                    }
                  >
                    <Github />
                    <span>Registra tu cuenta</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
          <main>
            <ProjectsSection />
            <FAQ />
          </main>
        </>
      </Layout>
    )
  }
  return (
    <Loading />
  );
};

export default Home;
