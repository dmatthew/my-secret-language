import { render, screen } from '@testing-library/react'
import Home from 'pages/index'
import React from 'react'

jest.mock('components/UserLanguageList', () => {
  return {
    __esModule: true,
    default: () => {
      return <></>
    },
  }
})

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /mi scrt lngwij/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
