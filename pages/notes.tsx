import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { NoteCategory, Note } from '../lib/types'
import Link from 'next/link'
import IndividualNote from '../components/IndividualNote'
import { useNoteContext } from '../contexts/note-context'

export default function Notes(): ReactElement {
  const [categoryNotes, noteDispatch] = useNoteContext()

  let categoryList = categoryNotes.map((category: NoteCategory, index: number) => {
    return (
      <div key={index}>
        <h3 className="divider category">{category.title}</h3>
        <IndividualNote category={category.title} notes={category.notes} />
        <div className="center-content">
          <Link href={`/notes/${category.title}/add-note`}>
            <a className="button btn-sepia icon add">Add Note</a>
          </Link>
        </div>
      </div>
    )
  })

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Notes</title>
      </Head>
      <div>
        {categoryList}
      </div>
    </Layout>
   )
}
