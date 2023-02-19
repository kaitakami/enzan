import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {
  return (
    <section className="py-32 max-w-6xl m-auto">
    <h3 className="mt-10 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700 text-center
">FAQ</h3>
      <Accordion className="px-3" id="FAQ" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>¿Cómo puedo encontrar otros programadores que estén interesados en colaborar en un proyecto?</AccordionTrigger>
          <AccordionContent>
            Puedes crear un proyecto o solicitar unirte a el proyecto de otro developer. Una vez que esten en el mismo proyecto pueden comunicarse ya sea usando Discord, Telegram o cualquier otra red social.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>¿Cómo puedo colaborar con otros programadores en un proyecto?</AccordionTrigger>
          <AccordionContent>
            En Enzan recomendamos utilizar Github como sistema de control de versiones. Tenemos la opción de conectar tu proyecto con un repositorio para mostrar los PR, issues, cambios, etc.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>¿Cómo puedo recibir retroalimentación sobre mi proyecto?</AccordionTrigger>
          <AccordionContent>
            Puedes unirte a nuestra comunidad y compartir tu proyecto, es 100% seguro de que recibiras algún tipo de feedback y mejorarás como developer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>¿Puedo incluir los proyectos que haga en Enzan en mi portfolio?</AccordionTrigger>
          <AccordionContent>
            Sí! Una de las razones por las que creamos Enzan es para que puedas crear un portfolio con proyectos realistas y junto con otros developers.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>¿Este sitio web funciona?</AccordionTrigger>
          <AccordionContent>
            Enzan aún esta en construcción pero estoy codeado todo el tiempo libre que tengo para poder lanzar el producto lo más pronto posible.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}

export default FAQ
