import Layout, { siteTitle } from 'components/layout'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import useUser from 'lib/useUser'
import useLanguage from 'lib/useLanguage'
import TranslationForm from 'components/TranslationForm'

interface TranslatedWord {
  text: string
  hasClick: boolean
}

export default function Translate(): ReactElement {
  const { user } = useUser({
    redirectTo: '/login',
  })
  const router = useRouter()
  const { languageId } = router.query
  const { language } = useLanguage(languageId ? languageId.toString() : null)

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Translate</title>
      </Head>
      <div>
        <h3>Translate</h3>
        {language && <TranslationForm languageId={language.id.toString()} />}
      </div>
    </Layout>
  )
}
