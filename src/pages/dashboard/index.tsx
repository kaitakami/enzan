import Layout from "@/components/layout/Dashboard/Layout"
import type { NextPage } from "next"
import { useSession } from "next-auth/react"
import { GraduationCap } from "lucide-react"
import Link from "next/link"
import DashboardLink from "@/components/layout/Dashboard/DashboardLink"
import UserStatistics from "@/components/layout/Dashboard/User/UserStatistics"
import { api } from "@/utils/api"

const Dashboard: NextPage = () => {
  const { data: session } = useSession()
  const { data: user } = api.user["get"].useQuery({ id: session?.user.id })
  return (
    <Layout>
      <div className="max-w-6xl w-full mx-auto p-3 !pt-20">
        <h1 className="text-sm text-gray-500 dark:text-gray-400 italic">Dashboard</h1>
        <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl py-3 pb-9">Hola {session?.user.name}</h2>
        <article className="rounded-lg border border-gray-200 p-4 shadow-sm transition hover:shadow-lg dark:border-slate-700 dark:shadow-gray-700/25 sm:p-6">
          <span
            className="inline-block rounded bg-primary-600 p-2 text-white dark:bg-primary-700">
            <GraduationCap size={25} />
          </span>
          <Link href="https://discord.gg/FysAu4AbXH">
            <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
              Únete a nuestra comunidad en Discord
            </h3>
          </Link>

          <p
            className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3 dark:text-gray-400"
          >
            Conoce a otros developers, comparte tus dudas, entérate de proyectos nuevos, forma parte en la toma de decisiones para el futuro de Enzan.
          </p>

          <Link
            href="https://discord.gg/FysAu4AbXH"
            className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600"
            target="_blank"
          >Ir a la comunidad
            <span
              aria-hidden="true"
              className="block transition group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </article>
        <section className="flex lg:grid lg:grid-cols-3 py-8 gap-3 flex-wrap md:flex-nowrap">
          <DashboardLink href={"/dashboard/projects/build"} text={"Crea un proyecto"} />
          <DashboardLink href={"/dashboard/user/project"} text={"Revisa tus proyectos"} />
          <DashboardLink href={"/dashboard/projects"} text={"Busca proyectos"} />
        </section>
        <section>
          <h2 className="py-3 scroll-m-20 text-2xl font-semibold tracking-tight">Estadísticas</h2>
          {user && <UserStatistics user={user} />}
        </section>
      </div>
    </Layout>
  )
}

export default Dashboard
