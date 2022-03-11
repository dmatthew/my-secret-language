import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        <Link href="/add-word">
          <a className="button btn-large">Add new word</a>
        </Link>
        <Link href="/translate">
          <a className="button btn-large">Translate</a>
        </Link>
        <Link href="/dictionary">
          <a className="button btn-large">Dictionary</a>
        </Link>
        <Link href="/flash-cards">
          <a className="button btn-large">Flash cards</a>
        </Link>
        <Link href="/notes">
          <a className="button btn-large">Notes</a>
        </Link>
      </div>
    </Layout>
  )
}
