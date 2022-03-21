import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddWord from 'pages/languages/[languageId]/add-word'
import React from 'react'

describe('Add Word page', () => {
  it('renders and can save a new word', () => {
    render(<AddWord />)

    // User enters Main Word input.
    userEvent.type(screen.getByLabelText('Main Word'), 'Hello')
    expect(screen.getByLabelText('Main Word')).toHaveValue('Hello')

    // User enters Secret Word input.
    userEvent.type(screen.getByLabelText('Secret word'), 'gabba')
    expect(screen.getByLabelText('Secret word')).toHaveValue('gabba')

    // User clicks submit and form clears.
    userEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(screen.getByLabelText('Main Word')).toHaveValue('')
    expect(screen.getByLabelText('Secret word')).toHaveValue('')

    // After user clicks submit a new word is added to state.
    // ... TODO ...
  })
})
