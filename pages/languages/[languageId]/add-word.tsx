import Layout, { siteTitle } from 'components/layout'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import useUser from 'lib/useUser'
import useLanguage from 'lib/useLanguage'
import { useRouter } from 'next/router'
import AddWordForm from 'components/AddWordForm'

export default function AddWordPage(): ReactElement {
  const { user } = useUser({
    redirectTo: '/login',
  })
  const router = useRouter()
  const { languageId } = router.query
  const { language } = useLanguage(languageId ? languageId.toString() : null)

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Add a new word</title>
      </Head>
      <div>
        {language ? (
          <>
            <h3>Add a new {language.name} word</h3>
            <AddWordForm languageId={languageId.toString()} />
          </>
        ) : (
          <h2>...Loading</h2>
        )}
      </div>
    </Layout>
  )
}
