import Link from "next/link"
import { ArrowRightCircle } from "lucide-react"
const DashboardLink: React.FC<{ text: string, href: string }> = ({ text, href }) => {
  return (
    <Link href={href}
      className="animate-background rounded-xl bg-gradient-to-r from-primary-500 to-blue-500 p-0.5 shadow-xl transition [animation-duration:_6s] hover:shadow-sm dark:shadow-gray-700/25 w-full"
    >
      <div className="rounded-[10px] bg-white p-4 dark:bg-gray-900 sm:p-6 flex group gap-2">
        <h3 className="mt-0.5 text-lg font-medium whitespace-nowrap text-gray-900 dark:text-white">
          {text}
        </h3>
        <ArrowRightCircle className="group-hover:translate-x-2 my-auto transition-transform" />
      </div>
    </Link>
  )
}

export default DashboardLink
