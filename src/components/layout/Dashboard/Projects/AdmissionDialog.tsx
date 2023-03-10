import { useState } from "react";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from "next/router";
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/utils/api";

const AdmissionDialog: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [message, setMessage] = useState("")
  const admissionMutation = api.admission["submit"].useMutation()
  const { toast } = useToast()
  const router = useRouter()
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleSubmit = () => {
    if (message) {
      if (message.length > 600) {
        toast({ variant: 'destructive', title: "El mensaje es muy largo", description: "El mensaje no puede superar los 600 caracteres" })
        return
      }
      admissionMutation.mutate({ message, projectId })
      router.reload()
    } else {
      toast({ variant: 'destructive', title: "Debes escribir un mensaje" })
    }
  }
  return (
    <div className="pt-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="colored">Quiero participar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Haz una admisión</DialogTitle>
            <DialogDescription>
              Envía una admisión para participar en este proyecto. Escribe en que puedes aportar y tus motivaciones.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-3">
              <Label htmlFor="message" className="text-right">
                Mensaje
              </Label>
              <Textarea id="message" className="col-span-3" value={message} onChange={handleMessageChange} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>Enviar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>)
}

export default AdmissionDialog
