import reducers from '../contexts/WordReducer'

describe('Words reducer', () => {
  it('should handle ADD_WORD', () => {
    expect(
      reducers([], {
        type: 'ADD_WORD',
        mainWord: 'mainWord',
        secretWord: 'secretWord',
      })
    ).toEqual([
      {
        mainWord: 'mainWord',
        secretWord: 'secretWord',
      },
    ])
  })

  it('should handle EDIT_WORD', () => {
    let initialState = [
      {
        mainWord: 'mainWord',
        secretWord: 'secretWord',
      },
    ]
    expect(
      reducers(initialState, {
        type: 'EDIT_WORD',
        mainWord: 'mainWord',
        secretWord: 'changedSecretWord',
      })
    ).toEqual([
      {
        mainWord: 'mainWord',
        secretWord: 'changedSecretWord',
      },
    ])
  })

  it('should handle DELETE_WORD', () => {
    let initialState = [
      {
        mainWord: 'mainWord',
        secretWord: 'secretWord',
      },
    ]
    expect(
      reducers(initialState, {
        type: 'DELETE_WORD',
        mainWord: 'mainWord',
      })
    ).toEqual([])
  })
})
