import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/siteConfig"
import { MainNav } from "./mainNav"
import ThemeChanger from "@/components/layout/ThemeChanger"
import { signIn, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const Navbar = () => {
  const session = useSession()
  return (
    <header className="w-full top-0 z-40 absolute border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex h-16 items-center m-auto px-3">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {session.status === "unauthenticated" ? <Button
              size={"sm"}
              variant={"outline"}
              className="text-slate-700 dark:text-slate-400 umami--click--sign-in-navbar"
              onClick={() => { signIn("github").catch(err => console.log(err)) }}
            >
              <span>Inicia sesión</span>
            </Button> : (
              <Link href="/dashboard/profile">
                <Avatar>
                  {session.data?.user.image && <AvatarImage src={session.data?.user.image} />}
                  <AvatarFallback className="uppercase">{session.data?.user.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </Link>
            )}
            <ThemeChanger />
          </nav>
        </div>
      </div>
    </header >
  )
}

export default Navbar
