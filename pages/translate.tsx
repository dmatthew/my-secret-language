import Layout from '../components/layout'
import Head from 'next/head'

export default function Translate() {
  return (
    <Layout>
      <Head>
        <title>My Secret Language - Translate</title>
      </Head>
      <div>
        <textarea placeholder="Enter your text to be translated..." value="" autoFocus></textarea>
      </div>
    </Layout>
   )
}
