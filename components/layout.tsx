import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'

export const siteTitle = 'My Secret Language'

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode,
  home?: boolean
}) {  
  return (
    <div className={styles.appContainer}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}>
        {!home && 
          <Link href="/">
            <a className={`${styles.backButton} ${styles.button}`}>Home</a>
          </Link>
        }
        <h1 className={styles.appTitle}>Mi Scrt Lngwij</h1>
      </header>
      <main className={styles.content}>{children}</main>
    </div>
  )
}
