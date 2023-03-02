import Layout from "@/components/layout/Dashboard/Layout"
import { Button } from "@/components/ui/button"
import type { NextPage } from "next"
import { useSession, signOut } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"

const Dashboard: NextPage = () => {
  const { data: session } = useSession()
  const { toast } = useToast()

  return (
    <Layout>
      <div className="">
        <h1>Dashboard</h1>
        <Button variant={'destructive'} onClick={() => {
          signOut().catch(() => toast({
            variant: "destructive",
            title: "Error cerrando sesión",
          }))
        }}>Cerrar sesión</Button>
        <h2>Welcome back! {session?.user.name}</h2>
      </div>
    </Layout>
  )
}

export default Dashboard
