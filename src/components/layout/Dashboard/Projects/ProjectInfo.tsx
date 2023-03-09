
import type { Project, Admission, Language, Update, User } from "@prisma/client"
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { convertDuration } from "@/utils/cleanDuration";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import AdmissionDialog from "./AdmissionDialog";

interface ProjectWithIncludes extends Project {
  admissions: Admission[]
  languages: Language[]
  updates: Update[]
  members: User[]
  leader: User
}

const ProjectInfo: React.FC<{ project: ProjectWithIncludes, authenticated: boolean, sessionId: string | null }> = ({ project, authenticated, sessionId }) => {

  const isUserPartOfProject = project.members.some((member) => member.id === sessionId)

  return (
    <section className="max-w-6xl px-3 mx-auto">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{project.name}</h1>
      <div className="flex flex-wrap gap-2 py-5">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{convertDuration(project.duration)}</span>
        {project.languages.map(({ name }) => (
          <span key={name} className="bg-primary-200 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-800 dark:text-primary-300">{name}</span>
        ))}
        {project.tags.map((tag) => (
          <span key={tag} className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{tag}</span>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {project.members.map((member) => (
          <HoverCard key={member.name}>
            <HoverCardTrigger>
              <Avatar className="w-14 h-14">
                <AvatarImage src={member.image || ""} alt={`${member.name || ""} github image`} />
                <AvatarFallback>{member.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent>
              <Link href={`/dashboard/user/${member.id}`} className="space-y-2">
                <h4 className="text-sm font-semibold">{member.name}</h4>
                <p className="text-sm">
                  {member.description.slice(0, 63).trim()}{member.description.length > 63 && "..."}
                </p>
              </Link>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
      {/* ADDDD */}
      {isUserPartOfProject && authenticated && (
        <AdmissionDialog projectId={project.id} />
      )
      }
      <Separator orientation="horizontal" className="mt-5" />
      <div className="grid sm:grid-cols-3 pt-12">
        <div className="sm:col-span-2 md:prose-base prose-sm">
          <ReactMarkdown>
            {project.description}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  )
}

export default ProjectInfo