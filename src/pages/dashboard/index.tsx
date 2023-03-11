import { useToast } from "@/hooks/use-toast"
import Layout from "@/components/layout/Dashboard/Layout"
import type { NextPage } from "next"
import { useSession } from "next-auth/react"
import { GraduationCap } from "lucide-react"
import Link from "next/link"
import DashboardLink from "@/components/layout/Dashboard/DashboardLink"
import UserStatistics from "@/components/layout/Dashboard/User/UserStatistics"
import { api } from "@/utils/api"
import { Button } from "@/components/ui/button"

const Dashboard: NextPage = () => {
  const { toast } = useToast()
  const { data: session } = useSession()
  const ctx = api.useContext()
  const { data: user } = api.user["get"].useQuery({ id: session?.user.id })
  const cancelAdmission = api.admission["reject"].useMutation()

  const removeAdmission = (admissionId: string) => {
    cancelAdmission.mutate({ admissionId })
    toast({ title: "La admisión fue cancelada exitosamente ✅" })

    ctx.user.get.invalidate().catch(() => toast({ variant: "destructive", title: "Hubo un problema recargando la información" }))
  }
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
          <DashboardLink href={"/dashboard/user/projects"} text={"Revisa tus proyectos"} />
          <DashboardLink href={"/dashboard/projects"} text={"Busca proyectos"} />
        </section>
        <section>
          <h2 className="py-3 scroll-m-20 text-2xl font-semibold tracking-tight">Estadísticas</h2>
          {user && <UserStatistics user={user} />}
        </section>
        <section className="py-3">
          <h2 className="py-3 scroll-m-20 text-2xl font-semibold tracking-tight">Tus admisiones</h2>
          <div className="md:grid lg:grid-cols-3 md:grid-cols-2 flex flex-wrap gap-3">
            {user?.admissions.length === 0 && (
              <article
                className="animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:400%_400%] p-0.5 shadow-xl transition [animation-duration:_6s] hover:shadow-sm dark:shadow-gray-700/25"
              >
                <div className="rounded-[10px] bg-white dark:bg-gray-900 sm:p-6">
                  <h4 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
                    Aún no has hecho ninguna admisión.
                  </h4>
                </div>
              </article>
            )}
            {user?.admissions.map((admission) => (
              <div key={admission.id} className="group relative block h-64 sm:h-80 lg:h-96 w-full">
                <span className="absolute inset-0 border-2 border-dashed border-black rounded"></span>
                <div
                  className="relative flex h-full transform py-10 border-2 border-black bg-white dark:bg-slate-900 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 rounded"
                >
                  <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
                    <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">{admission.project.name}</h4>
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      {admission.createdAt.toLocaleDateString('es-ES')}
                    </time>
                  </div>
                  <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8 overflow-y-auto flex flex-col justify-between">
                    <div>
                      <Link href={`/dashboard/projects/${admission.project.slug}`} className="mt-4 text-xl font-medium sm:text-2xl">{admission.project.name}</Link>
                      <p className="mt-4 leading-7 [&:not(:first-child)]:mt-6 text-sm dark:text-slate-300 text-slate-800">
                        {admission.content}
                      </p>
                    </div>
                    <Button className="group-hover:hover:bg-red-600" onClick={() => removeAdmission(admission.id)}>Cancelar admisión</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Dashboard
