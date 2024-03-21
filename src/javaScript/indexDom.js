export let pageCount = 0

export function moveMenu(add, sub) {
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

  function updatePage() {
    if (pageCount >= totalDivs || pageCount < 0) {
      pageCount = 0
    }

    updateVisibility()
  }

  function updateVisibility() {
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

  const gamesContainer = document.querySelector('.grid-index')
  const gamesPath = 'src/javaScript/games.json'

  fetch(gamesPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      const allGames = data.payload.gamesDetail
      allGames.forEach((game) => {
        gamesContainer.insertAdjacentHTML(
          'beforeend',
          `<div class="game-footer-container">
              <img
              class = "hover:hidden"
                src="/assets/home-page/game-cover/${game.cover}"
                alt="${game.name} cover"
              />
              <div class="mt-8 flex w-full flex-col justify-center text-center">
                <button class="game-container-cart">Add to cart</button>
                <div class="game-container-price">Price: $${game.price}</div>
              </div>
              <div class="game-title">${game.name}</div>
            </div>`,
        )
      })
    })
})
