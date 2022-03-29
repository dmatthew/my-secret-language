import Layout, { siteTitle } from 'components/layout'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { Word } from 'lib/types'
import useUser from 'lib/useUser'
import useLanguage from 'lib/useLanguage'
import DictionaryListItem from 'components/DictionaryListItem'

export default function DictionaryPage(): ReactElement {
  const { user } = useUser({
    redirectTo: '/login',
  })
  const router = useRouter()
  const { languageId } = router.query
  const { language } = useLanguage(languageId ? languageId.toString() : null)
  const [searchTerm, setSearchTerm] = useState('')

  function sortByMainWord(wordsArray: Word[]): Word[] {
    return wordsArray.sort((a, b) => {
      let valueA = a.mainWord.toLowerCase(),
        valueB = b.mainWord.toLowerCase()
      if (valueA < valueB) return -1
      if (valueA > valueB) return 1
      return 0
    })
  }

  let filteredWords = []
  if (language && language.words) {
    let currentLetter: string = ''
    filteredWords = sortByMainWord(language.words).map(
      (word: Word, index: number) => {
        let found: boolean =
          word.mainWord.indexOf(searchTerm) !== -1 ||
          word.secretWord.indexOf(searchTerm) !== -1
        if (found) {
          let isNewLetter: boolean =
            word.mainWord.substring(0, 1).toUpperCase() !== currentLetter
          currentLetter = word.mainWord.substring(0, 1).toUpperCase()

          return (
            <span key={index}>
              {isNewLetter && <li className="divider">{currentLetter}</li>}
              <DictionaryListItem
                languageId={languageId.toString()}
                word={word}
              />
            </span>
          )
        }
      }
    )
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
          type="text"
          placeholder="Enter search term..."
        />
        <ul className="list">{filteredWords}</ul>
      </div>
    </Layout>
  )
}
