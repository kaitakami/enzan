import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { Search } from "lucide-react"

const ProjectsList = () => {
  return (
    <>
      <section className="max-w-5xl m-auto px-3 md:px-0">
        <form className="flex gap-5 md:flex-nowrap flex-wrap">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Lenguaje" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="C">C</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Duración" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="<7"> {`<`} 1 semana</SelectItem>
              <SelectItem value="7">1 semana</SelectItem>
              <SelectItem value="14">2 semanas</SelectItem>
              <SelectItem value="30">1 mes</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tags" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="vue">Vue.js</SelectItem>
              <SelectItem value="Svelte">Svelte</SelectItem>
              <SelectItem value="nextjs">Next.js</SelectItem>
            </SelectContent>
          </Select>
          <Input type="text" placeholder="Busca proyectos" />
          <Button className="md:w-auto w-full" type="submit"><Search className="p-1" />Buscar</Button>
        </form>
      </section>
      <section className="max-w-5xl md:px-0 px-3 m-auto pt-10">
        <button type="button" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 mr-auto">
          <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          Crear un proyecto
        </button>
        <div className="flex flex-wrap gap-3 justify-center py-8">
          <Link href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create to do list with real database</h5>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">1 semana</span>
              <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">TypeScript</span>
              <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">Next.js</span>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400">Hi there! Me gustaría crear un proyecto en inglés usando una base de datos real, soy frontend pero quiero profundizar más en backend</p>
          </Link>
          <Link href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create to do list with real database</h5>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">1 mes</span>
              <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">TypeScript</span>
              <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">Remix</span>
              <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">TailwindCSS</span>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400">Estoy buscando crear un side hustle con código, más que experimentar con nuevas tecnologías, quiero encontrar a alguien que quiera generar un ingreso extra y un trabajo extra</p>
          </Link>
          <Link href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Product Hunt hispano</h5>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">2 semanas</span>
              <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">T3 stack</span>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400">Quiero empezar a crear proyectos full stack con T3 stack, tengo una idea de crear el producthunt hispano</p>
          </Link>
        </div>
      </section>
    </>
  )
}

export default ProjectsList
