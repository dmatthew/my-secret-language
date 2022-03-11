import { Note } from '../lib/types'
import { ReactElement } from 'react'
import Link from 'next/link'

export default function NoteListItem({
  category,
  notes,
}: {
  category: string
  notes: Note[]
}): ReactElement {
  let notesList = notes.map((note, index) => {
    return (
      <li key={index} className="list-item">
        <Link href={`/notes/${category.toLowerCase()}/${index}`}>
          {note.title}
        </Link>
      </li>
    )
  })

  return <ul className="list">{notesList}</ul>
}
