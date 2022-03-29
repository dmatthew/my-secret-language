import { render, screen } from '@testing-library/react'
import AddWordPage from 'pages/languages/[languageId]/add-word'
import React from 'react'

jest.mock('components/AddWordForm', () => {
  return {
    __esModule: true,
    default: () => {
      return <></>
    },
  }
})
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    }
  },
}))

describe('AddWordPage', () => {
  it('renders a heading', () => {
    render(<AddWordPage />)

    const heading = screen.getByRole('heading', {
      name: /mi scrt lngwij/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
