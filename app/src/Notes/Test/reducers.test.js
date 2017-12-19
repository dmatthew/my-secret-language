import reducers from '../reducers';

describe('notes reducer', () => {
  test('should handle ADD_NOTE', () => {
    expect(reducers([
      {  
        categoryTitle: 'Tests',
        categoryNotes: []
      }
    ], {
      type: 'ADD_NOTE',
      category: 'Tests',
      title: 'This is a title',
      description: 'This is its description.'
    })).toEqual([
      {
        categoryTitle: 'Tests',
        categoryNotes: [
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
        categoryTitle: 'Tests',
        categoryNotes: [
          {
            title: 'This is a title',
            description: 'This is a description.'
          }
        ]
      }
    ];
    expect(reducers(initialState, {
      type: 'EDIT_NOTE',
      category: 'Tests',
      title: 'This is a title',
      description: 'Changed!',
      index: 0
    })).toEqual([
      {
        categoryTitle: 'Tests',
        categoryNotes: [
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
        categoryTitle: 'Tests',
        categoryNotes: [
          {
            title: 'This is a title',
            description: 'This is a description.'
          }
        ]
      }
    ];
    expect(reducers(initialState, {
      type: 'DELETE_NOTE',
      category: 'Tests',
      index: 0
    })).toEqual([
      {
        categoryTitle: 'Tests',
        categoryNotes: []
      }
    ])
  });
})
