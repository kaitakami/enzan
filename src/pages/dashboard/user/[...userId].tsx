import { useSession } from "next-auth/react"
import DashboardLayout from '@/components/layout/Dashboard/Layout';
import Layout from "@/components/layout/app/Layout";
import type { GetServerSideProps, NextPage } from 'next';
import type { Project, User, Admission } from "@prisma/client";
import Profile from "@/components/layout/Dashboard/User/Profile";

export interface UserWithProjectsAndAdmissions extends User {
  projects: Project[],
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
        <div className="mx-auto pt-16 w-screen max-w-6xl">
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
    include: {
      projects: true,
      admissions: true
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
