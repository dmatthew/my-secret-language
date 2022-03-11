import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import { useWordContext } from '../contexts/word-context'
import { Word } from '../lib/types'

interface TranslatedWord {
  text: string
  hasClick: boolean
}

export default function Translate(): ReactElement {
  const { state: words, dispatch: setWords } = useWordContext()
  const [translationInput, setTranslationInput] = useState<string>('')
  const [translationOutput, setTranslationOutput] = useState<TranslatedWord[]>(
    []
  )
  const [showNewWordForm, setShowNewWordForm] = useState<boolean>(false)
  const [newWord, setNewWord] = useState<Word>({ mainWord: '', secretWord: '' })

  const updateTranslationOutput = useCallback(() => {
    if (!translationInput) {
      setTranslationOutput([])
      return
    }

    let translatedWords: TranslatedWord[] = []
    let inputTextArray: string[] = translationInput.trim().split(' ')

    // Loop through the textarea text
    inputTextArray.forEach((inputTextItem) => {
      let isWordInDictionary: boolean = false
      let specialChar: string = ''

      // If the word ends in a special character, split it apart.
      const specialCharsList: string[] = [',', '.', ';', ':', '?', '!']
      if (specialCharsList.indexOf(inputTextItem.slice(-1)) !== -1) {
        specialChar = inputTextItem.slice(-1)
        inputTextItem = inputTextItem.slice(0, -1)
      }

      // Loop through the dictionary and check if the word has been defined yet.
      let myWord = words.find((w: Word) => {
        return w.mainWord.toUpperCase() === inputTextItem.toUpperCase()
      })
      if (myWord) {
        translatedWords.push({
          text: myWord.secretWord + specialChar + ' ',
          hasClick: false,
        })
        setTranslationOutput(translatedWords)
        isWordInDictionary = true
      }
      if (!isWordInDictionary) {
        translatedWords.push({
          text: inputTextItem,
          hasClick: true,
        })
        translatedWords.push({
          text: specialChar + ' ',
          hasClick: false,
        })

        setTranslationOutput(translatedWords)
      }
    })
  }, [translationInput, words])

  const clearAll = (): void => {
    setShowNewWordForm(false)
    setTranslationInput('')
    setTranslationOutput([])
  }

  const handleUntranslatedWordClick = (text: string): void => {
    setShowNewWordForm(true)
    setNewWord({ mainWord: text, secretWord: '' })
  }

  const handleNewWordFormSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault()

    setWords({
      type: 'ADD_WORD',
      mainWord: newWord.mainWord,
      secretWord: newWord.secretWord,
    })

    setNewWord({ mainWord: '', secretWord: '' })
    setShowNewWordForm(false)
  }

  const cancelNewWord = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    setNewWord({ mainWord: '', secretWord: '' })
    setShowNewWordForm(false)
  }

  useEffect(() => {
    updateTranslationOutput()
  }, [updateTranslationOutput])

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Translate</title>
      </Head>
      <div>
        <h3>Translate</h3>
        <textarea
          value={translationInput}
          onChange={(e) => setTranslationInput(e.target.value)}
          placeholder="Enter your text to be translated..."
          autoFocus
        ></textarea>
        <div>
          {translationOutput.map((word, index) => {
            return (
              <span
                key={index}
                onClick={
                  word.hasClick
                    ? () => handleUntranslatedWordClick(word.text)
                    : undefined
                }
                className={word.hasClick ? 'highlight' : ''}
              >
                {word.text}
              </span>
            )
          })}
        </div>
        <button type="button" className="button btn-large" onClick={clearAll}>
          Clear
        </button>
        {showNewWordForm && (
          <div id="add-word-popup">
            <form
              name="addFormPop"
              onSubmit={(e) => handleNewWordFormSubmit(e)}
            >
              <label htmlFor="secret-text-pop">{newWord.mainWord}</label>
              <input
                id="secret-text-pop"
                placeholder={'Translation for "' + newWord.mainWord + '"'}
                value={newWord.secretWord}
                onChange={(e) =>
                  setNewWord({ ...newWord, secretWord: e.target.value })
                }
                required
                type="text"
                autoFocus
              />
              <input type="submit" className="button btn-large" value="Save" />
              <button className="button btn-large red" onClick={cancelNewWord}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  )
}
