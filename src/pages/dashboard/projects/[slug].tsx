import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { api } from "@/utils/api"
import ProjectInfo from "@/components/layout/Dashboard/Projects/ProjectInfo"
import LayoutDashboard from "@/components/layout/Dashboard/Layout"
import Layout from "@/components/layout/app/Layout"
import Loading from "@/components/Loading"
import { type RouterOutputs } from "@/utils/api"
import { useState, useEffect } from 'react';

export type Project = RouterOutputs["project"]["get"]


const UserProjects = () => {
  const [project, setProject] = useState<Project | undefined>(undefined)
  const session = useSession()
  const router = useRouter()
  const { data, isLoading } = api.project["get"].useQuery({ slug: String(router.query.slug) })
  useEffect(() => {
    setProject(data)
  }, [data])

  if (project) {
    if (session.status === "authenticated") {
      return (
        <LayoutDashboard>
          <div className="mx-auto pt-20 px-3 w-full">
            <ProjectInfo project={project} authenticated={true} sessionId={session.data.user.id} />
          </div>
        </LayoutDashboard>
      )
    }
    else if (session.status === 'unauthenticated') {
      return (
        <Layout>
          <div className="pt-16 mx-auto w-full">
            <ProjectInfo project={project} authenticated={false} sessionId='' />
          </div>
        </Layout>
      )
    }
  } else if (isLoading) {
    return <Loading />
  } else if (!isLoading && project === null) {
    router.push('/404').catch((err) => console.log(err))
  }
}

export default UserProjects
