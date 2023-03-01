import { useSession } from "next-auth/react"
import Layout from "@/components/layout/app/Layout"
import DashboardLayout from "@/components/layout/Dashboard/Layout"
import ProjectsSection from "@/components/ProjectFilter/ProjectsSection"

const Projects = () => {
  const session = useSession()
  return (
    <div>
      {session.status === "unauthenticated" ?
        <Layout>
          <ProjectsSection />
        </Layout>
        :
        <DashboardLayout>
          <div className="mx-auto pt-20 px-3">
            <ProjectsSection />
          </div>
        </DashboardLayout>}
    </div >
  )
}

export default Projects
