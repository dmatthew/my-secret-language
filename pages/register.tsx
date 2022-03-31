import Layout, { siteTitle } from 'components/layout'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import Link from 'next/link'
import useUser from 'lib/useUser'
import RegisterForm from 'components/RegisterForm'
import { User } from 'pages/api/user'

export default function Register(): ReactElement {
  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  })

  const userRegistered = (user: User): void => {
    mutateUser(user)
  }

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Register</title>
      </Head>
      <div>
        <h3>Register</h3>
        <RegisterForm onRegister={userRegistered} />
        <div>
          Already registered?{' '}
          <Link href="/login">
            <a>Sign in now</a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
