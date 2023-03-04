import { AnimatePresence, motion, useCycle } from "framer-motion";
import { useSession } from "next-auth/react";
import { SidebarOpen, SidebarClose, LayoutDashboard, Briefcase, Search, ChevronDown, PlusSquare, User, Files } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ThemeChanger from "@/components/layout/ThemeChanger";
import Link from "next/link";

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
  const session = useSession()
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
  if (width > 1024) {
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
        className="flex fixed left-0 top-0  lg:sticky h-screen z-30"
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
                    <Link href="/" className="flex gap-2 pt-4 pb-3">
                      <h2 className="text-3xl font-bold bg-gradient-to-b from-slate-900 via-slate-800 to-slate-800 bg-clip-text text-transparent dark:text-slate-100">Enzan</h2>
                      <svg className='h-7 w-7 my-auto' viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="160" height="160" rx="6" fill="#1E293B" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M55.03 38.672C55.03 37.7239 55.7339 37.02 56.682 37.02H65.226C66.1742 37.02 66.878 37.7239 66.878 38.672V45.68C66.878 46.0759 67.1341 46.332 67.53 46.332H87.2434C87.8367 46.332 88.2886 46.5694 88.5809 46.9357C88.8593 47.2846 88.9649 47.7133 88.9649 48.0774V55.952C88.9649 56.3974 88.9299 56.8969 88.6379 57.2694C88.3186 57.6769 87.8142 57.796 87.2434 57.796C86.6726 57.796 67.53 57.796 67.53 57.796C67.1341 57.796 66.878 58.0522 66.878 58.448V84.08C66.878 85.0282 66.1742 85.732 65.226 85.732H58.218C57.8221 85.732 57.566 85.9882 57.566 86.384V102.704C57.566 103.652 56.8622 104.356 55.914 104.356H48.906C48.5101 104.356 48.254 104.612 48.254 105.008V121.328C48.254 122.276 47.5501 122.98 46.602 122.98H38.058C37.1099 122.98 36.406 122.276 36.406 121.328V103.856C36.406 102.908 37.1099 102.204 38.058 102.204H45.066C45.4619 102.204 45.718 101.948 45.718 101.552V85.232C45.718 84.2839 46.4219 83.58 47.37 83.58H54.378C54.7739 83.58 55.03 83.3239 55.03 82.928V58.448C55.03 58.0522 54.7739 57.796 54.378 57.796H38.058C37.1099 57.796 36.406 57.0922 36.406 56.144V47.984C36.406 47.0359 37.1099 46.332 38.058 46.332H54.378C54.7739 46.332 55.03 46.0759 55.03 45.68V38.672ZM56.682 38.02C56.2861 38.02 56.03 38.2762 56.03 38.672V45.68C56.03 46.6282 55.3261 47.332 54.378 47.332H38.058C37.6621 47.332 37.406 47.5882 37.406 47.984V56.144C37.406 56.5399 37.6621 56.796 38.058 56.796H54.378C55.3261 56.796 56.03 57.4999 56.03 58.448V82.928C56.03 83.8762 55.3261 84.58 54.378 84.58H47.37C46.9741 84.58 46.718 84.8362 46.718 85.232V101.552C46.718 102.5 46.0141 103.204 45.066 103.204H38.058C37.6621 103.204 37.406 103.46 37.406 103.856V121.328C37.406 121.724 37.6621 121.98 38.058 121.98H46.602C46.9979 121.98 47.254 121.724 47.254 121.328V105.008C47.254 104.06 47.9579 103.356 48.906 103.356H55.914C56.3099 103.356 56.566 103.1 56.566 102.704V86.384C56.566 85.4359 57.2699 84.732 58.218 84.732H65.226C65.6219 84.732 65.878 84.4759 65.878 84.08V58.448C65.878 57.4999 66.5819 56.796 67.53 56.796H87.2434C87.7133 56.796 87.8196 56.6924 87.8508 56.6526C87.9095 56.5778 87.9649 56.4053 87.9649 55.952V48.0774C87.9649 47.8892 87.9076 47.6952 87.7993 47.5595C87.7049 47.4412 87.546 47.332 87.2434 47.332H67.53C66.5819 47.332 65.878 46.6282 65.878 45.68V38.672C65.878 38.2762 65.6219 38.02 65.226 38.02H56.682Z" fill="#059669" />
                        <path d="M56.03 38.672C56.03 38.2762 56.2861 38.02 56.682 38.02H65.226C65.6219 38.02 65.878 38.2762 65.878 38.672V45.68C65.878 46.6282 66.5819 47.332 67.53 47.332H87.2434C87.546 47.332 87.7049 47.4412 87.7993 47.5595C87.9076 47.6952 87.9649 47.8892 87.9649 48.0774V55.952C87.9649 56.4053 87.9095 56.5778 87.8508 56.6526C87.8196 56.6924 87.7133 56.796 87.2434 56.796H67.53C66.5819 56.796 65.878 57.4999 65.878 58.448V84.08C65.878 84.4759 65.6219 84.732 65.226 84.732H58.218C57.2699 84.732 56.566 85.4359 56.566 86.384V102.704C56.566 103.1 56.3099 103.356 55.914 103.356H48.906C47.9579 103.356 47.254 104.06 47.254 105.008V121.328C47.254 121.724 46.9979 121.98 46.602 121.98H38.058C37.6621 121.98 37.406 121.724 37.406 121.328V103.856C37.406 103.46 37.6621 103.204 38.058 103.204H45.066C46.0141 103.204 46.718 102.5 46.718 101.552V85.232C46.718 84.8362 46.9741 84.58 47.37 84.58H54.378C55.3261 84.58 56.03 83.8762 56.03 82.928V58.448C56.03 57.4999 55.3261 56.796 54.378 56.796H38.058C37.6621 56.796 37.406 56.5399 37.406 56.144V47.984C37.406 47.5882 37.6621 47.332 38.058 47.332H54.378C55.3261 47.332 56.03 46.6282 56.03 45.68V38.672Z" fill="#059669" />
                        <path d="M83.3879 66.6081C83.3879 65.6599 84.0918 64.9561 85.0399 64.9561H112.208C113.156 64.9561 113.86 65.6599 113.86 66.6081V73.6161C113.86 74.0119 114.116 74.2681 114.512 74.2681H121.52C122.468 74.2681 123.172 74.9719 123.172 75.9201V84.0801C123.172 85.0282 122.468 85.7321 121.52 85.7321H112.976C112.028 85.7321 111.324 85.0282 111.324 84.0801V77.0721C111.324 76.6762 111.068 76.4201 110.672 76.4201H85.0399C84.0918 76.4201 83.3879 75.7162 83.3879 74.7681V66.6081Z" fill="#059669" />
                        <path d="M74.0759 94.5441C74.0759 93.5959 74.7798 92.8921 75.7279 92.8921H84.2719C85.2201 92.8921 85.9239 93.5959 85.9239 94.5441V110.864C85.9239 111.26 86.1801 111.516 86.5759 111.516H121.52C122.468 111.516 123.172 112.22 123.172 113.168V121.328C123.172 122.276 122.468 122.98 121.52 122.98H85.0399C84.0918 122.98 83.3879 122.276 83.3879 121.328V114.32C83.3879 113.924 83.1318 113.668 82.7359 113.668H75.7279C74.7798 113.668 74.0759 112.964 74.0759 112.016V94.5441Z" fill="#059669" />
                        <path d="M93.1463 38.8093C93.1463 37.8612 93.8501 37.1573 94.7983 37.1573H102.67C103.618 37.1573 104.322 37.8612 104.322 38.8093V56.0893C104.322 57.0375 103.618 57.7413 102.67 57.7413H94.8992C94.2088 57.7413 93.7371 57.4298 93.4614 57.0134C93.2076 56.63 93.1381 56.1896 93.1463 55.89V38.8093Z" fill="#059669" />
                        <path d="M111.482 38.8093C111.482 37.8612 112.186 37.1573 113.134 37.1573H121.006C121.954 37.1573 122.658 37.8612 122.658 38.8093V55.8973C122.658 56.8455 121.954 57.5494 121.006 57.5494H113.134C112.186 57.5494 111.482 56.8455 111.482 55.8973V38.8093Z" fill="#059669" />
                      </svg>
                    </Link>
                    <hr className="py-5 dark:border-slate-700" />
                    <ul className="space-y-3 dark:text-slate-300 text-slate-700 min-w-[200px]">
                      <li>
                        <Link href="/dashboard" className="flex items-center text-lg gap-2">
                          <LayoutDashboard size={19} />
                          <span>Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="text-lg flex justify-between w-full">
                            <div className="flex gap-2">
                              <Files size={19} className="my-auto" />
                              <span>Proyectos</span>
                            </div>
                            <ChevronDown className="my-auto" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-[200px]">
                            <DropdownMenuItem className="py-0">
                              <Link href="/dashboard/projects" className="flex items-center text-lg gap-2 w-full h-full py-1">
                                <Search size={19} />
                                <span>Buscar</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="py-0">
                              <Link href={`/dashboard/user/projects`} className="py-1 flex items-center text-lg gap-2 h-full w-full">
                                <Briefcase size={19} />
                                <span>Gestionar</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="py-0">
                              <Link href="/dashboard/projects/build" className="flex items-center text-lg gap-2 py-1 h-full w-full">
                                <PlusSquare size={19} />
                                <span>Crear</span>
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </li>
                      <li>
                        <Link href={`/dashboard/user/${session.data?.user.id || ""}`} className="flex items-center text-lg gap-2">
                          <User size={19} />
                          <span>Cuenta</span>
                        </Link>
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
      <div className="fixed z-30 right-0 lg:hidden">
        <button className="p-5 opacity-80" onClick={() => cycleOpen()}>{open ? <SidebarClose size={30} /> : <SidebarOpen size={30} />}</button>
      </div>
    </div>

  )
}

export default Sidebar

