import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import Link from 'next/link'
import { ReactElement, useState } from 'react'
import { useWordContext } from '../contexts/word-context'
import { Word } from '../lib/types'

export default function FlashCards(): ReactElement {
  const { state: words, dispatch: setWords } = useWordContext()

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
    } else {
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
      <div id="flash-cards">
        <h3>Flash Cards</h3>
        {flashCardWord ? (
          <>
            <div className="card">
              {mainIsVisible
                ? flashCardWord.mainWord
                : flashCardWord.secretWord}
            </div>
            <button
              className="button btn-large"
              type="button"
              onClick={flipCard}
            >
              Flip card
            </button>
            <button
              className="button btn-large"
              type="button"
              onClick={handleNextWordClick}
            >
              Next word
            </button>
          </>
        ) : (
          <>
            <h2 className="card">
              You have no words in your dictionary. Go to the{' '}
              <Link href="/add-word">Add Word</Link> page to start adding new
              words.
            </h2>
          </>
        )}
      </div>
    </Layout>
  )
}
