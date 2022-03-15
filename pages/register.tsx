import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import React, { ReactElement, useRef, useState } from 'react'
import Link from 'next/link'

export default function Register(): ReactElement {
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const emailInput = useRef(null)

  const registerUser = (): void => {
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
      fetch('/api/register', options)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
        })
    }
  }

  const validateAndRegister = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match')
    } else {
      registerUser()
    }
  }

  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Register</title>
      </Head>
      <div>
        <h3>Register</h3>
        <form name="registerForm" onSubmit={validateAndRegister}>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            ref={emailInput}
            name="email"
            id="email"
            placeholder="Email"
            required
            type="text"
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="passowrd"
            id="password"
            placeholder="Password"
            required
            type="password"
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirm-passowrd"
            id="confirm-password"
            placeholder="Confirm Password"
            required
            type="password"
          />
          <input type="submit" className="button btn-large" value="Register" />
        </form>
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
