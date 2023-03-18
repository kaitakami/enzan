import { Html } from '@react-email/html'
import { Tailwind } from '@react-email/tailwind';
import { Container } from '@react-email/container';
import { Hr } from '@react-email/hr'

const WelcomeEmail = ({ name }: { name: string }) => {
  return (
    <Html lang='es'>
      <body>
        <Container>
          <Tailwind>
            <h1 className='text-lg font-bold'>{name} bienvenid@ a Enzan ✨</h1>
            <p>Muchas gracias por unirte. Soy Kai, el fundador de Enzan, y quiero darte una cálida bienvenida a{" "}
              <a href="https://dub.enzan.dev/comunidad">nuestra comunidad</a>.
            </p>
            <p>Enzan es una plataforma para crear proyectos y colaborar con otros developers 💻. Estoy trabajando en mejorar la plataforma para proporcionarte una experiencia única, así que no dudes en compartirme tus preguntas y/o sugerencias. Si gustas puedes <a href="https://dub.enzan.dev/feedback">agendar una videollamada conmigo</a>.</p>
            <p>Tu opinión es muy importante, Enzan está en fase beta haciendo mejoras todos los días. También es open source por lo que puedes ver el{" "}<a href="https://dub.enzan.dev/github">código base en GitHub.</a></p>
            <p>Si quieres ver las futuras actualizaciones puedes ver el {" "}<a href="https://dub.enzan.dev/roadmap">roadmap</a>.</p>
            <p>Gracias por ser parte de Enzan.</p>
            <p className='italic'>Saludos cordiales, <br />
              Kai Takami ⚛️
            </p>
            <Hr />
            <a href="https://dub.enzan.dev/unsubscribe" className="underline opacity-40 text-sm py-6">Dejar de recibir emails</a>
          </Tailwind>
        </Container>
      </body>
    </Html>
  );
};

export default WelcomeEmail
