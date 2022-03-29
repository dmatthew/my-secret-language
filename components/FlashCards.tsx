import { ReactElement } from 'react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { LanguageType } from 'lib/types'
import { Word } from 'lib/types'

export default function FlashCards({
  language,
}: {
  language: LanguageType
}): ReactElement {
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
    setFlashCardWord(getNextFlashCard())
  }, [setFlashCardWord, getNextFlashCard, language])

  return (
    <>
      {language.words && flashCardWord ? (
        <>
          <div className="card">
            {mainIsVisible ? flashCardWord.mainWord : flashCardWord.secretWord}
          </div>
          <button className="button btn-large" type="button" onClick={flipCard}>
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
          {language && (
            <h2 className="card">
              You have no words in your dictionary. Go to the{' '}
              <Link href={`/languages/${language.id}/add-word`}>Add Word</Link>{' '}
              page to start adding new words.
            </h2>
          )}
        </>
      )}
    </>
  )
}
