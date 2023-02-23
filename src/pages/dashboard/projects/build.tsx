import { useState } from 'react'
import React from 'react'
import Layout from '@/components/layout/Dashboard/Layout'
import MdxEditor from '@/components/dashboard/MDX/MdxEditor'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { slugify } from '@/utils/slugify'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'


const Build = () => {
  const [form, setForm] = useState({ name: '', slug: '', public: true, duration: "" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'name') {
      setForm({ ...form, slug: slugify(value) })
    }
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleCheckboxChange = (e: string | boolean, name: string) => {
    setForm((prevForm) => ({ ...prevForm, [name]: e }))
  }

  return (
    <Layout>
      <section className='mx-auto py-14 w-full px-4 sm:px-8'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='pb-4 text-3xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-800 bg-clip-text text-transparent dark:text-slate-100'>
            Crea un nuevo proyecto
          </h1>
          <form className='space-y-3 mx-auto'>
            <div className="grid w-full items-center gap-1.5 mx-auto">
              <Label htmlFor='name'>Nombre del proyecto *</Label>
              <div>
                <Input
                  value={form.name}
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Crear un chatbot usando la API de chatGPT..." onChange={(e) => handleInputChange(e)}
                  max={240} />
                <p className="text-xs text-gray-600 dark:text-gray-400 text-right pt-1" >{form.name.length} / 240</p>
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5 mx-auto">
              <Label htmlFor='slug'>Slug</Label>
              <Input disabled value={form.slug} type="text" id="slug" name='slug' placeholder="https://enzan.kaitakami.dev/dashboard/projects/..." max={240} required />
            </div>
            <div className="grid w-full items-center gap-1.5 mx-auto">
              <Label htmlFor='duration'>Duración</Label>
              <div>
                <Input
                  value={form.duration}
                  type="number"
                  id="duration"
                  name="duration"
                  placeholder="Escribe el número de dias. ex) 1 semana = 7" onChange={(e) => handleInputChange(e)}
                  min={1} max={365} />
              </div>
            </div>
            <MdxEditor />
            <div className='flex flex-wrap sm:space-x-4 space-y-3 sm:space-y-0 flex-col sm:flex-row'>
              <div className="flex items-center space-x-2">
                <Checkbox id='public' checked={form.public} onCheckedChange={(e) => handleCheckboxChange(e, 'public')} defaultChecked name='public' />
                <Label htmlFor="public">¿Hacer proyecto público? *</Label>
              </div>
              <div>
                <Separator orientation='vertical' className='hidden sm:block' />
              </div>
              <div className="flex items-center space-x-2 ">
                <Checkbox id='finished' />
                <Label htmlFor="finished">Proyecto finalizado *</Label>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  )
}

export default Build
