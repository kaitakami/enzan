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

interface MutationResult {
  success: boolean
}

const EditProfile = () => {
  const [updatedInfo, setUpdatedInfo] = useState({ name: "", description: "" })
  const { toast } = useToast()
  const router = useRouter()
  const userUpdateMutation = api.user["edit-profile"].useMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (updatedInfo.name === "" && updatedInfo.description === "") {
      toast({ variant: "destructive", title: "Error", description: "No puedes guardar cambios sin cambiar ningún campo" })
    } else {
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input id="name" name="name" value={updatedInfo.name} className="col-span-3" onChange={handleChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
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
