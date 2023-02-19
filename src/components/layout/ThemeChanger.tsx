import { useTheme } from 'next-themes'
import { SunMoon } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { buttonVariants } from '../ui/button'

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  const handleTheme = () => {
    setTheme(theme === 'white' ? 'dark' : 'white')
  }

  return (
    <div
      onClick={() => {
        handleTheme()
        toast({
          description: <div className=''>Theme changed</div>,
          duration: 1500
        })
      }}
      className={buttonVariants({
        size: "sm",
        variant: "ghost",

        className: "text-slate-700 dark:text-slate-400",
      })}
    >
      <SunMoon className='h-5 w-5' />
      <span className="sr-only">Theme toggle</span>
    </div>
  )
}

export default ThemeChanger
