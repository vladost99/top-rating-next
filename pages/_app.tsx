import { AppProps } from 'next/dist/shared/lib/router/router'
import '../styles/globals.css'
import Head from 'next/dist/shared/lib/head'

function MyApp({ Component, pageProps, router } : AppProps): JSX.Element {
  return <>
     <Head>
       <title>MyTop - наш лучший топ</title>
       <link rel="preconnect" href="https://fonts.googleapis.com" />
       <link key={1} rel="stylesheet" href="/favicon2.ico" />
       <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
       <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
       <meta name='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
       <meta name='og:locale' content='ru_RU' />
     </Head>
     <Component {...pageProps} />
  </>
}

export default MyApp
