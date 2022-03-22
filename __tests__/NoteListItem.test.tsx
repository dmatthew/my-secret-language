import { render, screen } from '@testing-library/react'
import NoteListItem from 'components/NoteListItem'
import React from 'react'
import ReactDOM from 'react-dom'

describe('NoteListItem', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    const notes = [
      {
        title: 'Title',
        description: 'Description',
        languageId: 1,
        noteCategoryId: 1,
      },
    ]
    ReactDOM.render(
      <NoteListItem category="Category" notes={notes} languageId={1} />,
      div
    )
  })
  it('renders a note title', () => {
    const notes = [
      {
        title: 'Title',
        description: 'Description',
        languageId: 1,
        noteCategoryId: 1,
      },
    ]
    render(<NoteListItem category="Category" notes={notes} languageId={1} />)
    const title = screen.getByRole('link', {
      name: /Title/i,
    })
    expect(title).toBeInTheDocument()
  })
})
