import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const Layout: React.FC<{ children: JSX.Element, title?: string, description?: string }> = ({
  children,
  title = "Enzan | Dashboard",
  description = "Bienvenido de vuelta!"
}) => {
  const session = useSession()
  const router = useRouter()
  if (session.status === 'authenticated') {
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="author" content="Kai Takami" />
          <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
          <link rel="manifest" href="/images/site.webmanifest" />
          <link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <div className='min-h-screen pt-16'>
          {children}
        </div>
      </>)
  } else if (session.status === 'unauthenticated') {
    router.push('/')
  }
  return (
    <>
      {/* Loading animation */}
      <div className="flex items-center justify-center h-screen">
        <svg className="w-20 h-20 animate-pulse" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" width="160" height="160" rx="7" fill="#EBE9FE" />
          <path fillRule="evenodd" clipRule="evenodd" d="M55.53 38.672C55.53 37.7239 56.2339 37.02 57.182 37.02H65.726C66.6742 37.02 67.378 37.7239 67.378 38.672V45.68C67.378 46.0759 67.6341 46.332 68.03 46.332H87.7434C88.3367 46.332 88.7886 46.5694 89.0809 46.9357C89.3593 47.2846 89.4649 47.7133 89.4649 48.0774V55.952C89.4649 56.3974 89.4299 56.8969 89.1379 57.2694C88.8186 57.6769 88.3142 57.796 87.7434 57.796C87.1726 57.796 68.03 57.796 68.03 57.796C67.6341 57.796 67.378 58.0522 67.378 58.448V84.08C67.378 85.0282 66.6742 85.732 65.726 85.732H58.718C58.3221 85.732 58.066 85.9882 58.066 86.384V102.704C58.066 103.652 57.3622 104.356 56.414 104.356H49.406C49.0101 104.356 48.754 104.612 48.754 105.008V121.328C48.754 122.276 48.0501 122.98 47.102 122.98H38.558C37.6099 122.98 36.906 122.276 36.906 121.328V103.856C36.906 102.908 37.6099 102.204 38.558 102.204H45.566C45.9619 102.204 46.218 101.948 46.218 101.552V85.232C46.218 84.2839 46.9219 83.58 47.87 83.58H54.878C55.2739 83.58 55.53 83.3239 55.53 82.928V58.448C55.53 58.0522 55.2739 57.796 54.878 57.796H38.558C37.6099 57.796 36.906 57.0922 36.906 56.144V47.984C36.906 47.0359 37.6099 46.332 38.558 46.332H54.878C55.2739 46.332 55.53 46.0759 55.53 45.68V38.672ZM57.182 38.02C56.7861 38.02 56.53 38.2762 56.53 38.672V45.68C56.53 46.6282 55.8261 47.332 54.878 47.332H38.558C38.1621 47.332 37.906 47.5882 37.906 47.984V56.144C37.906 56.5399 38.1621 56.796 38.558 56.796H54.878C55.8261 56.796 56.53 57.4999 56.53 58.448V82.928C56.53 83.8762 55.8261 84.58 54.878 84.58H47.87C47.4741 84.58 47.218 84.8362 47.218 85.232V101.552C47.218 102.5 46.5141 103.204 45.566 103.204H38.558C38.1621 103.204 37.906 103.46 37.906 103.856V121.328C37.906 121.724 38.1621 121.98 38.558 121.98H47.102C47.4979 121.98 47.754 121.724 47.754 121.328V105.008C47.754 104.06 48.4579 103.356 49.406 103.356H56.414C56.8099 103.356 57.066 103.1 57.066 102.704V86.384C57.066 85.4359 57.7699 84.732 58.718 84.732H65.726C66.1219 84.732 66.378 84.4759 66.378 84.08V58.448C66.378 57.4999 67.0819 56.796 68.03 56.796H87.7434C88.2133 56.796 88.3196 56.6924 88.3508 56.6526C88.4095 56.5778 88.4649 56.4053 88.4649 55.952V48.0774C88.4649 47.8892 88.4076 47.6952 88.2993 47.5595C88.2049 47.4412 88.046 47.332 87.7434 47.332H68.03C67.0819 47.332 66.378 46.6282 66.378 45.68V38.672C66.378 38.2762 66.1219 38.02 65.726 38.02H57.182Z" fill="#F670C7" />
          <path d="M56.53 38.672C56.53 38.2762 56.7861 38.02 57.182 38.02H65.726C66.1219 38.02 66.378 38.2762 66.378 38.672V45.68C66.378 46.6282 67.0819 47.332 68.03 47.332H87.7434C88.046 47.332 88.2049 47.4412 88.2993 47.5595C88.4076 47.6952 88.4649 47.8892 88.4649 48.0774V55.952C88.4649 56.4053 88.4095 56.5778 88.3508 56.6526C88.3196 56.6924 88.2133 56.796 87.7434 56.796H68.03C67.0819 56.796 66.378 57.4999 66.378 58.448V84.08C66.378 84.4759 66.1219 84.732 65.726 84.732H58.718C57.7699 84.732 57.066 85.4359 57.066 86.384V102.704C57.066 103.1 56.8099 103.356 56.414 103.356H49.406C48.4579 103.356 47.754 104.06 47.754 105.008V121.328C47.754 121.724 47.4979 121.98 47.102 121.98H38.558C38.1621 121.98 37.906 121.724 37.906 121.328V103.856C37.906 103.46 38.1621 103.204 38.558 103.204H45.566C46.5141 103.204 47.218 102.5 47.218 101.552V85.232C47.218 84.8362 47.4741 84.58 47.87 84.58H54.878C55.8261 84.58 56.53 83.8762 56.53 82.928V58.448C56.53 57.4999 55.8261 56.796 54.878 56.796H38.558C38.1621 56.796 37.906 56.5399 37.906 56.144V47.984C37.906 47.5882 38.1621 47.332 38.558 47.332H54.878C55.8261 47.332 56.53 46.6282 56.53 45.68V38.672Z" fill="#F670C7" />
          <path d="M83.8879 66.6081C83.8879 65.6599 84.5918 64.9561 85.5399 64.9561H112.708C113.656 64.9561 114.36 65.6599 114.36 66.6081V73.6161C114.36 74.0119 114.616 74.2681 115.012 74.2681H122.02C122.968 74.2681 123.672 74.9719 123.672 75.9201V84.0801C123.672 85.0282 122.968 85.7321 122.02 85.7321H113.476C112.528 85.7321 111.824 85.0282 111.824 84.0801V77.0721C111.824 76.6762 111.568 76.4201 111.172 76.4201H85.5399C84.5918 76.4201 83.8879 75.7162 83.8879 74.7681V66.6081Z" fill="#F670C7" />
          <path d="M74.5759 94.5441C74.5759 93.5959 75.2798 92.8921 76.2279 92.8921H84.7719C85.7201 92.8921 86.4239 93.5959 86.4239 94.5441V110.864C86.4239 111.26 86.6801 111.516 87.0759 111.516H122.02C122.968 111.516 123.672 112.22 123.672 113.168V121.328C123.672 122.276 122.968 122.98 122.02 122.98H85.5399C84.5918 122.98 83.8879 122.276 83.8879 121.328V114.32C83.8879 113.924 83.6318 113.668 83.2359 113.668H76.2279C75.2798 113.668 74.5759 112.964 74.5759 112.016V94.5441Z" fill="#F670C7" />
          <path d="M93.6461 38.8093C93.6461 37.8612 94.35 37.1573 95.2981 37.1573H103.17C104.118 37.1573 104.822 37.8612 104.822 38.8093V56.0893C104.822 57.0375 104.118 57.7413 103.17 57.7413H95.3991C94.7086 57.7413 94.237 57.4298 93.9613 57.0134C93.7075 56.63 93.638 56.1896 93.6461 55.89V38.8093Z" fill="#7D17FF" />
          <path d="M111.982 38.8093C111.982 37.8612 112.686 37.1573 113.634 37.1573H121.506C122.454 37.1573 123.158 37.8612 123.158 38.8093V55.8973C123.158 56.8455 122.454 57.5494 121.506 57.5494H113.634C112.686 57.5494 111.982 56.8455 111.982 55.8973V38.8093Z" fill="#7D17FF" />
        </svg>
      </div>
    </>
  )
}

export default Layout
