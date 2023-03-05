import { useSession } from "next-auth/react"
import DashboardLayout from '@/components/layout/Dashboard/Layout';
import Layout from "@/components/layout/app/Layout";
import type { GetServerSideProps, NextPage } from 'next';
import type { Project, User, Admission, Language } from "@prisma/client";
import Profile from "@/components/layout/Dashboard/User/Profile";


export interface ProjectWithLanguage extends Project {
  languages: Language[]
}

export interface UserWithProjectsAndAdmissions extends User {
  projects: ProjectWithLanguage[],
  admissions: Admission[]
}

const UserPage: NextPage<{ userInfo: UserWithProjectsAndAdmissions, userQueryId: string }> = ({ userInfo, userQueryId }) => {
  const session = useSession()

  console.log(userInfo)

  if (session.data?.user.id === userQueryId[0]) {
    return (
      <>
        <DashboardLayout>
          <div className="mx-auto pt-20">
            <Profile user={userInfo} />
          </div>
        </DashboardLayout>
      </>
    )
  } else {
    return (
      <Layout>
        <div className="pt-16 flex justify-center">
          <Profile user={userInfo} />
        </div>
      </Layout>
    )
  }
}

export default UserPage


import { prisma } from "@/server/db";


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
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
      admissions: true,
      name: true,
      points: true,
      image: true,
      id: true,
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const serializedUserInfo: UserWithProjectsAndAdmissions = JSON.parse(JSON.stringify(userInfo))

  return {
    props: {
      userInfo: serializedUserInfo,
      userQueryId: query.userId
    }
  }
}
