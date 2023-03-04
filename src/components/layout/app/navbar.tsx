import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { signIn, useSession } from "next-auth/react"
import { siteConfig } from "@/config/siteConfig"
import { MainNav } from "./mainNav"
import ThemeChanger from "@/components/layout/ThemeChanger"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast";
import Link from "next/link"

const Navbar = () => {
  const session = useSession()
  const { toast } = useToast()

  // ANIMATED NAVBAR
  const { scrollY } = useScroll();
  /** this hook manages state **/
  const [hidden, setHidden] = useState(false);

  /** this onUpdate function will be called in the `scrollY.onChange` callback **/
  function update() {
    if (scrollY?.get() <= scrollY?.getPrevious()) {
      setHidden(false);
    } else if (scrollY?.get() >= 100 && scrollY?.get() >= scrollY?.getPrevious()) {
      setHidden(true);
    }
  }

  /** update the onChange callback to call for `update()` **/
  useEffect(() => {
    return scrollY.onChange(() => update());
  });

  /** add this const **/
  const variants = {
    /** this is the "visible" key and it's correlating styles **/
    visible: { opacity: 1, y: 0 },
    /** this is the "hidden" key and it's correlating styles **/
    hidden: { opacity: 0, y: -25 }
  };

  return (
    <motion.nav
      variants={variants}
      viewport={{ once: true }}
      /** it's right here that we match our boolean state with these variant keys **/
      animate={hidden ? "hidden" : "visible"}
      /** I'm also going to add a custom easing curve and duration for the animation **/
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
      /** basic nav styles **/
      className="flex fixed left-0 w-full z-30 border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex h-16 items-center m-auto px-3">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="flex items-center space-x-1">
            {session.status === "unauthenticated" ? <Button
              size={"sm"}
              variant={"outline"}
              className="text-slate-700 dark:text-slate-400 umami--click--sign-in-navbar"
              onClick={() => { signIn("github").catch(() => toast({ variant: 'destructive', title: "Error iniciando sesión" })) }}
            >
              <span>Inicia sesión</span>
            </Button> : (
              <Link href={`/dashboard/user/${session.data?.user.id || ""}`}>
                <Avatar>
                  {session.data?.user.image && <AvatarImage src={session.data?.user.image} />}
                  <AvatarFallback className="uppercase">{session.data?.user.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </Link>
            )}
            <ThemeChanger />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
