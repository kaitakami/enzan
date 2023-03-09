import { useState } from "react"
import { ChevronsUpDown } from "lucide-react"
import type { UserWithProjectsAndAdmissions } from "@/pages/dashboard/user/[...userId]"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Project from "@/components/ProjectCard"
import { Button } from "@/components/ui/button"

const Profile: React.FC<{ user: UserWithProjectsAndAdmissions }> = ({ user }) => {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false)
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
          {user.admissions.map(admission => (
            <div key={admission.createdAt.toString()}>
              {admission.projectId}
            </div>
          ))}
        </div>
        <div>
          <Collapsible
            open={isCollapsibleOpen}
            onOpenChange={setIsCollapsibleOpen}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <h2 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">Updates</h2>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Abrir</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            {user.updates.length === 0 ?
              <div className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700">
                No hay updates
              </div>
              :
              <>
                <div className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700">
                  {/* TODO: Show updates and make it safe type */}
                  First update
                </div>
                <CollapsibleContent className="space-y-2">
                  <div className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700">
                    @radix-ui/colors
                  </div>
                  <div className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700">
                    @stitches/react
                  </div>
                </CollapsibleContent>
              </>}
          </Collapsible>
        </div>
      </section>
    </>
  )
}

export default Profile
