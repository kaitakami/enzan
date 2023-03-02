import DashboardLayout from "@/components/layout/Dashboard/Layout"

const UserProjects = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto pt-20 px-3 lg:px-0 space-y-5">
        <h1 className="mt-10 scroll-m-20 border-b border-b-slate-200 pb-2 text-4xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700">Gestiona tus proyectos</h1>
        <section>
          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">Revisa las admisiones</h3>
          <div className="w-full flex flex-wrap">
            {/* TODO: Render admissions */}
          </div>
        </section>
        <section>
          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">Tus proyectos</h3>
          <div className="w-full flex flex-wrap">
            {/* TODO: Render admissions */}
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}

export default UserProjects
