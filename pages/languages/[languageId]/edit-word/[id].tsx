import Layout, { siteTitle } from 'components/layout'
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import { useWordContext } from 'contexts/word-context'
import { useRouter } from 'next/router'
import useUser from 'lib/useUser'
import { Language as LanguageType } from 'lib/types'
import fetchJson, { FetchError } from 'lib/fetchJson'

export default function EditWord(): ReactElement {
  const { user } = useUser({
    redirectTo: '/login',
  })
  const router = useRouter()
  const [language, setLanguage] = useState<LanguageType>({ id: null, name: '' })
  const [wordId, setWordId] = useState('')
  const [mainWord, setMainWord] = useState('')
  const [secretWord, setSecretWord] = useState('')
  const { state: words, dispatch: setWords } = useWordContext()

  useEffect(() => {
    async function getLanguage(id: number) {
      try {
        const response = await fetchJson<any>(`/api/languages/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        setLanguage(response.language)
      } catch (error) {
        if (error instanceof FetchError) {
          console.log(error.data.message)
        } else {
          console.error('An unexpected error happened:', error)
        }
      }
    }
    async function loadWord(id: number) {
      try {
        const response = await fetchJson<any>(`/api/words/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        setWordId(response.word.id)
        setMainWord(response.word.mainWord)
        setSecretWord(response.word.secretWord)
      } catch (error) {
        if (error instanceof FetchError) {
          console.log(error.data.message)
        } else {
          console.error('An unexpected error happened:', error)
        }
      }
    }
    if (router.isReady) {
      const wordId = parseInt(router.query.id.toString())
      const languageId = parseInt(router.query.languageId.toString())
      getLanguage(languageId)
      loadWord(wordId)
    }
  }, [router, setMainWord])

  const deleteWord = (event: React.FormEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    setWords({
      type: 'DELETE_WORD',
      id: wordId,
      mainWord,
    })
    router.back()
  }

  const handleEditWordFormSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault()

    setWords({
      type: 'EDIT_WORD',
      mainWord,
      secretWord,
      id: parseInt(wordId),
      languageId: language.id,
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
            required
            type="text"
          />
          <label htmlFor="edit-secret-text">Secret word</label>
          <input
            id="edit-secret-text"
            onChange={(e) => setSecretWord(e.target.value)}
            value={secretWord}
            autoFocus
            required
            type="text"
          />
          <input type="submit" className="button btn-large" value="Save" />
        </form>
        <button className="button btn-large red" onClick={(e) => deleteWord(e)}>
          Delete
        </button>
      </div>
    </Layout>
  )
}
