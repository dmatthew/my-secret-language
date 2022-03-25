import React, { ReactElement, useEffect, useRef, useState } from 'react'
import useLanguage from 'lib/useLanguage'
import { addWordToLanguage } from 'lib/words'

export default function AddWordForm({
  languageId,
}: {
  languageId: string
}): ReactElement {
  const { language, mutateLanguage } = useLanguage(
    languageId ? languageId : null
  )
  const [mainWord, setMainWord] = useState('')
  const [secretWord, setSecretWord] = useState('')
  const mainWordInput = useRef(null)

  const handleAddWord = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    const word = await addWordToLanguage(language.id, mainWord, secretWord)
    if (word) {
      // TODO: Move to a function in another file
      // something like: const newLanguage = languageReducer(language, mainWord, secretWord)
      // --------------------------
      const newLanguage = {
        ...language,
      }
      const newWord = {
        mainWord: mainWord,
        secretWord: secretWord,
        id: word.id,
        languageId: language.id,
      }
      newLanguage.words.push(newWord)
      // --------------------------

      mutateLanguage(newLanguage)
      setMainWord('')
      setSecretWord('')
      mainWordInput.current.focus()
    }
  }

  useEffect(() => {
    mainWordInput.current.focus()
  }, [])

  return (
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
  )
}
