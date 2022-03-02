import Layout from '../components/layout'
import Head from 'next/head'
import React, { useState } from 'react'
import { useAppContext } from '../contexts/word-context';

export default function AddWord() {
  const [mainWord, setMainWord] = useState('');
  const [secretWord, setSecretWord] = useState('')
  const [words, setWords] = useAppContext()

  let handleAddWord = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    console.log(mainWord, secretWord)

    setWords({
      type: "ADD_WORD",
      mainWord,
      secretWord
    })
    console.log(words)
  }

  return (
    <Layout>
      <Head>
        <title>My Secret Language - Add a new word</title>
      </Head>
      <div>
        <h3>Add a new word</h3>
        <form name="addWordForm" onSubmit={handleAddWord}>
          <label htmlFor="main-text">Main Word</label>
          <input
            value={mainWord}
            onChange={(e) => setMainWord(e.target.value)}
            name="mainText" id="main-text"
            placeholder="Main word here..." required autoFocus type="text" />
          <label htmlFor="secret-text">Secret word</label>
          <input
            value={secretWord}
            onChange={(e) => setSecretWord(e.target.value)}
            id="secret-text"
            placeholder="Secret word here..." required type="text" />
          <input type="submit" className="button btn-large" value="Save" />
        </form>
      </div>
      <ul>
        {words.map(({ mainWord, secretWord }, id) => (
          <li key={id}>
            {mainWord} - {secretWord} - {id}
          </li>
        ))}
      </ul>
    </Layout>
  )
}
