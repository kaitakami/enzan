import { useSession } from "next-auth/react"
import Layout from "@/components/layout/app/Layout"
import DashboardLayout from "@/components/layout/Dashboard/Layout"
import ProjectsList from "@/components/Projects"

const Projects = () => {
  const session = useSession()
  return (
    <div>
      {session.status === "unauthenticated" ?
        <Layout>
          <ProjectsList />
        </Layout>
        :
        <DashboardLayout>
          <div className="mx-auto">
            <ProjectsList />
          </div>
        </DashboardLayout>}
    </div >
  )
}

export default Projects
