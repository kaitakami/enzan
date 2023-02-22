import Head from 'next/head'
import Script from 'next/script'

const HeadLayout = (
  {
    title = "Enzan - Crea junto a otros developers",
    description = "Juntamos a personas que quieren crear tech. Colabora con otros developers y crea tu portfolio ideal o tu siguente gran proyecto."
  }
) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content="Enzan - Crea junto a otros developers" />
        <meta name="description" content={description} />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.enzan.kaitakami.dev/" />
        <meta property="og:title" content="Enzan - Crea junto a otros developers" />
        <meta property="og:description" content="Juntamos a personas que quieren crear tech.
Colabora con otros developers y crea tu portfolio ideal o tu siguente gran proyecto." />
        <meta property="og:image" content="https://i.ibb.co/VmQt7Pz/Frame-346.png" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.enzan.kaitakami.dev/" />
        <meta property="twitter:title" content="Enzan - Crea junto a otros developers" />
        <meta property="twitter:description" content="Juntamos a personas que quieren crear tech.
Colabora con otros developers y crea tu portfolio ideal o tu siguente gran proyecto." />
        <meta property="twitter:image" content="https://i.ibb.co/VmQt7Pz/Frame-346.png" />
        <meta name="author" content="Kai Takami" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="manifest" href="/images/site.webmanifest" />
        <link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#5bbad5" />
        {/* <!-- Primary Meta Tags --> */}
      </Head>
      {/* Umami */}
      <Script async defer data-website-id="3b1eed1e-0265-4b9b-9594-db63aa78cd5d" src="https://umami.kaitakami.dev/umami.js" />
    </>
  )
}

export default HeadLayout
