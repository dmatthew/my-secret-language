import Layout from '../components/layout'
import Head from 'next/head'

export default function AddWord() {
  return (
    <Layout>
      <Head>
        <title>My Secret Language - Add a new word</title>
      </Head>
      <div>
        <h3>Add a new word</h3>
        <form name="addWordForm">
          <label htmlFor="main-text">Main Word</label>
          <input
            name="mainText" id="main-text"
            value=""
            placeholder="Main word here..." required autoFocus type="text" />
          <label htmlFor="secret-text">Secret word</label>
          <input
            id="secret-text"
             value=""
             placeholder="Secret word here..." required type="text" />
          <input type="submit" className="button btn-large" value="Save" />
        </form>
      </div>
    </Layout>
   )
}
