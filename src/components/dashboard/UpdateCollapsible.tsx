import { useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { ChevronsUpDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from '../ui/button'
import Link from 'next/link'

export interface Update {
  project: {
    name: string
    slug: string
  }
  title: string
  createdAt: Date
  id: string
  content: string
}

const UpdateCollapsible: React.FC<{ updates: Update[], showContent?: boolean }> = ({ updates, showContent = false }) => {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false)

  return (
    <div>
      <Collapsible
        open={isCollapsibleOpen}
        onOpenChange={setIsCollapsibleOpen}
        className="space-y-2"
      >
        <div className="flex items-center justify-between">
          <h2 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">Updates</h2>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Abrir</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        {updates.length === 0 ?
          <div className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700">
            No hay updates
          </div>
          :
          <>
            {updates[0] &&
              (
                <Link href={`/dashboard/projects/${updates[0]?.project.slug}`} className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700 hover:shadow-md transition-shadow flex flex-col space-y-3">
                  <div className='flex justify-between'>
                    <h5>{updates[0].title} <span className='text-sm text-gray-500 dark:text-gray-400'>({updates[0].project.name})</span></h5>
                    <span>
                      {new Date(updates[0].createdAt).toLocaleDateString('es')}
                    </span>
                  </div>
                  {showContent && (
                    <div>
                      <ReactMarkdown>{updates[0].content}</ReactMarkdown>
                    </div>
                  )}
                </Link>
              )}
            <CollapsibleContent className="space-y-2">
              {updates.slice(1).map(update => (
                <Link href={`/dashboard/projects/${update.project.slug}`} key={update.id} className="rounded-md border border-slate-200 px-4 py-3 font-mono text-sm dark:border-slate-700 flex flex-col hover:shadow-md transition-shadow space-y-3">
                  <div className='flex justify-between'>
                    <h5>{update.title} <span className='text-sm text-gray-500 dark:text-gray-400'>({update.project.name})</span></h5>
                    <span>{new Date(update.createdAt).toLocaleDateString('es')}</span>
                  </div>
                  {showContent && (
                    <>
                      <div className='dark:text-gray-200 text-gray-600'>
                        <ReactMarkdown>{update.content}</ReactMarkdown>
                      </div>
                    </>
                  )}
                </Link>
              ))}
            </CollapsibleContent>
          </>}
      </Collapsible>
    </div >
  )
}

export default UpdateCollapsible
