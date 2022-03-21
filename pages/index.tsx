import Head from 'next/head'
import Layout, { siteTitle } from 'components/layout'
import Link from 'next/link'
import useUser from 'lib/useUser'
import { useEffect, useState } from 'react'
import NewLanguageForm from 'components/NewLanguageForm'
import fetchJson, { FetchError } from 'lib/fetchJson'

export default function Home() {
  const { user } = useUser({
    redirectTo: '/login',
  })
  const [userLanguages, setUserLanguages] = useState([])

  useEffect(() => {
    async function getUserLanguages() {
      try {
        const response = await fetchJson<any>('/api/user/languages', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        setUserLanguages(response)
      } catch (error) {
        if (error instanceof FetchError) {
          console.log(error.data.message)
        } else {
          console.error('An unexpected error happened:', error)
        }
      }
    }
    getUserLanguages()
  }, [setUserLanguages])

  if (typeof user === 'undefined') {
    return (
      <Layout home>
        <h1>An error has occurred.</h1>
      </Layout>
    )
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        <h1>User Dashboard</h1>
        {userLanguages.length > 0 ? (
          <div>
            {userLanguages.map((language, index) => {
              return (
                <Link href={`/languages/${language.id}`} key={index}>
                  <a className="button btn-large">{language.name}</a>
                </Link>
              )
            })}
          </div>
        ) : (
          <div>
            <div>
              Looks like you have no languages. Get started by creating your
              first language now.
            </div>
            <NewLanguageForm />
          </div>
        )}
      </div>
    </Layout>
  )
}
