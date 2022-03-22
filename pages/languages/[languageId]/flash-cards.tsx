import Layout, { siteTitle } from 'components/layout'
import Head from 'next/head'
import { ReactElement } from 'react'
import useUser from 'lib/useUser'
import useLanguage from 'lib/useLanguage'
import { useRouter } from 'next/router'
import FlashCards from 'components/FlashCards'

export default function FlashCardsPage(): ReactElement {
  const { user } = useUser({
    redirectTo: '/login',
  })
  const router = useRouter()
  const { languageId } = router.query
  const { language } = useLanguage(languageId ? languageId.toString() : null)

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Dictionary</title>
      </Head>
      <div id="flash-cards">
        <h3>Flash Cards</h3>
        {language && <FlashCards language={language} />}
      </div>
    </Layout>
  )
}
