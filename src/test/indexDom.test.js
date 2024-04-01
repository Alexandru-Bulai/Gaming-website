import { moveMenu, pageCount, addGameToCart } from '../javaScript/indexDom'

describe('Highlight menu count', () => {
  test('Check if count starts at 0', () => {
    expect(pageCount).toBe(0)
  })

  test('Check increasing count', () => {
    moveMenu(true, false)
    expect(pageCount).toBe(+1)
  })

  test('Check decreaseing count', () => {
    moveMenu(false, true)
    expect(pageCount).toBe(0)
  })

  test('Ensure nothing else can affect count', () => {
    moveMenu(false, false)
    expect(pageCount).toBe(0)
  })

  test('Throw error when both add and sub are true', () => {
    expect(() => moveMenu(true, true)).toThrow(
      'Please select only one option at a time'
    )
  })
})

describe('addGameToCart', () => {
  it('appends a new game item to the cart container and returns true', () => {
    document.body.innerHTML = '<div id="game-items-container"></div>'
    const cartContainer = document.querySelector('#game-items-container')

    const result = addGameToCart(cartContainer, 'Game name', '$60', 'img.png')

    expect(cartContainer.children.length).toBe(1)
    expect(result).toBe(true)
    expect(cartContainer.innerHTML).toContain('Game name')
    expect(cartContainer.innerHTML).toContain('$60')
    expect(cartContainer.innerHTML).toContain('img.png')
  })

  it('returns false when the cart container is not provided', () => {
    const result = addGameToCart(null, 'Test Game', '$10', 'test-img.png')
    expect(result).toBe(false)
  })
})
