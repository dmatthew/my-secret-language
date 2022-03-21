import Layout, { siteTitle } from 'components/layout'
import Head from 'next/head'
import Link from 'next/link'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { Word } from 'lib/types'
import useUser from 'lib/useUser'
import useLanguage from 'lib/useLanguage'
import { useRouter } from 'next/router'

export default function FlashCards(): ReactElement {
  const { user } = useUser({
    redirectTo: '/login',
  })
  const router = useRouter()
  const { languageId } = router.query
  const { language, mutateLanguage } = useLanguage(
    languageId ? languageId.toString() : null
  )

  const [flashCardWord, setFlashCardWord] = useState<Word>(null)
  const [mainIsVisible, setMainIsVisible] = useState<boolean>(true)

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

  const getNextFlashCard = useCallback(() => {
    return getRandomValue(language.words)
  }, [language])

  const handleNextWordClick = (): void => {
    setMainIsVisible(true)
    setFlashCardWord(getNextFlashCard())
  }

  useEffect(() => {
    if (!flashCardWord && language && language.words.length) {
      setFlashCardWord(getNextFlashCard())
    }
  }, [setFlashCardWord, language, getNextFlashCard, flashCardWord])

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
