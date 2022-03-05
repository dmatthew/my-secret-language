import Layout, { siteTitle} from '../../components/layout'
import Head from 'next/head'
import { ReactElement, useState } from 'react';
import { useAppContext } from '../../contexts/word-context';
import { Word } from '../../lib/types'

export default function EditWord(): ReactElement {
  const [mainWord, setMainWord] = useState('')
  const [secretWord, setSecretWord] = useState('')

  const handleDeleteWordClick = (): void => {

  }

  const handleEditWordFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {

  }

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Edit Word</title>
      </Head>
      <div className="panel" title="Dictionary" id="edit-dictionary">
        <form name="editWordForm" onSubmit={(e) => handleEditWordFormSubmit(e)}>
          <label htmlFor="edit-main-text">Main word</label>
          <input
            name="editMainText" 
            id="edit-main-text" 
            onChange={(e) => setMainWord(e.target.value)} 
            value={mainWord} 
            required type="text" />
          <label htmlFor="edit-secret-text">Secret word</label>
          <input
            id="edit-secret-text" 
            onChange={(e) => setSecretWord(e.target.value)}
            value={secretWord} 
            required type="text" />
          <input type="submit" className="button btn-large" value="Save" />
        </form>
        <button className="button btn-large red" onClick={() => handleDeleteWordClick()}>Delete</button>
      </div>
    </Layout>
  )
}