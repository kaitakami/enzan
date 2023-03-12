import DashboardLayout from "@/components/layout/Dashboard/Layout"
import { api } from "@/utils/api"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import type { RouterOutputs } from "@/utils/api"
import Loading from "@/components/Loading"
import ProjectCard from "@/components/ProjectCard"
import Link from "next/link"
import { buttonVariants } from '@/components/ui/button';

type User = RouterOutputs["user"]["get"]

const UserProjects = () => {
  const session = useSession()
  const [user, setUser] = useState<User | null>(null)
  const { data: userQuery } = api.user.get.useQuery({ id: session.data?.user.id })
  useEffect(() => {
    if (userQuery) {
      setUser(userQuery)
    }
  }, [userQuery])

  return (
    <DashboardLayout>
      {user ? (
        <div className="max-w-6xl mx-auto pt-20 w-full px-3 space-y-5">
          {user.projects.length === 0 ? (
            <article
              className="animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:400%_400%] p-0.5 shadow-xl transition [animation-duration:_6s] dark:shadow-gray-700/25"
            >
              <div className="rounded-[10px] bg-white dark:bg-gray-900 sm:p-6">
                <Link href="#">
                  <h1 className="mt-10 scroll-m-20 border-b-slate-200 text-4xl font-semibold tracking-tight transition-colors first:mt-0 pb-20 pt-5 text-center">Empieza creando o uniendote a un proyecto</h1>
                </Link>
                <div className="max-w-lg w-full mx-auto flex gap-2 sm:flex-nowrap flex-wrap p-2">
                  <Link href="/dashboard/projects/build" className={buttonVariants({ variant: 'colored', className: 'w-full' })}>
                    Crear
                  </Link>
                  <Link href="/dashboard/projects" className={buttonVariants({ variant: 'default', className: 'w-full' })}>
                    Buscar
                  </Link>
                </div>
              </div>
            </article>
          ) : (
            <section>
              <h1 className="mt-10 scroll-m-20 border-b border-b-slate-200 pb-8 text-4xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700">Gestiona tus proyectos</h1>
              <div className="w-full flex flex-wrap gap-3">
                {user.projects.map((project) => (
                  <ProjectCard key={project.slug} project={project} addButtons={true} />
                ))}
              </div>
            </section>
          )}
        </div>)
        : <Loading />}
    </DashboardLayout>
  )
}

export default UserProjects
