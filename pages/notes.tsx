import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'

export default function AddWord() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Notes</title>
      </Head>
      <div>
        <ul className="list">
        </ul>
      </div>
    </Layout>
   )
}
