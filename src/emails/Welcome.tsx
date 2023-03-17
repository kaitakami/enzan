import { Html } from '@react-email/html'
import { Head } from '@react-email/head';
import { Tailwind } from '@react-email/tailwind';


const WelcomeEmail = ({ name }: { name: string }) => {
  return (
    <Html lang='es'>
      <Head>
        <title>{name} bienvenid@ a Enzan ✨</title>
      </Head>
      <body>
        <div>
          <Tailwind>
            <h1 className='text-lg font-bold'>{name} bienvenid@ a Enzan ✨</h1>
            <p>Muchas gracias por unirte. Soy Kai, el fundador de Enzan, y quiero darte una cálida bienvenida a
              <a href="https://dub.enzan.dev/comunidad">nuestra comunidad</a>.
            </p>
            <p>Enzan es una plataforma para crear proyectos y colaborar con otros developers 💻. Estoy trabajando en mejorar la plataforma para proporcionarte una experiencia única, así que no dudes en compartirme tus preguntas y/o sugerencias. Si gustas puedes <a href="https://dub.enzan.dev/feedback">agendar una videollamada conmigo</a></p>
            <p>Tu opinión es muy importante, Enzan está en fase beta haciendo mejoras.</p>
            <p>Gracias por ser parte de Enzan.</p>
            <p>Saludos cordiales, <br />
              <span className='italic'>Kai 😊</span>
            </p>
          </Tailwind>
        </div>
      </body>
    </Html>
  );
};

export default WelcomeEmail
