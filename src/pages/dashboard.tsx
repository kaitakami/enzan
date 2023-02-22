import Layout from "@/components/layout/Dashboard/Layout"
import { Button } from "@/components/ui/button"
import type { NextPage } from "next"
import { useSession, signOut } from "next-auth/react"
import Sidebar from "@/components/layout/Dashboard/Sidebar"

const Dashboard: NextPage = () => {
  const { data: session } = useSession()
  return (
    <Layout>
      <>
      <div className="flex">
        <Sidebar />
        <div className="">
          <h1>Dashboard</h1>
          <Button variant={'destructive'} onClick={() => { signOut().catch((err) => console.log(err)) }}>Sign Out</Button>
          <h2>Welcome back! {session?.user.name}</h2>
        </div>
      </div>
      </>
    </Layout>
  )
}

export default Dashboard
