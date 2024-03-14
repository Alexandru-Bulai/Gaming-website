/**
 * @param {boolean} add - If true, increments the pageCount by 1.
 * @param {boolean} sub - If true, decrements the pageCount by 1.
 */

export let pageCount = 0

export function moveMenu (add, sub) {
  if (add) {
    pageCount += 1
  }
  if (sub) {
    pageCount -= 1
  }
  if (pageCount < 0) {
    pageCount = 0
  }
  if (add && sub) {
    throw new Error('Please select only one option at a time')
  }
}
