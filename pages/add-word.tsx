import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { useWordContext } from '../contexts/word-context'

export default function AddWord(): ReactElement {
  const [mainWord, setMainWord] = useState('')
  const [secretWord, setSecretWord] = useState('')
  const { state: words, dispatch: setWords } = useWordContext()
  const mainWordInput = useRef(null)

  const handleAddWord = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    setWords({
      type: 'ADD_WORD',
      mainWord,
      secretWord,
    })
    setMainWord('')
    setSecretWord('')
  }

  useEffect(() => {
    mainWordInput.current.focus()
  }, [words])

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Add a new word</title>
      </Head>
      <div>
        <h3>Add a new word</h3>
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
      </div>
    </Layout>
  )
}
