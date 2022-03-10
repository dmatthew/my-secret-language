import Layout, { siteTitle} from '../../../components/layout'
import Head from 'next/head'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { useNoteContext } from '../../../contexts/note-context'
import { Note } from '../../../lib/types'
import { useRouter } from 'next/router'
import { NoteCategory } from '../../../lib/types'

export default function EditNote(props): ReactElement {
  const [isEditingNote, setIsEditingNote] = useState(false)
  const [categoryNotes, noteDispatch] = useNoteContext()
  const router = useRouter()
  const { categorySlug, id } = router.query

  const getNoteFromQuery = useCallback(
    () => {
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
    },
    [categoryNotes, categorySlug, id]
  )

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    /**
     * TODO: The first time this EditNote component gets rendered the categoryNotes value from the context doesn't have the values from localStorage.
     * This useEffect function may be a hack and not following best practices for React ad/or Next.js.
     */
    if (!title) { 
      let queryNote: Note = getNoteFromQuery()
      if (queryNote) {
        setTitle(queryNote.title)
        setDescription(queryNote.description)
      }
    }
  }, [title, getNoteFromQuery])

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

/** NOTE: This is needed to disable pre-rendering on this page only. */
EditNote.getInitialProps = async () => {
  return {}
}
