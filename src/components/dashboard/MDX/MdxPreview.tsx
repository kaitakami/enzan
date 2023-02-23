import React from 'react'
import ReactMarkdown from 'react-markdown';

const MdxPreview: React.FC<{ value: string }> = ({ value }) => {
  return (
    <ReactMarkdown className='md:prose-base prose-sm lg:prose-lg h-full'>
      {value}
    </ReactMarkdown>
  )
}

export default MdxPreview
