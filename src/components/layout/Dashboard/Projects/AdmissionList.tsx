import type { Admission, User } from "@prisma/client"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { api } from "@/utils/api"

interface AdmissionWithUser extends Admission {
  user: User
}

const AdmissionList: React.FC<{ admissions: AdmissionWithUser[] }> = ({ admissions }) => {
  const { toast } = useToast()
  const rejectAdmission = api.admission["reject"].useMutation()
  const acceptAdmission = api.admission["accept"].useMutation()

  const handleAccept = (admission: AdmissionWithUser) => {
    acceptAdmission.mutate({ admissionId: admission.id, userId: admission.user.id, projectId: admission.projectId })
    toast({ title: "La admisión fue aceptada exitosamente! ✅" })
  }

  const handleReject = (admission: AdmissionWithUser) => {
    rejectAdmission.mutate({ admissionId: admission.id })
    rejectAdmission.reset()
    toast({ title: "La admisión fue eliminada exitosamente ✅" })
  }

  return (
    <div className="my-8">
      <h3 className="mt-10 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700">Admisiones</h3>
      <div className="flex gap-3 flex-wrap pt-3">
        {admissions.length === 0 && (
          <article
            className="animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:400%_400%] shadow-xl transition [animation-duration:_6s] hover:shadow-sm dark:shadow-gray-700/25 w-full sm:w-[28rem] p-0.5"
          >
            <div className="rounded-[10px] bg-white dark:bg-gray-900 p-6 w-full max-h-[14rem] relative overflow-y-auto flex flex-col justify-between">
              <h4 className="pb-3 scroll-m-20 text-xl font-semibold tracking-tight">Tu proyecto no tiene admisiones pendientes</h4>
            </div>
          </article>
        )}
        {admissions.map((admission) => (
          <article
            key={admission.id}
            className="animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:400%_400%] p-0.5 shadow-xl transition [animation-duration:_6s] hover:shadow-sm dark:shadow-gray-700/25 w-[24rem]"
          >
            <div className="rounded-[10px] bg-white dark:bg-gray-900 p-6 w-full h-56 relative overflow-y-auto flex flex-col justify-between">
              <div>
                <time
                  dateTime={admission.createdAt.toDateString()}
                  className="block text-xs text-gray-500 dark:text-gray-400 py-1"
                >
                  {admission.createdAt.toDateString()}
                </time>
                <Link href={`/dashboard/user/${admission.user.id}`} className="flex gap-2">
                  <Avatar>
                    <AvatarImage src={admission.user.image || ""} alt={`${admission.user.name || ""} github image`} />
                    <AvatarFallback>{admission.user.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="my-auto text-sm text-gray-600 dark:text-gray-300">{admission.user.name}</span>
                </Link>
                <p className="py-2 text-sm">{admission.content}</p>

              </div>
              <div className="flex justify-between gap-3">
                <Button className="w-full" onClick={() => handleAccept(admission)}>Aceptar</Button>
                <Button variant='destructive' className="w-full" onClick={() => handleReject(admission)}>Eliminar</Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default AdmissionList
