import { Note } from 'lib/types'
import { ReactElement } from 'react'
import Link from 'next/link'

export default function NoteListItem({
  category,
  notes,
  languageId,
}: {
  category: string
  notes: Note[]
  languageId: number
}): ReactElement {
  let notesList = notes.map((note, index) => {
    return (
      <li key={index} className="list-item">
        <Link
          href={`/languages/${languageId}/notes/${category.toLowerCase()}/${index}`}
        >
          {note.title}
        </Link>
      </li>
    )
  })

  return <ul className="list">{notesList}</ul>
}
