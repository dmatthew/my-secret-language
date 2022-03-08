import Layout, { siteTitle} from '../../../components/layout'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { useNoteContext } from '../../../contexts/note-context'
import { useRouter } from 'next/router'
import { NoteCategory } from '../../../lib/types'

export default function AddNote(): ReactElement {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryNotes, noteDispatch] = useNoteContext()

  const getCategoryFromQuery = (): string => {
    const router = useRouter()
    const { categorySlug } = router.query

    if (typeof categorySlug === "string") {
      let categoryGroup = categoryNotes.find((el: NoteCategory) => {return el.title.toLowerCase() === categorySlug.toLowerCase()})
      if (categoryGroup) {
        return categoryGroup.title
      }
    } else {
      let categoryGroup = categoryNotes.find((el: NoteCategory) => {return el.title.toLowerCase() === categorySlug[0].toLowerCase()})
      if (categoryGroup) {
        return categoryGroup.title
      }
    }
  }

  let category: string = getCategoryFromQuery()

  const handleAddNoteFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    noteDispatch({
      type: "ADD_NOTE",
      categorySlug: category,
      title: title,
      description: description
    })
    router.back()
  }

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Edit Word</title>
      </Head>
      <div>
      <div className="formGroupHead">Category: {category}</div>
  		  <form name="addNoteForm" onSubmit={(e) => handleAddNoteFormSubmit(e)}>
    			<label htmlFor="noteTitleText">Note Title</label>
    			<input
            name="noteTitleText"
            id="note-title-text"
            placeholder="Note title here..."
            required type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title} />
    			<label htmlFor="noteDescription">Description</label>
    			<textarea
            required
            placeholder="Enter your note description..."
            onChange={(e) => setDescription(e.target.value)}
            value={description}></textarea>
    			<input type="submit" className="button btn-large" value="Save note" />
  		  </form>
      </div>
    </Layout>
  )
}

AddNote.getInitialProps = async ({ req }) => {
  return {}
}
