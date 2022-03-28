import Head from 'next/head'
import Layout, { siteTitle } from 'components/layout'
import useUser from 'lib/useUser'
import UserLanguageList from 'components/UserLanguageList'

export default function Home() {
  const { user } = useUser({
    redirectTo: '/login',
  })

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        <h1>User Dashboard</h1>
        {user && user.isLoggedIn && <UserLanguageList />}
      </div>
    </Layout>
  )
}
