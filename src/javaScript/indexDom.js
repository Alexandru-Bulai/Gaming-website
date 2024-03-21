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

document.addEventListener('DOMContentLoaded', () => {
  const nextBtn = document.querySelector('.highlight-foreward')
  const prevBtn = document.querySelector('.highlight-backward')
  const highlightContainers = document.querySelectorAll('.highlight-container')
  const totalDivs = highlightContainers.length

  function updatePage () {
    if (pageCount >= totalDivs || pageCount < 0) {
      pageCount = 0
    }

    updateVisibility()
  }

  function updateVisibility () {
    highlightContainers.forEach((div, index) => {
      div.style.display = index === pageCount ? 'block' : 'none'
    })
  }

  nextBtn.addEventListener('click', () => {
    moveMenu(true, false)
    updatePage()
  })

  prevBtn.addEventListener('click', () => {
    moveMenu(false, true)
    updatePage()
  })

  updatePage()
})
