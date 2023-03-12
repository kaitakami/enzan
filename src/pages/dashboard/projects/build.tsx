import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/router'
import { api } from '@/utils/api'
import Layout from '@/components/layout/Dashboard/Layout'
import MdxEditor from '@/components/dashboard/MDX/MdxEditor'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { slugify } from '@/utils/slugify'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'


export interface FormState {
  name: string,
  slug: string,
  repoLink: string
  public: boolean,
  finished: boolean,
  duration: number,
  description: string,
  tags: string[],
  languages: string[]
}


const Build = () => {
  const [form, setForm] = useState<FormState>({ name: '', slug: '', repoLink: '', public: true, duration: 7, description: "", finished: false, tags: [], languages: [] })
  const [tagInput, setTagInput] = useState<string>('')
  const { toast } = useToast()
  const router = useRouter()
  const { data: languages } = api.language["get-all"].useQuery()
  const createProject = api.project["create"].useMutation()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'name') {
      setForm({
        ...form,
        [name]: value,
        slug: slugify(value)
      })
    } else if (name === 'duration') {
      setForm({ ...form, [name]: parseInt(value) })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleCheckboxChange = (e: string | boolean, name: string) => {
    setForm((prevForm) => ({ ...prevForm, [name]: e }))
  }

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value)
  }

  const removeTag = (tagName: string) => {
    setForm((prevForm) => ({ ...prevForm, tags: prevForm.tags.filter((tag) => tag !== tagName) }))
  }

  const handleTagSubmit = () => {
    if (tagInput.length > 0 && !form.tags.includes(tagInput)) {
      setForm((prevForm) => ({ ...prevForm, tags: [...prevForm.tags, tagInput] }))
      setTagInput('')
    }
  }

  const handleLanguageSelect = (name: string) => {
    if (form.languages.includes(name)) {
      setForm((prevForm) => ({ ...prevForm, languages: prevForm.languages.filter((lang) => lang !== name) }))
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        languages: [...prevForm.languages, name]
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createProject.mutateAsync(form)
      .then(({ error }) => {
        if (error) {
          toast({ variant: 'destructive', title: "Error! 🚫", description: error })
        } else {
          router.push(`/dashboard/projects/${form.slug}`).finally(() => toast({ variant: 'default', title: "Proyecto creado! ✅", description: "El proyecto ha sido creado correctamente" }))
        }
      })
      .catch((err: Error) => err)
  }

  return (
    <Layout>
      <section className='mx-auto py-14 w-full px-4 sm:px-8'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='pb-4 text-3xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-800 bg-clip-text text-transparent dark:text-slate-100'>
            Crea un nuevo proyecto
          </h1>
          <form className='space-y-5 mx-auto pt-5' onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-1.5 mx-auto">
              <Label htmlFor='name'>Nombre del proyecto *</Label>
              <div>
                <Input
                  value={form.name}
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Crear un chatbot usando la API de chatGPT..." onChange={handleInputChange}
                  max={240}
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 text-right pt-1" >{form.name.length} / 240</p>
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5 mx-auto">
              <Label htmlFor='slug'>Slug</Label>
              <Input disabled value={form.slug} type="text" id="slug" name='slug' placeholder="https://enzan.kaitakami.dev/dashboard/projects/..." max={240} required />
            </div>
            <div className="grid w-full items-center gap-1.5 mx-auto">
              <Label htmlFor='repoLink'>URL del repositorio</Label>
              <Input value={form.repoLink} type="url" id="repoLink" name='repoLink' onChange={handleInputChange} placeholder="https://github.com/kaitakami/enzan" max={800} />
            </div>
            <div className="grid w-full items-center gap-1.5 mx-auto">
              <Label htmlFor='duration'>Duración</Label>
              <div>
                <Input
                  value={form.duration}
                  type="number"
                  id="duration"
                  name="duration"
                  placeholder="Escribe el número de dias. ex) 1 semana = 7" onChange={handleInputChange}
                  min={1} max={365} />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5 mx-auto">
              <Label htmlFor='tag'>Tags</Label>
              <div className='flex gap-4'>
                <Input
                  value={tagInput}
                  type="text"
                  id="tag"
                  name="tag"
                  placeholder="Agrega tags relacionados con tu proyecto" onChange={handleTagInput}
                  max={50}
                />
                <Button variant="outline" className="sm:w-full sm:max-w-xs" onClick={handleTagSubmit} type='button'>Agregar</Button>
              </div>
              <div className='flex flex-wrap gap-2 py-2'>
                {form.tags.map((tag) => (
                  <span key={tag} className="bg-primary-200 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-800 dark:text-primary-300" onClick={() => removeTag(tag)}>{tag}</span>
                ))}
              </div>
            </div>
            {/*  */}
            <div className="grid w-full items-center gap-1.5 mx-auto">
              <Label htmlFor='tag'>Lenguajes</Label>
              <div className='flex flex-wrap gap-2 py-2'>
                {languages ? languages.map(({ name }) => (
                  <span onClick={() => handleLanguageSelect(name)} key={name} className={`${form.languages.includes(name) ? "dark:bg-blue-900 dark:text-blue-300 text-blue-800 bg-blue-100" : "dark:bg-gray-900 dark:text-gray-300 text-gray-800 bg-gray-100"} text-xs font-medium py-2 px-3 rounded cursor-default select-none hover:dark:bg-blue-900 hover:bg-blue-100 transition-colors`}>
                    {name}
                  </span>
                )) : "Cargando..."}
              </div>
            </div>
            {/*  */}
            <MdxEditor state={form.description} handleState={handleInputChange} name='description' placeholder='Escribe una descripción de tu proyecto en sintaxis MDX o texto plano' />
            <div className='flex flex-wrap sm:space-x-4 space-y-3 sm:space-y-0 flex-col sm:flex-row'>
              <div className="flex items-center space-x-2">
                <Checkbox id='public' checked={form.public} onCheckedChange={(e) => handleCheckboxChange(e, 'public')} defaultChecked name='public' />
                <Label htmlFor="public">¿Hacer proyecto público? *</Label>
              </div>
              <div>
              </div>
              <div className="flex items-center space-x-2 ">
                <Checkbox id='finished' name='finished' checked={form.finished} onCheckedChange={(e) => handleCheckboxChange(e, 'finished')} />
                <Label htmlFor="finished">Proyecto finalizado *</Label>
              </div>
            </div>
            <Button variant='colored' className='px-6 py-6 mx-auto w-full'>Crear</Button>
          </form>
        </div>
      </section>
    </Layout>
  )
}

export default Build
