import React, { ReactElement, useRef, useState } from 'react'
import fetchJson, { FetchError } from 'lib/fetchJson'
import { User } from 'pages/api/user'

export default function RegisterForm({
  onRegister,
}: {
  onRegister: (user: User) => void
}): ReactElement {
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [hasPasswordError, setHasPasswordError] = useState(false)
  const [hasEmailError, setHasEmailError] = useState(false)
  const emailInput = useRef(null)

  const registerUser = async (): Promise<void> => {
    if (email.length && password.length) {
      const body = {
        email,
        password,
      }

      try {
        const user = await fetchJson<User>('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        onRegister(user)
      } catch (error) {
        if (error instanceof FetchError) {
          setHasEmailError(true)
          console.log(error.data.error.message)
        } else {
          console.error('An unexpected error happened:', error)
        }
      }
    }
  }

  const validateAndRegister = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault()
    setHasPasswordError(false)
    setHasEmailError(false)
    if (!email.length) {
      alert('Email missing')
    } else if (password !== confirmPassword) {
      setHasPasswordError(true)
    } else {
      registerUser()
    }
  }

  return (
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
      {hasEmailError && <div>* This email is already in use.</div>}
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
      {hasPasswordError && (
        <div>
          <span>{"* Those passwords didn't match. Try again."}</span>
        </div>
      )}
      <input type="submit" className="button btn-large" value="Register" />
    </form>
  )
}
