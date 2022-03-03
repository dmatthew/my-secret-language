import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import Link from 'next/link'
import { ReactElement, useState } from 'react'
import { useAppContext } from '../contexts/word-context';
import { Word } from '../lib/types'

export default function Dictionary(): ReactElement {
  const [words, setWords] = useAppContext()

  const flipCard = (): void => {
    setMainIsVisible(!mainIsVisible)
  }

  /**
  * Get a random word from the dictionary of words.
  */
  const getRandomValue = (arr: any[]): any => {
    let randNum = Math.floor(Math.random() * arr.length)
    if (arr[randNum]) {
        return arr[randNum]
    }
    else {
        return null
    }
  }

  const getNextFlashCard = (): Word => {
    return getRandomValue(words)
  }

  const handleNextWordClick = (): void => {
    setMainIsVisible(true)
    setFlashCardWord(getNextFlashCard())
  }

  const [mainIsVisible, setMainIsVisible] = useState<boolean>(true)

  /** TODO: Is this the best way to initialize the flash card state with a value from the context? */
  const [flashCardWord, setFlashCardWord] = useState<Word>(getNextFlashCard())
  
  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Dictionary</title>
      </Head>
      <div>
        {flashCardWord ? (
          <>
            <h1>{mainIsVisible ? flashCardWord.mainWord : flashCardWord.secretWord}</h1>
            <button className="button btn-large" type="button" onClick={flipCard}>Flip card</button>
            <button className="button btn-large" type="button" onClick={handleNextWordClick}>Next word</button>
          </>
        ) : (
          <>
            <h2>You have no words in your dictionary. Go to the <Link href="/add-word">Add Word</Link> page to start adding new words.</h2>
          </>
        )}
      </div>
    </Layout>
   )
}
