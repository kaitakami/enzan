"use client"
import { useState } from "react"
import { useRouter } from "next/router"
import { useToast } from "@/hooks/use-toast"
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
import { Textarea } from "@/components/ui/textarea"

import { api } from "@/utils/api"

function validURL(str: string) {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}

const EditProfile = () => {
  const [updatedInfo, setUpdatedInfo] = useState({ name: "", description: "", githubURL: "" })
  const { toast } = useToast()
  const router = useRouter()
  const userUpdateMutation = api.user["edit-profile"].useMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (updatedInfo.name === "" && updatedInfo.description === "" && updatedInfo.githubURL === "") {
      toast({ variant: "destructive", title: "Error", description: "No puedes guardar cambios sin llenar ningún campo" })
    } else {
      if (updatedInfo.githubURL) {
        if (validURL(updatedInfo.githubURL)) {
          const url = new URL(updatedInfo.githubURL)
          if (url.hostname !== "github.com") {
            toast({ variant: "destructive", title: "Error", description: "La URL de GitHub no es válida" })
            return
          }
        } else {
          toast({ variant: "destructive", title: "Error", description: "La URL de GitHub no es válida" })
          return
        }
      }

      if (updatedInfo.description.length > 500) {
        toast({ variant: "destructive", title: "Error", description: "La descripción no puede ser mayor a 500 caracteres" })
        return
      }

      userUpdateMutation.mutate(updatedInfo)
      router.reload()
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Editar mi perfil</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edita tu perfil</DialogTitle>
          <DialogDescription>
            Actualiza tu nombre y descripción aquí. Guarda los cambios al terminar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input id="name" name="name" value={updatedInfo.name} className="col-span-3" onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="githubURL" className="text-right">
              La URL de tu perfil de GitHub
            </Label>
            <Input type="url" id="githubURL" name="githubURL" value={updatedInfo.githubURL} className="col-span-3" onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="description" className="text-right">
              Descripción
            </Label>
            <Textarea id="description" name="description" value={updatedInfo.description} className="col-span-3" maxLength={500} onChange={handleChange} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfile
