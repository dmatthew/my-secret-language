import Layout, { siteTitle } from 'components/layout'
import Head from 'next/head'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import useUser from 'lib/useUser'
import useLanguage from 'lib/useLanguage'
import { useRouter } from 'next/router'
import fetchJson, { FetchError } from 'lib/fetchJson'
import { Word } from 'lib/types'

export default function AddWord(): ReactElement {
  const { user } = useUser({
    redirectTo: '/login',
  })
  const router = useRouter()
  const { languageId } = router.query
  const { language, mutateLanguage } = useLanguage(
    languageId ? languageId.toString() : null
  )

  const [mainWord, setMainWord] = useState('')
  const [secretWord, setSecretWord] = useState('')
  const mainWordInput = useRef(null)

  const addWordToLanguage = async (
    languageId: number,
    mainWord: string,
    secretWord: string
  ): Promise<{ message: string; word?: Word }> => {
    const body = {
      languageId: languageId,
      mainWord: mainWord,
      secretWord: secretWord,
    }
    const response = await fetchJson<{ message: string; word?: Word }>(
      `/api/words/add`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
    return response
  }

  const handleAddWord = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      const response = await addWordToLanguage(
        language.id,
        mainWord,
        secretWord
      )
      if (response.word) {
        // TODO: Move to a function in another file
        // something like: const newLanguage = languageReducer(language, mainWord, secretWord)
        // --------------------------
        const newLanguage = {
          ...language,
        }
        const newWord = {
          mainWord: mainWord,
          secretWord: secretWord,
          id: response.word.id,
          languageId: language.id,
        }
        newLanguage.words.push(newWord)
        // --------------------------

        mutateLanguage(newLanguage)
      }
    } catch (error) {
      if (error instanceof FetchError) {
        console.log(error.data)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }
    setMainWord('')
    setSecretWord('')
  }

  useEffect(() => {
    if (language) {
      mainWordInput.current.focus()
    }
  }, [language, mainWordInput])

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Add a new word</title>
      </Head>
      <div>
        {language ? (
          <>
            <h3>Add a new {language.name} word</h3>
            <form name="addWordForm" onSubmit={handleAddWord}>
              <label htmlFor="main-text">Main Word</label>
              <input
                value={mainWord}
                onChange={(e) => setMainWord(e.target.value)}
                ref={mainWordInput}
                name="mainText"
                id="main-text"
                placeholder="Main word here..."
                required
                type="text"
              />
              <label htmlFor="secret-text">Secret word</label>
              <input
                value={secretWord}
                onChange={(e) => setSecretWord(e.target.value)}
                name="secretText"
                id="secret-text"
                placeholder="Secret word here..."
                required
                type="text"
              />
              <input type="submit" className="button btn-large" value="Save" />
            </form>
          </>
        ) : (
          <h2>...Loading</h2>
        )}
      </div>
    </Layout>
  )
}
