import Layout, { siteTitle } from 'components/layout'
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useWordContext } from 'contexts/word-context'
import { Word } from 'lib/types'
import Link from 'next/link'
import useUser from 'lib/useUser'
import { Language as LanguageType } from 'lib/types'
import fetchJson, { FetchError } from 'lib/fetchJson'

export default function Dictionary(): ReactElement {
  const { user } = useUser({
    redirectTo: '/login',
  })
  const router = useRouter()
  const [language, setLanguage] = useState<LanguageType>({ id: null, name: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const { state: words, dispatch: setWords } = useWordContext()

  useEffect(() => {
    async function getLanguage(id: number) {
      try {
        const response = await fetchJson<any>(`/api/languages/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        setLanguage(response.language)
      } catch (error) {
        if (error instanceof FetchError) {
          console.log(error.data.message)
        } else {
          console.error('An unexpected error happened:', error)
        }
      }
    }
    if (router.isReady) {
      const id = parseInt(router.query.languageId.toString())
      getLanguage(id)
    }
  }, [router])

  function sortByMainWord(wordsArray: Word[]): Word[] {
    wordsArray.sort((a, b) => {
      let valueA = a.mainWord.toLowerCase(),
        valueB = b.mainWord.toLowerCase()
      if (valueA < valueB) return -1
      if (valueA > valueB) return 1
      return 0
    })
    return wordsArray
  }

  let wordsToDisplay = []
  if (words) {
    let currentSearchTerm: string = searchTerm
    let currentLetter: string = ''
    wordsToDisplay = words.slice(0)
    wordsToDisplay = sortByMainWord(words)
    wordsToDisplay = words.map((word: Word, index: number) => {
      let found: boolean =
        word.mainWord.indexOf(currentSearchTerm) !== -1 ||
        word.secretWord.indexOf(searchTerm) !== -1
      if (currentSearchTerm === '' || found) {
        let isNewLetter: boolean =
          word.mainWord.substring(0, 1).toUpperCase() !== currentLetter
        currentLetter = word.mainWord.substring(0, 1).toUpperCase()

        return (
          <span key={index}>
            {isNewLetter && <li className="divider">{currentLetter}</li>}
            <li>
              <Link href={`/languages/${language.id}/edit-word/${word.id}`}>
                <a>
                  {word.mainWord}{' '}
                  <span className="right">{word.secretWord}</span>
                </a>
              </Link>
            </li>
          </span>
        )
      } else return undefined
    })
  }

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Dictionary</title>
      </Head>
      <div>
        <h3>Dictionary</h3>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="search"
          placeholder="Enter search term..."
        />
        <ul className="list">{wordsToDisplay}</ul>
      </div>
    </Layout>
  )
}
