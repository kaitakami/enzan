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
        <meta name="title" content={title} />
        <meta
          name="description"
          content={description}
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="language" content="es" />
        <meta name="author" content="Enzan" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://www.enzan.kaitakami.dev/" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={description}
        />
        <meta property="og:image" content="https://i.ibb.co/VmQt7Pz/Frame-346.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://www.enzan.kaitakami.dev/" />
        <meta property="twitter:title" content={title} />
        <meta
          property="twitter:description"
          content={description}
        />
        <meta property="twitter:image" content="https://i.ibb.co/VmQt7Pz/Frame-346.png" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="manifest" href="/images/site.webmanifest" />
        <link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>
      {/* Umami */}
      <Script async defer data-website-id="3b1eed1e-0265-4b9b-9594-db63aa78cd5d" src="https://umami.kaitakami.dev/umami.js" />
      {/* Google Analytics */}
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-X7TFBDXD4W" />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', "G-X7TFBDXD4W", {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

export default HeadLayout
