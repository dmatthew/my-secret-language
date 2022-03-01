import Layout from '../components/layout'
import Head from 'next/head'

export default function Dictionary() {
  return (
    <Layout>
      <Head>
        <title>My Secret Language - Dictionary</title>
      </Head>
      <div>
      <input value=""
          type="search" placeholder="Enter search term..." />
        <ul className="list">
          
        </ul>
      </div>
    </Layout>
   )
}
