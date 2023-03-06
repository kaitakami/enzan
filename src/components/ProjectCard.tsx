import Link from "next/link"
import { convertDuration } from '../utils/cleanDuration';
import type { Project } from "@prisma/client";
import type { Language } from "@prisma/client";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

interface ProjectWithLanguage extends Project {
  languages: Language[]
}

const ProjectCard: React.FC<{ project: ProjectWithLanguage }> = ({ project }) => {
  const { slug, name, duration, languages, tags, description } = project
  return (
    <Link key={slug} href={`/dashboard/projects/${slug}`} className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
      <div className="flex flex-wrap gap-2">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{convertDuration(duration)}</span>
        {languages.map(({ name }) => (
          <span key={name} className="bg-primary-200 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-800 dark:text-primary-300">{name}</span>
        ))}
        {tags.map((tag) => (
          <span key={tag} className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{tag}</span>
        ))}
      </div>
      <div className="font-normal text-gray-700 dark:text-gray-400">
        <ReactMarkdown>
          {`${description.split(" ").slice(0, 23).join(" ")}${description.split(" ").length > 23 ? "..." : ""}`}
        </ReactMarkdown></div>
    </Link>
  )
}

export default ProjectCard
