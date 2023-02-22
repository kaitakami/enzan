'use client'

import { AnimatePresence, motion, useCycle } from "framer-motion";
import { SidebarOpen, SidebarClose } from "lucide-react";
import ThemeChanger from "@/components/layout/ThemeChanger";

const itemVariants = {
  closed: {
    opacity: 0
  },
  open: { opacity: 1 }
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1
    }
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1
    }
  }
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const Sidebar = () => {
  const { width } = getWindowDimensions();

  /** add this const **/
  const variants = {
    /** this is the "visible" key and it's correlating styles **/
    visible: { opacity: 1, y: 0 },
    /** this is the "hidden" key and it's correlating styles **/
    hidden: { opacity: 0, y: -25 }
  };


  // Check responsive width, if width is less than 768px, then sidebar is initially hidden
  const [open, cycleOpen] = useCycle(false, true);
  if (width > 768) {
    if (open === false) {
      cycleOpen()
    }
  }

  return (
    <div>
      <motion.nav /** the variants object needs to be passed into the motion component **/
        variants={variants}
        viewport={{ once: true }}
        /** it's right here that we match our boolean state with these variant keys **/
        /** I'm also going to add a custom easing curve and duration for the animation **/
        transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
        /** basic nav styles **/
        className="flex fixed left-0 md:static h-screen z-30"
      >
        <AnimatePresence>
          {open && (
            <motion.aside
              initial={{ width: 0 }}
              animate={{
                width: 300
              }}
              exit={{
                width: 0,
                transition: { delay: 0.7, duration: 0.3 }
              }}
              className="h-screen left-0 top-0 border-r border-slate-200 dark:border-gray-700 overflow-y-auto relative dark:bg-slate-900 bg-slate-100"
            >
              <motion.div
                className="absolute flex justify-center w-full"
                initial="closed"
                animate="open"
                exit="closed"
                variants={sideVariants}
              >
                <motion.div
                  variants={itemVariants}
                  className="text-3xl font-bold flex flex-col justify-between h-screen py-5"
                >
                  <div>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="flex items-center text-xl gap-1">
                          <svg aria-hidden="true" className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                          <span className="">Dashboard</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <ThemeChanger />
                  </div>
                </motion.div>
              </motion.div>
            </motion.aside>
          )}
        </AnimatePresence>
      </motion.nav >
      <div className="fixed z-30 right-0">
        <button className="p-5 opacity-80" onClick={() => cycleOpen()}>{open ? <SidebarClose size={30} /> : <SidebarOpen size={30} />}</button>
      </div>
    </div>

  )
}

export default Sidebar

