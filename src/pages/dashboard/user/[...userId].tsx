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
  if (session.data?.user.id === userQueryId[0]) {
    return (
      <>
        <DashboardLayout>
          <div className="mx-auto pt-20 w-full">
            <Profile user={userInfo} />
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
      admissions: true,
      name: true,
      points: true,
      image: true,
      id: true,
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
  const serializedUserInfo: UserWithProjectsAndAdmissions = JSON.parse(JSON.stringify(userInfo))

  return {
    props: {
      userInfo: serializedUserInfo,
      userQueryId: query.userId
    }
  }
}
