import Layout, { siteTitle } from 'components/layout'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { NoteCategory, Note } from 'lib/types'
import Link from 'next/link'
import NoteListItem from 'components/NoteListItem'
import { useNoteContext } from 'contexts/note-context'
import useUser from 'lib/useUser'

export default function Notes(): ReactElement {
  const { user } = useUser({
    redirectTo: '/login',
  })
  const { state: categoryNotes, dispatch: noteDispatch } = useNoteContext()

  let categoryList = categoryNotes.map(
    (category: NoteCategory, index: number) => {
      return (
        <div key={index}>
          <h3 className="divider category">{category.title}</h3>
          <NoteListItem category={category.title} notes={category.notes} />
          <div className="center-content">
            <Link href={`/notes/${category.title}/add-note`}>
              <a className="button btn-sepia icon add">
                Add {category.title} Note
              </a>
            </Link>
          </div>
        </div>
      )
    }
  )

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Notes</title>
      </Head>
      <div>{categoryList}</div>
    </Layout>
  )
}
