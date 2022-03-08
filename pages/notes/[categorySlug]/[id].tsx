import Layout, { siteTitle} from '../../../components/layout'
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import { useNoteContext } from '../../../contexts/note-context'
import { Note } from '../../../lib/types'
import { useRouter } from 'next/router'
import { NoteCategory } from '../../../lib/types'

export default function EditNote(): ReactElement {
  const [isEditingNote, setIsEditingNote] = useState(false)
  const [categoryNotes, noteDispatch] = useNoteContext()
  const router = useRouter()
  const { categorySlug, id } = router.query

  const getNoteFromQuery = (): Note => {
    if (typeof id === "string") {
      if (typeof categorySlug === "string") {
        let categoryGroup = categoryNotes.find((el: NoteCategory) => {return el.title.toLowerCase() === categorySlug.toLowerCase()})
        if (categoryGroup) {
          return categoryGroup.notes[id]
        }
      }
      else {
        let categoryGroup = categoryNotes.find((el: NoteCategory) => {return el.title.toLowerCase() === categorySlug[0].toLowerCase()})
        if (categoryGroup) {
          return categoryGroup.notes[id]
        }
      }
    }
    else {
      if (typeof categorySlug === "string") {
        let categoryGroup = categoryNotes.find((el: NoteCategory) => {return el.title.toLowerCase() === categorySlug.toLowerCase()})
        if (categoryGroup) {
          return categoryGroup.notes[id[0]]
        }
      }
      else {
        let categoryGroup = categoryNotes.find((el: NoteCategory) => {return el.title.toLowerCase() === categorySlug[0].toLowerCase()})
        if (categoryGroup) {
          return categoryGroup.notes[id[0]]
        }
      }
    }
  }

  let queryNote: Note = getNoteFromQuery()
  const [note, setNote] = useState(queryNote)
  const [title, setTitle] = useState(note.title)
  const [description, setDescription] = useState(note.description)

  const handleEditNoteFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    noteDispatch({
      type: "EDIT_NOTE",
      categorySlug: categorySlug,
      noteId: id,
      title: title,
      description: description
    })
    router.back()
  }

  const handleDeleteNoteClick = (): void => {
    noteDispatch({
      type: "DELETE_NOTE",
      categorySlug: categorySlug,
      id: id
    })
    router.back()
  }

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Edit Word</title>
      </Head>
      <div>
        <div className="book-page">
          {isEditingNote === false &&
            <div>
              <h1>{title}</h1>
              <div>{description}</div>
            </div>
          }
          {isEditingNote === true &&
            <form onSubmit={(e) => handleEditNoteFormSubmit(e)}>
              <label htmlFor="noteTitleEdit">Note Title</label>
              <input
                id="note-title-edit" required type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
              <label htmlFor="noteDescriptionEdit">Note Description</label>
              <textarea
                id="note-description-edit" required
                value={description}
                onChange={(e) => setDescription(e.target.value)}>
              </textarea>
              <input type="submit" className="button btn-large" value="Save changes" />
            </form>
          }
        </div>
        <button onClick={() => setIsEditingNote(true)} type="button" className="button btn-large">Edit note</button>
        <button onClick={() => handleDeleteNoteClick()} type="button" className="button btn-large red">Delete note</button>
      </div>
    </Layout>
  )
}
