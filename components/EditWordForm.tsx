import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useLanguage from 'lib/useLanguage'
import fetchJson, { FetchError } from 'lib/fetchJson'

export default function EditWordForm({
  languageId,
}: {
  languageId: number
}): ReactElement {
  const router = useRouter()
  const { language, mutateLanguage } = useLanguage(
    languageId ? languageId.toString() : null
  )
  const [wordId, setWordId] = useState('')
  const [mainWord, setMainWord] = useState('')
  const [secretWord, setSecretWord] = useState('')

  useEffect(() => {
    if (language) {
      const wordId = parseInt(router.query.id.toString())
      const word = language.words.find((el) => el.id === wordId)
      setWordId(word.id)
      setMainWord(word.mainWord)
      setSecretWord(word.secretWord)
    }
  }, [language, router])

  const deleteWord = async (
    event: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      const response = await fetchJson(`/api/words/${wordId}/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      // TODO: Move to a function in another file
      // something like: const newLanguage = languageReducer(language, mainWord, secretWord)
      // --------------------------
      const newLanguage = {
        ...language,
      }
      const index = language.words
        .map((el) => {
          return el.mainWord
        })
        .indexOf(mainWord)
      newLanguage.words.splice(index, 1)
      // --------------------------

      mutateLanguage(newLanguage)
    } catch (error) {
      if (error instanceof FetchError) {
        console.log(error.data)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }

    router.back()
  }

  const handleEditWordFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    const body = {
      mainWord: mainWord,
      secretWord: secretWord,
    }
    try {
      const response = await fetchJson<{ message: string; word?: Word }>(
        `/api/words/${wordId}/edit`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      )
      if (response.word) {
        // TODO: Move to a function in another file
        // something like: const newLanguage = languageReducer(language, mainWord, secretWord)
        // --------------------------
        const newLanguage = {
          ...language,
        }
        const index = language.words
          .map((el) => {
            return el.mainWord
          })
          .indexOf(mainWord)
        language.words[index] = {
          mainWord: mainWord,
          secretWord: secretWord,
          id: wordId,
          languageId: language.id,
        }
        // --------------------------

        mutateLanguage(newLanguage)
      }
    } catch (error) {
      if (error instanceof FetchError) {
        console.log(error.data)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }

    setMainWord('')
    setSecretWord('')
    router.back()
  }

  return (
    <div className="panel" title="Dictionary" id="edit-dictionary">
      <form name="editWordForm" onSubmit={(e) => handleEditWordFormSubmit(e)}>
        <label htmlFor="edit-main-text">Main word</label>
        <input
          name="editMainText"
          id="edit-main-text"
          onChange={(e) => setMainWord(e.target.value)}
          value={mainWord}
          required
          type="text"
        />
        <label htmlFor="edit-secret-text">Secret word</label>
        <input
          id="edit-secret-text"
          onChange={(e) => setSecretWord(e.target.value)}
          value={secretWord}
          autoFocus
          required
          type="text"
        />
        <input type="submit" className="button btn-large" value="Save" />
      </form>
      <button className="button btn-large red" onClick={(e) => deleteWord(e)}>
        Delete
      </button>
    </div>
  )
}
