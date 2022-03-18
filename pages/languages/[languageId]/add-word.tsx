import Layout, { siteTitle } from 'components/layout'
import Head from 'next/head'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { useWordContext } from 'contexts/word-context'
import useUser from 'lib/useUser'
import { useRouter } from 'next/router'
import { Language as LanguageType } from 'lib/types'
import fetchJson, { FetchError } from 'lib/fetchJson'

export default function AddWord(): ReactElement {
  const { user } = useUser({
    redirectTo: '/login',
  })

  const router = useRouter()
  const [language, setLanguage] = useState<LanguageType>({ id: null, name: '' })
  const [isLoaded, setIsLoaded] = useState(false)
  const [mainWord, setMainWord] = useState('')
  const [secretWord, setSecretWord] = useState('')
  const { state: words, dispatch: dispatchWords } = useWordContext()
  const mainWordInput = useRef(null)

  const handleAddWord = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    dispatchWords({
      type: 'ADD_WORD',
      mainWord,
      secretWord,
      id: null,
      languageId: language.id,
    })
    setMainWord('')
    setSecretWord('')
  }

  useEffect(() => {
    async function getLanguage(id: number) {
      try {
        const response = await fetchJson<any>(`/api/languages/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        setLanguage(response.language)
        setIsLoaded(true)
      } catch (error) {
        if (error instanceof FetchError) {
          console.log(error.data.message)
        } else {
          console.error('An unexpected error happened:', error)
        }
      }
    }
    if (router.isReady) {
      const id = parseInt(router.query.languageId.toString())
      getLanguage(id)
    }
  }, [router])

  useEffect(() => {
    if (isLoaded) {
      mainWordInput.current.focus()
    }
  }, [isLoaded])

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Add a new word</title>
      </Head>
      <div>
        {isLoaded ? (
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
