import Layout, { siteTitle } from 'components/layout'
import Head from 'next/head'
import Link from 'next/link'
import useUser from 'lib/useUser'
import { useEffect, useState } from 'react'
import fetchJson, { FetchError } from 'lib/fetchJson'
import { useRouter } from 'next/router'
import { Language as LanguageType } from 'lib/types'

export default function Language() {
  const { user } = useUser({
    redirectTo: '/login',
  })
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [language, setLanguage] = useState<LanguageType>({ id: null, name: '' })

  useEffect(() => {
    async function getLanguage(id: number) {
      try {
        const response = await fetchJson<any>(`/api/languages/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        setLanguage(response.language)
        setIsLoaded(true)
      } catch (error) {
        if (error instanceof FetchError) {
          console.log(error.data.message)
        } else {
          console.error('An unexpected error happened:', error)
        }
      }
    }
    if (router.isReady) {
      const id = parseInt(router.query.languageId.toString())
      getLanguage(id)
    }
  }, [router, setLanguage])

  return (
    <Layout>
      <Head>
        <title>
          {siteTitle} - {isLoaded ? language.name : 'Loading language data'}
        </title>
      </Head>
      <div>
        {isLoaded ? (
          <>
            <h1>{language.name}</h1>
            <Link href={`/languages/1/add-word`}>
              <a className="button btn-large">Add new word</a>
            </Link>
            <Link href={`/languages/1/translate`}>
              <a className="button btn-large">Translate</a>
            </Link>
            <Link href={`/languages/1/dictionary`}>
              <a className="button btn-large">Dictionary</a>
            </Link>
            <Link href={`/languages/1/flash-cards`}>
              <a className="button btn-large">Flash cards</a>
            </Link>
            <Link href={`/languages/1/notes`}>
              <a className="button btn-large">Notes</a>
            </Link>
          </>
        ) : (
          <h2>...Loading</h2>
        )}
      </div>
    </Layout>
  )
}
