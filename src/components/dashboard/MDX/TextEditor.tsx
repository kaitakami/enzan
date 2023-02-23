import React from 'react'
import { Textarea } from "@/components/ui/textarea"

const TextEditor: React.FC<{ value: string, handleChange: (value: string) => void }> = ({ value, handleChange }) => {
  return (
    <Textarea className='h-[350px]' placeholder="Escribe una descripción de tu proyecto en sintaxis MDX o texto plano" value={value} onChange={e => handleChange(e.target.value)} />
  )
}

export default TextEditor
