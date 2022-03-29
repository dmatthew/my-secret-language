import Layout, { siteTitle } from 'components/layout'
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import { NoteCategory } from 'lib/types'
import Link from 'next/link'
import NoteListItem from 'components/NoteListItem'
import { useNoteContext } from 'contexts/note-context'
import useUser from 'lib/useUser'
import { useRouter } from 'next/router'
import useLanguage from 'lib/useLanguage'
import fetchJson, { FetchError } from 'lib/fetchJson'

export default function Notes(): ReactElement {
  const { user } = useUser({
    redirectTo: '/login',
  })
  const router = useRouter()
  const { languageId } = router.query
  const { language, mutateLanguage } = useLanguage(
    languageId ? languageId.toString() : null
  ) // const [language, setLanguage] = useState<LanguageType>({ id: null, name: '' })
  const { state: categoryNotes, dispatch: noteDispatch } = useNoteContext()

  useEffect(() => {
    async function getLanguage(id: number) {
      try {
        const response = await fetchJson<any>(`/api/languages/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        // setLanguage(response.language)
      } catch (error) {
        if (error instanceof FetchError) {
          console.log(error.data)
        } else {
          console.error('An unexpected error happened:', error)
        }
      }
    }
    if (router.isReady) {
      const id = parseInt(router.query.languageId.toString())
      getLanguage(id)
    }
  }, [router])

  let categoryList = categoryNotes.map(
    (category: NoteCategory, index: number) => {
      return (
        <div key={index}>
          <h3 className="divider category">{category.title}</h3>
          <NoteListItem
            category={category.title}
            notes={category.notes}
            languageId={language.id}
          />
          <div className="center-content">
            <Link
              href={`/languages/${language.id}/notes/${category.title}/add-note`}
            >
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
