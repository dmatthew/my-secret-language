import { LanguageType } from 'lib/types'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import fetchJson, { FetchError } from 'lib/fetchJson'

export default function NewLanguageForm({
  redirect = false,
}: {
  redirect?: boolean
}): ReactElement {
  const [languageName, setLanguageName] = useState('')
  const router = useRouter()

  const addLanguage = async (
    name: string
  ): Promise<{ message: string; language?: LanguageType }> => {
    const body = {
      name: languageName,
    }
    const response = await fetchJson<{
      message: string
      language?: LanguageType
    }>(`/api/languages/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return response
  }

  const handleAddLanguage = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      const response = await addLanguage(languageName)
      if (response.language) {
        if (redirect) {
          router.push(`/languages/${response.language.id}`)
        }
      }
    } catch (error) {
      if (error instanceof FetchError) {
        console.log(error.data)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }
  }

  return (
    <form name="newLanguageForm" onSubmit={handleAddLanguage}>
      <label htmlFor="language-name-text">Language Name</label>
      <input
        value={languageName}
        onChange={(e) => setLanguageName(e.target.value)}
        name="languageName"
        id="language-name-text"
        placeholder="Give your new language a name"
        required
        type="text"
      />
      <input type="submit" className="button btn-large" value="Save" />
    </form>
  )
}
