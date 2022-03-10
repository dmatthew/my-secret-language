import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import React from 'react'
import ReactDOM from 'react-dom'

describe('Home', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Home />, div)
  })

  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /mi scrt lngwij/i
    })

    expect(heading).toBeInTheDocument()
  })
})
