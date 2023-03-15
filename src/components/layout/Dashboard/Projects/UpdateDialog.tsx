"use client"

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import MdxEditor from "@/components/dashboard/MDX/MdxEditor"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from '@/utils/api';


const UpdateDialog: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [formState, setFormState] = useState({ title: "", content: "" })
  const { toast } = useToast()
  const ctx = api.useContext()
  const updateMutation = api.update.create.useMutation()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleTextEditor = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (formState.title === "" || formState.content === "") {
      toast({ variant: "destructive", title: "Tienes que rellenar todos los campos" })
    } else if (formState.title.length > 200) {
      toast({ variant: "destructive", title: "El título es demasiado largo" })
    } else {
      updateMutation.mutate({ ...formState, projectId })
      ctx.project.get
        .invalidate()
        .catch(() => toast({ variant: "destructive", title: "Error al crear el update" }))
        .finally(() => {
          toast({ title: "Update creado ✅" })
        })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-5 block" variant="outline">Hacer un update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Has un update</DialogTitle>
          <DialogDescription>
            Escribe las mejoras que has hecho en el proyecto. Los retos que te encontraste y como los superaste.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="title" className="text-right">
              Título
            </Label>
            <Input id="title" value={formState.title} onChange={handleInputChange} name='title' />
          </div>
          <div>
            <Label htmlFor="content" className="text-right">
              Contenido
            </Label>
            <MdxEditor handleState={handleTextEditor} state={formState.content} name='content' placeholder='Escribe el contenido de tu update en sintaxis MDX o texto plano' />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Añadir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateDialog
