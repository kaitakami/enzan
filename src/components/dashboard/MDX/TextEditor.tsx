import React from 'react'
import { Textarea } from "@/components/ui/textarea"

const TextEditor: React.FC<{ value: string, handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, name: string, placeholder: string }> = ({ value, handleChange, name, placeholder }) => {
  return (
    <Textarea className='h-[350px]' placeholder={placeholder} name={name} value={value} onChange={(e) => handleChange(e)} required />
  )
}

export default TextEditor
