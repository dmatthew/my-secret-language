import Layout from '../components/layout'
import Head from 'next/head'

export default function AddWord() {
  return (
    <Layout>
      <Head>
        <title>My Secret Language - Add a new word</title>
      </Head>
      <div>
        <ul className="list">
        </ul>
      </div>
    </Layout>
   )
}
