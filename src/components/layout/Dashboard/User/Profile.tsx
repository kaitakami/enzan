import { useState } from "react"
import type { UserWithProjects } from "@/pages/dashboard/user/[...userId]"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Project from "@/components/ProjectCard"
import { Button } from "@/components/ui/button"
import UpdateCollapsible from "@/components/dashboard/UpdateCollapsible"
import { Github } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

const Profile: React.FC<{ user: UserWithProjects }> = ({ user }) => {
  const [showMore, setShowMore] = useState({
    projects: 3,
    admissions: 3,
  })
  const handleShowMore = (type: string) => {
    if (type === 'projects') {
      setShowMore({
        ...showMore,
        projects: showMore.projects + 3,
      })
    }
  }

  return (
    <>
      <section className="max-w-6xl space-y-8 rounded mx-auto">
        <div className="flex flex-wrap gap-8">
          <Avatar className="w-24 h-24 md:w-36 md:h-36">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback>{user.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h1 className="my-auto scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{user.name}</h1>
          {user.githubURL && (
            <Link href={user.githubURL} className={buttonVariants({ className: "gap-2 my-auto" })} target="_blank">
              <Github />
            </Link>
          )}
        </div>
        <p className="max-w-4xl dark:text-slate-200 text-slate-700">
          {user.description}
        </p>
        <div className="flex flex-wrap md:flex-nowrap mx-auto gap-5">
          <div className="flex flex-col justify-center text-center md:px-14 py-10 space-y-2 dark:bg-slate-900 bg-slate-200 rounded-md  shadow-xl sm:max-w-xs w-full mx-auto">
            <h3 className="text-xl font-semibold">
              Proyectos
            </h3>
            <span className="text-2xl font-extrabold">{user.projects.length}</span>
          </div>
          <div className="flex flex-col justify-center text-center md:px-14 py-10 space-y-2 dark:bg-slate-900 bg-slate-200 rounded-md shadow-xl sm:max-w-xs w-full mx-auto">
            <h3 className="text-xl font-semibold whitespace-nowrap">
              Puntos 🎉
            </h3>
            <span className="text-2xl font-extrabold">{user.points}</span>
          </div>
          <div className="flex flex-col justify-center text-center md:px-14 py-10 space-y-2 dark:bg-slate-900 bg-slate-200 rounded-md shadow-xl sm:max-w-xs w-full mx-auto">
            <h3 className="text-xl font-semibold">
              Updates
            </h3>
            <span className="text-2xl font-extrabold">
              {user._count.updates}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">Proyectos</h2>
          {user.projects.length === 0 && (
            <article
              className="animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:400%_400%] p-0.5 shadow-xl transition [animation-duration:_6s] dark:shadow-gray-700/25 max-w-md"
            >
              <div className="rounded-[10px] bg-white dark:bg-gray-900 sm:p-6">
                <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
                  No hay proyectos aún
                </h3>
              </div>
            </article>

          )}
          <div className="flex flex-wrap md:grid md:grid-cols-2 gap-5">
            {user.projects.slice(0, showMore.projects).map(project => (
              <Project key={project.slug} project={project} />
            ))}
          </div>
          {showMore.projects < user.projects.length &&
            (<div>
              <Button variant="outline" className="block mx-auto" onClick={() => handleShowMore('projects')}>Mostrar más</Button>
            </div>)
          }
        </div>
        <UpdateCollapsible updates={user.updates} />
      </section>
    </>
  )
}

export default Profile
