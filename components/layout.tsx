import Head from 'next/head'
import styles from './layout.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useUser from 'lib/useUser'
import fetchJson from 'lib/fetchJson'

export const siteTitle = 'My Secret Language'

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode
  home?: boolean
}) {
  const { user, mutateUser } = useUser()
  const router = useRouter()

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}>
        {user?.isLoggedIn && !home && (
          <a
            className={`${styles.backButton} ${styles.button}`}
            onClick={() => router.back()}
          >
            Back
          </a>
        )}
        <Link href="/">
          <a>
            <h1 className={styles.appTitle}>Mi Scrt Lngwij</h1>
          </a>
        </Link>
        {user?.isLoggedIn && (
          <Link href="/api/logout">
            <a
              className={`${styles.logoutButton} ${styles.button}`}
              onClick={async (e) => {
                e.preventDefault()
                mutateUser(
                  await fetchJson('/api/logout', { method: 'POST' }),
                  false
                )
                router.push('/login')
              }}
            >
              Logout
            </a>
          </Link>
        )}
      </header>
      <main className={styles.content}>{children}</main>
    </div>
  )
}
