import Layout, { siteTitle} from '../../components/layout'
import Head from 'next/head'
import { ReactElement, useState } from 'react';
import { useAppContext } from '../../contexts/word-context';
import { Word } from '../../lib/types'
import { useRouter } from 'next/router';

export default function EditWord(): ReactElement {
  const router = useRouter()
  const { word } = router.query
  const [mainWord, setMainWord] = useState(word)
  const [secretWord, setSecretWord] = useState('')
  const [words, setWords] = useAppContext()

  const handleDeleteWordClick = (): void => {

  }

  const handleEditWordFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    setWords({
      type: "EDIT_WORD",
      mainWord,
      secretWord
    })
    setMainWord('')
    setSecretWord('')
    router.back()
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
            autoFocus
            required type="text" />
          <input type="submit" className="button btn-large" value="Save" />
        </form>
        <button className="button btn-large red" onClick={() => handleDeleteWordClick()}>Delete</button>
      </div>
    </Layout>
  )
}
