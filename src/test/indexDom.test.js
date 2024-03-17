import { moveMenu, pageCount } from '../javaScript/indexDom'

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
