import Layout, { siteTitle } from 'components/layout'
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import { useWordContext } from 'contexts/word-context'
import { useRouter } from 'next/router'
import useUser from 'lib/useUser'
import useLanguage from 'lib/useLanguage'
import fetchJson, { FetchError } from 'lib/fetchJson'

export default function EditWord(): ReactElement {
  const { user } = useUser({
    redirectTo: '/login',
  })
  const router = useRouter()
  const { languageId } = router.query
  const { language, mutateLanguage } = useLanguage(
    languageId ? languageId.toString() : null
  )
  const [wordId, setWordId] = useState('')
  const [mainWord, setMainWord] = useState('')
  const [secretWord, setSecretWord] = useState('')
  // const { state: words, dispatch: setWords } = useWordContext()

  useEffect(() => {
    if (language) {
      const wordId = parseInt(router.query.id.toString())
      const word = language.words.find((el) => el.id === wordId)
      setWordId(word.id)
      setMainWord(word.mainWord)
      setSecretWord(word.secretWord)
    }
  }, [language, router])

  const deleteWord = async (
    event: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault()
    // TODO: Move to a function in another file
    // something like: const newLanguage = languageReducer(language, mainWord, secretWord)
    // --------------------------
    const newLanguage = {
      ...language,
    }
    const index = language.words
      .map((el) => {
        return el.mainWord
      })
      .indexOf(mainWord)
    newLanguage.words.splice(index, 1)
    // --------------------------

    try {
      const response = await fetchJson(`/api/words/${wordId}/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      mutateLanguage(newLanguage)
    } catch (error) {
      if (error instanceof FetchError) {
        console.log(error.data)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }

    router.back()
  }

  const handleEditWordFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    // TODO: Move to a function in another file
    // something like: const newLanguage = languageReducer(language, mainWord, secretWord)
    // --------------------------
    const newLanguage = {
      ...language,
    }
    const index = language.words
      .map((el) => {
        return el.mainWord
      })
      .indexOf(mainWord)
    language.words[index] = {
      mainWord: mainWord,
      secretWord: secretWord,
      id: wordId,
      languageId: language.id,
    }
    // --------------------------

    const body = {
      mainWord: mainWord,
      secretWord: secretWord,
    }
    try {
      const response = await fetchJson(`/api/words/${wordId}/edit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      mutateLanguage(newLanguage)
    } catch (error) {
      if (error instanceof FetchError) {
        console.log(error.data)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }

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
