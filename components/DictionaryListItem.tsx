import { ReactElement } from 'react'
import Link from 'next/link'
import { Word } from 'lib/types'

export default function DictionaryListItem({
  languageId,
  word,
}: {
  languageId: string
  word: Word
}): ReactElement {
  return (
    <li>
      <Link href={`/languages/${languageId}/edit-word/${word.id}`}>
        <a>
          {word.mainWord} <span className="right">{word.secretWord}</span>
        </a>
      </Link>
    </li>
  )
}
