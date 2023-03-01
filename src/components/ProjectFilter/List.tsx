import { useState } from "react";
import { api } from "@/utils/api"
import type { FilterState } from "./ProjectsSection";
import { convertDuration } from "@/utils/cleanDuration";
import Link from "next/link"
import { Button } from "@/components/ui/button"

const List: React.FC<{ filters: FilterState }> = ({ filters }) => {
  const [pagination, setPagination] = useState(5)

  const { data: projects } = api.project['get-all-filters'].useQuery(filters);

  const handlePagination = (page: 5 | -5) => {
    setPagination(prevPagination => prevPagination + page)
  }

  return (
    <>
      <section className="max-w-6xl lg:px-0 px-3 m-auto pt-10 w-full">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 justify-center py-8 mx-auto">
          {!projects ? (<>
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </>)
            :
            <>
              {projects.length === 0 ?
                <Link href="/dashboard/projects/build" className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">No hay proyectos 😞</h5>
                  Puedes crear tu propio proyecto o intentar cambiando los filtros.
                  <p className="font-normal text-gray-700 dark:text-gray-400"></p>
                </Link>
                :
                <>
                  {projects.slice(pagination - 5, pagination).map(({ name, duration, languages, description, tags }) => (
                    <Link key={name} href="#" className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
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
                      <p className="font-normal text-gray-700 dark:text-gray-400">{`${description.split(" ").slice(0, 23).join(" ")}${description.split(" ").length > 23 ? "..." : ""}`}</p>
                    </Link>
                  ))}
                </>
              }
            </>
          }</div>
        {projects && <>
          {projects.length ? (
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-700 dark:text-gray-400">
                Mostrando desde <span className="font-semibold text-gray-900 dark:text-white">{projects.length}</span> a <span className="font-semibold text-gray-900 dark:text-white">{Math.min(pagination, projects.length || 0)}</span> de <span className="font-semibold text-gray-900 dark:text-white">{projects.length}</span> Proyectos
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <Button variant="outline" className="rounded-r-none" onClick={() => handlePagination(-5)}>
                  Anterior
                </Button>
                <Button variant="outline" className="rounded-l-none" onClick={() => handlePagination(5)}>
                  Siguiente
                </Button>
              </div>
            </div>
          ) : ""}</>}
      </section>
    </>
  )
}

export default List


const Placeholder = () => {
  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h3 className="sr-only">Placeholder</h3>
      <div className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white dark:bg-slate-600 h-8 rounded-md w-1/2 bg-slate-300 animate animate-pulse"></div>
      <div className="flex flex-wrap gap-2">
        <span className="bg-blue-100 px-2 py-0.5 rounded dark:bg-blue-900 w-12 h-5 animate-pulse" />
        <span className="bg-primary-100 px-2 py-0.5 rounded dark:bg-primary-900 w-12 h-5 animate-pulse" />
        <span className="bg-primary-100 px-2 py-0.5 rounded dark:bg-primary-900 w-12 h-5 animate-pulse" />
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400 rounded-md w-full dark:bg-slate-600 bg-slate-300 animate animate-pulse h-12 p-7 lg:h-1/2 mt-3"></p>
    </div>
  )
}
