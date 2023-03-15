
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { convertDuration } from "@/utils/cleanDuration";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import AdmissionDialog from "./AdmissionDialog";
import AdmissionList from "./AdmissionList";
import { buttonVariants } from "@/components/ui/button";
import { Github } from "lucide-react";
import UpdateDialog from "./UpdateDialog";
import UpdateCollapsible from "@/components/dashboard/UpdateCollapsible";
import { type Project } from '@/pages/dashboard/projects/[slug]';

const ProjectInfo: React.FC<{ project: Project, authenticated: boolean, sessionId: string | null }> = ({ project, authenticated, sessionId }) => {

  const isUserPartOfProject = project?.members.some((member) => member.id === sessionId)

  return (
    <section className="max-w-6xl px-3 mx-auto">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{project?.name}</h1>
      <div className="flex flex-wrap gap-2 py-5">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{convertDuration(project?.duration || 0)}</span>
        {project?.languages.map(({ name }) => (
          <span key={name} className="bg-primary-200 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-800 dark:text-primary-300">{name}</span>
        ))}
        {project?.tags.map((tag) => (
          <span key={tag} className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{tag}</span>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {project?.members.map((member) => (
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
      {project ? (
        <>
          {project?.repositoryUrl && (
            <Link href={project.repositoryUrl} className={buttonVariants({ className: "mt-5" })} target="_blank">
              <Github />
              URL repositorio
            </Link>
          )}
          {isUserPartOfProject && (
            <UpdateDialog projectId={project.id} />
          )}
          {!isUserPartOfProject && authenticated && (
            <AdmissionDialog projectId={project.id} />
          )
          }
          {isUserPartOfProject && (
            <AdmissionList admissions={project.admissions} />
          )}
          {project.updates.length > 0 && (
            <UpdateCollapsible updates={project.updates} showContent={true} />
          )}
          <Separator orientation="horizontal" className="mt-5" />
          <div className="md:prose-base prose-sm py-5">
            <ReactMarkdown>
              {project.description}
            </ReactMarkdown>
          </div>
        </>
      ) : ""}
    </section>
  )
}

export default ProjectInfo
