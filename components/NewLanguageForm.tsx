import { useState } from 'react'

export default function NewLanguageForm() {
  const [languageName, setLanguageName] = useState('')

  const handleAddLanguage = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
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
