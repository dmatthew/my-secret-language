import Layout, { siteTitle } from 'components/layout'
import Head from 'next/head'
import React, { ReactElement, useRef, useState } from 'react'
import Link from 'next/link'
import useUser from 'lib/useUser'
import fetchJson, { FetchError } from 'lib/fetchJson'

export default function Login(): ReactElement {
  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailInput = useRef(null)

  const loginUser = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    if (email.length && password.length) {
      const body = {
        email: email,
        password: password,
      }

      try {
        mutateUser(
          await fetchJson('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
        )
      } catch (error) {
        if (error instanceof FetchError) {
          console.log(error.data.message)
        } else {
          console.error('An unexpected error happened:', error)
        }
      }
    }
  }

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Login</title>
      </Head>
      <div>
        <h3>Login</h3>
        <form name="loginForm" onSubmit={loginUser}>
          <label htmlFor="main-text">Username</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailInput}
            name="email"
            id="email"
            placeholder="Email"
            required
            type="text"
          />
          <label htmlFor="secret-text">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="passowrd"
            id="password"
            placeholder="Password"
            required
            type="password"
          />
          <input type="submit" className="button btn-large" value="Login" />
        </form>
        <div>
          Not yet registered?{' '}
          <Link href="/register">
            <a>Sign up now</a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
