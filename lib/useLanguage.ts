import useSWR from 'swr'
import { Language } from 'lib/types'
import fetchJson from './fetchJson'

export default function useLanguage(languageId: string) {
  const { data: language, mutate: mutateLanguage } = useSWR<Language>(
    languageId ? `/api/languages/${languageId}` : null,
    () =>
      fetchJson(`/api/languages/${languageId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
  )

  return { language, mutateLanguage }
}
