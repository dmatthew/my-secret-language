import Layout, { siteTitle} from '../components/layout'
import Head from 'next/head'
import { ReactElement, useState } from 'react';
import { useAppContext } from '../contexts/word-context';
import { Word } from '../lib/types'
import Link from 'next/link'

export default function Dictionary(): ReactElement {
  const [searchTerm, setSearchTerm] = useState('')
  const [words, setWords] = useAppContext()

  function sortByMainWord(wordsArray: Word[]): Word[] {
    wordsArray.sort((a, b) => {
      let valueA = a.mainWord.toLowerCase(), valueB = b.mainWord.toLowerCase();
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    })
    return wordsArray
  }

  let wordsToDisplay: Word[] = []
  if (words) {
    let currentSearchTerm: string = searchTerm
    let currentLetter: string = ''
    wordsToDisplay = words.slice(0)
    wordsToDisplay = sortByMainWord(words)
    wordsToDisplay = words.map((word: Word, index: number) => {
      let found: boolean = word.mainWord.indexOf(currentSearchTerm) !== -1 || word.secretWord.indexOf(searchTerm) !== -1
      if (currentSearchTerm === '' || found) {
        let isNewLetter: boolean = word.mainWord.substr(0, 1).toUpperCase() !== currentLetter
        currentLetter = word.mainWord.substr(0, 1).toUpperCase()
        
        return (
          <span key={index}>
            {isNewLetter &&
              <li className="divider">{currentLetter}</li>
            }
            <li>
              <Link href={`/edit-word/${word.mainWord}`}>
                <a>
                  {word.mainWord} <span className="right">{word.secretWord}</span>
                </a>
              </Link>
            </li>
          </span>
        )
      }
      else return undefined
    })
  }

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Dictionary</title>
      </Head>
      <div>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="search" placeholder="Enter search term..." />
        <ul className="list">
          {wordsToDisplay}
        </ul>
      </div>
    </Layout>
   )
}
