import { ReactElement, useEffect, useState } from 'react'
import Link from 'next/link'
import fetchJson, { FetchError } from 'lib/fetchJson'
import NewLanguageForm from './NewLanguageForm'

export default function UserLanguageList(): ReactElement {
  const [userLanguages, setUserLanguages] = useState([])

  useEffect(() => {
    async function getUserLanguages() {
      try {
        const response = await fetchJson<any>('/api/user/languages', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        setUserLanguages(response)
      } catch (error) {
        if (error instanceof FetchError) {
          console.log(error.data.message)
        } else {
          console.error('An unexpected error happened:', error)
        }
      }
    }
    getUserLanguages()
  }, [setUserLanguages])

  return (
    <>
      {userLanguages.length > 0 ? (
        <div>
          {userLanguages.map((language, index) => {
            return (
              <Link href={`/languages/${language.id}`} key={index}>
                <a className="button btn-large">{language.name}</a>
              </Link>
            )
          })}
        </div>
      ) : (
        <div>
          <div>
            Looks like you have no languages. Get started by creating your first
            language now.
          </div>
          <NewLanguageForm redirect={true} />
        </div>
      )}
    </>
  )
}
