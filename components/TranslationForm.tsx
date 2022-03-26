import { ReactElement, useCallback, useEffect, useState } from 'react'
import { Word } from 'lib/types'
import useLanguage from 'lib/useLanguage'
import fetchJson, { FetchError } from 'lib/fetchJson'

interface TranslatedWord {
  text: string
  hasClick: boolean
}

export default function TranslationForm({
  languageId,
}: {
  languageId: string
}): ReactElement {
  const { language, mutateLanguage } = useLanguage(
    languageId ? languageId.toString() : null
  )
  const [translationInput, setTranslationInput] = useState<string>('')
  const [translationOutput, setTranslationOutput] = useState<TranslatedWord[]>(
    []
  )
  const [showNewWordForm, setShowNewWordForm] = useState<boolean>(false)
  const [newWord, setNewWord] = useState<Word>({
    mainWord: '',
    secretWord: '',
    languageId: null,
  })
  const [dictionaryMap, setDictionaryMap] = useState(null)

  const updateTranslationOutput = useCallback(() => {
    if (!translationInput) {
      setTranslationOutput([])
      return
    }

    let translatedWords: TranslatedWord[] = []
    let inputTextArray: string[] = translationInput.trim().split(' ')

    // Loop through the textarea text
    inputTextArray.forEach((inputTextItem) => {
      console.log('+')
      let specialChar: string = ''

      // If the word ends in a special character, split it apart.
      const specialCharsList: string[] = [',', '.', ';', ':', '?', '!']
      if (specialCharsList.indexOf(inputTextItem.slice(-1)) !== -1) {
        specialChar = inputTextItem.slice(-1)
        inputTextItem = inputTextItem.slice(0, -1)
      }

      // Check if the word has been defined yet.
      let myWord = dictionaryMap.get(inputTextItem.toLowerCase())
      if (myWord) {
        translatedWords.push({
          text: myWord.secretWord + specialChar + ' ',
          hasClick: false,
        })
        setTranslationOutput(translatedWords)
      } else {
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
  }, [translationInput, dictionaryMap])

  const clearAll = (): void => {
    setShowNewWordForm(false)
    setTranslationInput('')
    setTranslationOutput([])
  }

  const handleUntranslatedWordClick = (text: string): void => {
    setShowNewWordForm(true)
    setNewWord({ mainWord: text, secretWord: '', languageId: language.id })
  }

  const addWordToLanguage = async (id: number, word: Word) => {
    const body = {
      languageId: id,
      mainWord: word.mainWord,
      secretWord: word.secretWord,
    }
    const response = await fetchJson(`/api/words/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return response
  }

  const handleNewWordFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    // TODO: Move to a function in another file
    // something like: const newLanguage = languageReducer(language, mainWord, secretWord)
    // --------------------------
    const newLanguage = {
      ...language,
    }
    const wordToAdd = {
      mainWord: newWord.mainWord,
      secretWord: newWord.secretWord,
      id: null, // TODO: Need to set this value after making API call.
      languageId: language.id,
    }
    newLanguage.words.push(newWord)
    // --------------------------

    try {
      const response = await addWordToLanguage(language.id, newWord)
      mutateLanguage(newLanguage)
    } catch (error) {
      if (error instanceof FetchError) {
        console.log(error.data)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }

    setNewWord({ mainWord: '', secretWord: '', languageId: language.id })
    setShowNewWordForm(false)
  }

  const cancelNewWord = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    setNewWord({ mainWord: '', secretWord: '', languageId: language.id })
    setShowNewWordForm(false)
  }

  useEffect(() => {
    updateTranslationOutput()
  }, [updateTranslationOutput])
  // const handleTranslationInputChange = (e) => {
  //   e.preventDefault()

  //   setTranslationInput(e.target.value)
  //   updateTranslationOutput()
  // }

  useEffect(() => {
    let wordMap = new Map()
    language.words.forEach((w: Word) => {
      wordMap.set(w.mainWord.toLowerCase(), w)
    })
    setDictionaryMap(wordMap)
  }, [language, setDictionaryMap])

  return (
    <>
      <textarea
        value={translationInput}
        onChange={(e) => setTranslationInput(e.target.value)}
        // onChange={(e) => handleTranslationInputChange(e)}
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
          <form name="addFormPop" onSubmit={(e) => handleNewWordFormSubmit(e)}>
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
    </>
  )
}
