import fetchJson from 'lib/fetchJson'
import { addWordToLanguage, deleteWord, editWord } from 'lib/words'

jest.mock('lib/fetchJson')

describe('lib/words::addWordToLanguage', () => {
  it('returns a Word object on success', async () => {
    const languageId = 1
    const mainWord = 'Test'
    const secretWord = 'abc'
    const expected = {
      languageId: 1,
      mainWord: 'Test',
      secretWord: 'abc',
      id: 1,
    }

    ;(fetchJson as jest.Mock).mockReturnValue({
      data: {
        languageId: 1,
        mainWord: 'Test',
        secretWord: 'abc',
        id: 1,
      },
    })
    const word = await addWordToLanguage(languageId, mainWord, secretWord)
    expect(word).toEqual(expected)
  })

  it('returns null on failure', async () => {
    const languageId = 1
    const mainWord = 'test'
    const secretWord = 'abc'
    const expected = null

    ;(fetchJson as jest.Mock).mockReturnValue({
      error: {
        message: 'This is an error message.',
      },
    })
    const word = await addWordToLanguage(languageId, mainWord, secretWord)
    expect(word).toBeFalsy()
  })
})

describe('lib/words::deleteWord', () => {
  it('returns true on success', async () => {
    const wordId = 1

    ;(fetchJson as jest.Mock).mockReturnValue({
      data: {
        success: true,
      },
    })
    const word = await deleteWord(wordId)
    expect(word).toEqual(true)
  })

  it('returns false on failure', async () => {
    const wordId = 1

    ;(fetchJson as jest.Mock).mockReturnValue({
      error: {
        message: 'This is an error message.',
      },
    })
    const word = await deleteWord(wordId)
    expect(word).toBeFalsy()
  })
})

describe('lib/words::editWord', () => {
  it('returns the updated word on success', async () => {
    const wordId = 1
    const mainWord = 'test'
    const secretWord = 'abc'
    const expected = {
      languageId: 1,
      mainWord: 'Test',
      secretWord: 'abc',
      id: 1,
    }

    ;(fetchJson as jest.Mock).mockReturnValue({
      data: {
        languageId: 1,
        mainWord: 'Test',
        secretWord: 'abc',
        id: 1,
      },
    })
    const word = await editWord(wordId, mainWord, secretWord)
    expect(word).toEqual(expected)
  })

  it('returns null on failure', async () => {
    const wordId = 1
    const mainWord = 'test'
    const secretWord = 'abc'

    ;(fetchJson as jest.Mock).mockReturnValue({
      error: {
        message: 'This is an error message.',
      },
    })
    const word = await editWord(wordId, mainWord, secretWord)
    expect(word).toBeFalsy()
  })
})
