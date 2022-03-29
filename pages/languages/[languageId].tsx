import Layout, { siteTitle } from 'components/layout'
import Head from 'next/head'
import Link from 'next/link'
import useUser from 'lib/useUser'
import { useRouter } from 'next/router'
import useLanguage from 'lib/useLanguage'

export default function Language() {
  const { user } = useUser({
    redirectTo: '/login',
  })
  const router = useRouter()
  const { languageId } = router.query
  const { language, mutateLanguage } = useLanguage(
    languageId ? languageId.toString() : null
  )

  return (
    <Layout>
      <Head>
        <title>
          {siteTitle} - {language ? language.name : 'Loading language data'}
        </title>
      </Head>
      <div>
        {language ? (
          <>
            <h1>{language.name}</h1>
            <Link href={`/languages/${language.id}/add-word`}>
              <a className="button btn-large">Add new word</a>
            </Link>
            <Link href={`/languages/${language.id}/translate`}>
              <a className="button btn-large">Translate</a>
            </Link>
            <Link href={`/languages/${language.id}/dictionary`}>
              <a className="button btn-large">Dictionary</a>
            </Link>
            <Link href={`/languages/${language.id}/flash-cards`}>
              <a className="button btn-large">Flash cards</a>
            </Link>
            {/* <Link href={`/languages/${language.id}/notes`}>
              <a className="button btn-large">Notes</a>
            </Link> */}
          </>
        ) : (
          <h2>...Loading</h2>
        )}
      </div>
    </Layout>
  )
}
