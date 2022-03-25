import { ReactElement, useEffect, useState } from 'react'
import Link from 'next/link'
import NewLanguageForm from './NewLanguageForm'
import { LanguageType } from 'lib/types'
import { getUserLanguages } from 'lib/languages'

export default function UserLanguageList(): ReactElement {
  const [userLanguages, setUserLanguages] = useState<LanguageType[]>([])

  useEffect(() => {
    async function loadUserLanguages() {
      const response = await getUserLanguages()
      setUserLanguages(response)
    }

    loadUserLanguages()
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
