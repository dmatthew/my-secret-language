import Layout, { siteTitle } from 'components/layout'
import Head from 'next/head'
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { useNoteContext } from 'contexts/note-context'
import { Note } from 'lib/types'
import { useRouter } from 'next/router'
import { NoteCategory } from 'lib/types'
import useUser from 'lib/useUser'

export default function EditNote(props): ReactElement {
  const { user } = useUser({
    redirectTo: '/login',
  })
  const router = useRouter()
  const [languageId, setLanguageId] = useState<number>(null)
  const [isEditingNote, setIsEditingNote] = useState(false)
  const { state: categoryNotes, dispatch: noteDispatch } = useNoteContext()
  let categorySlug = useRef<string>('')
  let id = useRef<number>(null)

  const getNoteFromQuery = useCallback(() => {
    let categoryGroup = categoryNotes.find((el: NoteCategory) => {
      return el.title.toLowerCase() === categorySlug.current.toLowerCase()
    })
    if (categoryGroup) {
      return categoryGroup.notes[id.current]
    }
  }, [categoryNotes, categorySlug, id])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (router.isReady) {
      const id = parseInt(router.query.languageId.toString())
      setLanguageId(id)
    }
  }, [router])

  useEffect(() => {
    if (router.isReady) {
      categorySlug.current = router.query.categorySlug.toString()
      id.current = parseInt(router.query.id.toString())
      let queryNote: Note = getNoteFromQuery()
      if (queryNote) {
        setTitle(queryNote.title)
        setDescription(queryNote.description)
      }
    }
  }, [router, getNoteFromQuery])

  const handleEditNoteFormSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault()

    noteDispatch({
      type: 'EDIT_NOTE',
      categorySlug: categorySlug.current,
      noteId: id.current,
      title: title,
      description: description,
      languageId: languageId,
    })
    router.back()
  }

  const handleDeleteNoteClick = (): void => {
    noteDispatch({
      type: 'DELETE_NOTE',
      categorySlug: categorySlug.current,
      id: id.current,
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
          {isEditingNote === false && (
            <div>
              <h1>{title}</h1>
              <div>{description}</div>
            </div>
          )}
          {isEditingNote === true && (
            <form onSubmit={(e) => handleEditNoteFormSubmit(e)}>
              <label htmlFor="noteTitleEdit">Note Title</label>
              <input
                id="note-title-edit"
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="noteDescriptionEdit">Note Description</label>
              <textarea
                id="note-description-edit"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <input
                type="submit"
                className="button btn-large"
                value="Save changes"
              />
            </form>
          )}
        </div>
        <button
          onClick={() => setIsEditingNote(true)}
          type="button"
          className="button btn-large"
        >
          Edit note
        </button>
        <button
          onClick={() => handleDeleteNoteClick()}
          type="button"
          className="button btn-large red"
        >
          Delete note
        </button>
      </div>
    </Layout>
  )
}

/** NOTE: This is needed to disable pre-rendering on this page only. */
EditNote.getInitialProps = async () => {
  return {}
}
