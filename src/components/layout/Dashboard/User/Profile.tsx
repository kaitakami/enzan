import type { UserWithProjectsAndAdmissions } from "@/pages/dashboard/user/[...userId]"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Profile: React.FC<{ user: UserWithProjectsAndAdmissions }> = ({ user }) => {
  return (
    <>
      <section className="p-3 max-w-6xl w-screen space-y-7 rounded">
        <div className="flex flex-wrap gap-8">
          <Avatar className="w-24 h-24 md:w-36 md:h-36">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <h1 className="my-auto scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{user.name}</h1>
        </div>
        <div className="flex justify-between max-w-4xl dark:bg-slate-900 p-5 mx-auto">
          <div className="flex flex-col justify-center text-center">
            <h3>
              Projectos
            </h3>
            <span>{user.projects.length}</span>
          </div>
          <div className="flex flex-col justify-center text-center">
            <h3>
              Puntos
            </h3>
            <span>{user.points}</span>
          </div>
          <div className="flex flex-col justify-center text-center">
            <h3>
              {/* User can make an update every day for each project */}
              Updates
            </h3>
            <span>
              {/* User updates */}
              3</span>
          </div>
        </div>
        <div>
          {user.projects.map(project => (
            <div key={project.slug}>
              {project.name}
            </div>
          ))}
          {user.admissions.map(admission => (
            <div key={admission.createdAt.toString()}>
              {admission.projectId}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Profile
