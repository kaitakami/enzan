import { type RouterOutputs } from "@/utils/api";
type User = RouterOutputs["user"]["get"]

const UserStatistics: React.FC<{ user: User }> = ({ user }) => {
  if (user) {
    return (
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
    )
  } else {
    return (
      <div className="grid w-full place-content-center">
        <div className="flex items-center gap-2 text-gray-500">
          <span className="h-6 w-6 block rounded-full border-4 border-t-blue-300 animate-spin"></span>
          loading...
        </div>
      </div>
    )
  }
}

export default UserStatistics
