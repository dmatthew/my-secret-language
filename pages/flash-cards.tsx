import Layout from '../components/layout'
import Head from 'next/head'

export default function Dictionary() {
  return (
    <Layout>
      <Head>
        <title>My Secret Language - Dictionary</title>
      </Head>
      <div>
        <h2>You have no words in your dictionary. Go to the Add Word page to start adding new words.</h2>
      </div>
    </Layout>
   )
}
