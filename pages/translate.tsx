import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import React, { useState } from 'react'
import { useAppContext } from '../contexts/word-context'
import { Word } from '../lib/types'

interface TranslatedWord {
  text: string,
  hasClick: boolean
}

export default function Translate() {
  const [words, setWords] = useAppContext()
  const [translationInput, setTranslationInput] = useState<string>('')
  const [translationOutput, setTranslationOutput] = useState<TranslatedWord[]>([])
  const [showNewWordForm, setShowNewWordForm] = useState<boolean>(false)
  const [newWord, setNewWord] = useState<Word>({ mainWord: '', secretWord: '' })

  const updateTranslationOutput = (inputText: string): void => {
    let translatedWords: TranslatedWord[] = []
    let inputTextArray: string[] = inputText.trim().split(" ")

    // Loop through the textarea text
    inputTextArray.forEach(inputTextItem => {
      let isWordInDictionary: boolean = false
      let specialChar: string = ""

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
          hasClick: false
        })
        setTranslationOutput(translatedWords)
        isWordInDictionary = true
      }
      if (!isWordInDictionary) {
        translatedWords.push({
          text: inputTextItem,
          hasClick: true
        })
        translatedWords.push({
          text: specialChar +  ' ',
          hasClick: false
        })

        setTranslationOutput(translatedWords)
      }
    })
  }

  const handleTranslationInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTranslationInput(event.target.value)
    updateTranslationOutput(event.target.value)
  }

  const clearAll = () => {
    setShowNewWordForm(false)
    setTranslationInput('')
    setTranslationOutput([])
  }

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Translate</title>
      </Head>
      <div>
        <textarea 
          value={translationInput}
          onChange={(e) => handleTranslationInputChange(e)}
          placeholder="Enter your text to be translated..."
          autoFocus></textarea>
        <div>
          {translationOutput.map((word, index) => {
            return (
              <span
                key={index}
                className={word.hasClick ? 'highlight': ''}>
                  {word.text}
              </span>
            )
          })}
        </div>
        <button 
          type="button"
          className="button btn-large"
          onClick={clearAll}>
            Clear
          </button>
      </div>
    </Layout>
   )
}
