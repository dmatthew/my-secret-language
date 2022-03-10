import reducers from '../contexts/NoteReducer'

describe('Notes reducer', () => {
  test('should handle ADD_NOTE', () => {
    expect(reducers([
      {  
        title: 'Tests',
        notes: []
      }
    ], {
      type: 'ADD_NOTE',
      categorySlug: 'Tests',
      title: 'This is a title',
      description: 'This is its description.'
    })).toEqual([
      {
        title: 'Tests',
        notes: [
          {
            title: 'This is a title',
            description: 'This is its description.'
          }
        ]
      }
    ])
  });

  test('should handle EDIT_NOTE', () => {
    let initialState = [
      {
        title: 'Tests',
        notes: [
          {
            title: 'This is a title',
            description: 'This is a description.'
          }
        ]
      }
    ];
    expect(reducers(initialState, {
      type: 'EDIT_NOTE',
      categorySlug: 'Tests',
      title: 'This is a title',
      description: 'Changed!',
      noteId: 0
    })).toEqual([
      {
        title: 'Tests',
        notes: [
          {
            title: 'This is a title',
            description: 'Changed!'
          }
        ]
      }
    ])
  });

  test('should handle DELETE_NOTE', () => {
    let initialState = [
      {
        title: 'Tests',
        notes: [
          {
            title: 'This is a title',
            description: 'This is a description.'
          }
        ]
      }
    ];
    expect(reducers(initialState, {
      type: 'DELETE_NOTE',
      categorySlug: 'Tests',
      id: 0
    })).toEqual([
      {
        title: 'Tests',
        notes: []
      }
    ])
  });
})