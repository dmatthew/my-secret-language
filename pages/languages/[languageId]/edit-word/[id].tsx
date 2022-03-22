import Layout, { siteTitle } from 'components/layout'
import Head from 'next/head'
import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import useUser from 'lib/useUser'
import useLanguage from 'lib/useLanguage'
import EditWordForm from 'components/EditWordForm'

export default function EditWord(): ReactElement {
  const { user } = useUser({
    redirectTo: '/login',
  })
  const router = useRouter()
  const { languageId } = router.query
  const { language } = useLanguage(languageId ? languageId.toString() : null)

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Edit Word</title>
      </Head>
      {language ? (
        <EditWordForm languageId={language.id} />
      ) : (
        <h2>...Loading</h2>
      )}
    </Layout>
  )
}
