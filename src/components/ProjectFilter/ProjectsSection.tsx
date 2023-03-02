import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import List from './List';
import { api } from "@/utils/api"

export interface FilterState {
  language: string | undefined,
  duration: "7" | "14" | "30" | ">30" | undefined,
  search?: string | undefined,
}


const ProjectsSection = () => {
  const [filterState, setFilterState] = useState<FilterState>({
    language: undefined,
    duration: undefined,
    search: "",
  })
  const { data: languages } = api.language['get-all'].useQuery();

  const handleFormChange = (e: string, name: string) => {
    setFilterState({ ...filterState, [name]: e })
  }

  return (
    <>
      <section className="max-w-6xl m-auto px-3 lg:px-0 space-y-5">
        <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Proyectos públicos</h2>
        <form className="flex gap-5 md:flex-nowrap flex-wrap">
          <Select value={filterState.language} onValueChange={(e) => handleFormChange(e, "language")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Lenguaje" />
            </SelectTrigger>
            <SelectContent>
              {languages?.map(({ name }) => (
                <SelectItem key={name} value={name}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterState.duration} onValueChange={(e) => handleFormChange(e, "duration")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Duración" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">1 semana</SelectItem>
              <SelectItem value="14">2 semanas</SelectItem>
              <SelectItem value="30">1 mes</SelectItem>
              <SelectItem value=">30">{`>`} 1 mes</SelectItem>
            </SelectContent>
          </Select>
          <Input type="text" name="search" onChange={(e) => handleFormChange(e.target.value, e.target.name)} value={filterState.search} placeholder="Busca proyectos" />
        </form>
        <Link href="/dashboard/projects/build" className={buttonVariants({
          variant: 'colored',
          size: 'lg',
          className: 'w-full md:w-auto'
        })}>
          <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          Crear un proyecto
        </Link>
      </section>
      <List filters={filterState} />
    </>
  )
}

export default ProjectsSection
