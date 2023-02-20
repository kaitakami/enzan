import Layout from "@/components/Dashboard/Layout"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"

const dashboard = () => {
  const { data: session } = useSession()
  return (
    <Layout>
      <>
        <h1>Dashboard</h1>
        <Button variant={'destructive'} onClick={() => signOut()}>Sign Out</Button>
        <h2>Welcome back! {session?.user.name}</h2>
      </>
    </Layout>
  )
}

export default dashboard
