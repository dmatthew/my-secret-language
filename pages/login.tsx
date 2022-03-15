import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import React, { ReactElement, useRef, useState } from 'react'
import Link from 'next/link'

export default function Login(): ReactElement {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailInput = useRef(null)

  const loginUser = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (email.length && password.length) {
      const user = {
        email,
        password,
      }
      const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      }
      console.log(options)
      fetch('/api/login', options)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
        })
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
