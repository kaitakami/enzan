import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react";
import type { GetServerSideProps, NextPage } from 'next';
import type { Project, User, Language, Admission } from "@prisma/client";
import DashboardLayout from '@/components/layout/Dashboard/Layout';
import Layout from "@/components/layout/app/Layout";
import { Separator } from "@/components/ui/separator";
import Profile from "@/components/layout/Dashboard/User/Profile";
import EditProfile from "@/components/layout/Dashboard/User/EditProfile";
import { Button } from "@/components/ui/button";
import { type Update } from "@/components/dashboard/UpdateCollapsible";

export interface ProjectWithLanguage extends Project {
  languages: Language[]
}

export interface UserWithProjects extends User {
  projects: ProjectWithLanguage[],
  _count: {
    updates: number
  }
  admissions: Admission[]
  updates: Update[]
}

const UserPage: NextPage<{ userInfo: UserWithProjects, userQueryId: string }> = ({ userInfo, userQueryId }) => {
  const { toast } = useToast()
  const session = useSession()
  if (session.data?.user.id === userQueryId[0]) {
    return (
      <>
        <DashboardLayout>
          <div className="mx-auto p-3 space-y-6 pt-20 w-full max-w-6xl">
            <Profile user={userInfo} />
            <Separator orientation="horizontal" />
            <div className="flex gap-3">
              <EditProfile />
              <Button variant={'destructive'} onClick={() => {
                signOut().catch(() => toast({
                  variant: "destructive",
                  title: "Error cerrando sesión",
                }))
              }}>Cerrar sesión</Button>
            </div>
          </div>
        </DashboardLayout>
      </>
    )
  } else {
    return (
      <Layout>
        <div className="pt-16 w-full mx-auto">
          <Profile user={userInfo} />
        </div>
      </Layout>
    )
  }
}

export default UserPage


import { prisma } from "@/server/db";


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      id: String(query.userId)
    },
    select: {
      projects: {
        include: {
          languages: true,
        },
        orderBy: {
          createdAt: "desc"
        }
      },
      _count: {
        select: {
          updates: true
        }
      },
      admissions: true,
      name: true,
      points: true,
      image: true,
      id: true,
      description: true,
      updates: {
        orderBy: {
          createdAt: "desc"
        },
        select: {
          project: {
            select: {
              name: true,
              slug: true,
            }
          },
          title: true,
          createdAt: true,
          content: true,
          id: true,
        }
      }
    },
  })


  if (!userInfo) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const serializedUserInfo: UserWithProjects = JSON.parse(JSON.stringify(userInfo))

  return {
    props: {
      userInfo: serializedUserInfo,
      userQueryId: query.userId
    }
  }
}
