export let pageCount = 0

export function moveMenu(add, sub) {
  if (add) {
    pageCount += 1
  }
  if (sub) {
    pageCount -= 1
  }
  if (pageCount <= 0) {
    pageCount = 0
  }
  if (add && sub) {
    throw new Error('Please select only one option at a time')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const nextBtn = document.querySelector('#highlight-foreward')
  const prevBtn = document.querySelector('#highlight-backward')
  const highlightContainers = document.querySelectorAll('.highlight-container')
  const totalDivs = highlightContainers.length

  function updateVisibility() {
    highlightContainers.forEach((div, index) => {
      div.style.display = index === pageCount ? 'block' : 'none'
    })
  }

  function updatePage() {
    if (pageCount > totalDivs - 1 || pageCount <= 0) {
      pageCount = 0
    }
    updateVisibility()
  }

  nextBtn.addEventListener('click', () => {
    moveMenu(true, false)
    updatePage()
  })

  prevBtn.addEventListener('click', () => {
    moveMenu(false, true)
    updatePage()
  })

  const gamesContainer = document.querySelector('#grid-games')
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
          ` 
        <div
          class="game-contaimer group relative h-96 w-72 items-center hover:bg-[#304F69] hover:bg-opacity-90 sm:h-80 sm:w-56 md:h-64 md:w-52"
        >
          <img
            class="h-full max-h-[80%] w-full group-hover:hidden"
            src="/assets/home-page/game-cover/${game.cover}"
            alt="${game.name} cover"
          />

          <div
            class="mt-16 hidden w-full flex-col justify-center text-center transition-all group-hover:flex"
          >
            <button
              class="game-container-dark-style transition-all duration-300 hover:scale-105 hover:ring-opacity-100"
            >
              Add to cart
            </button>
            <div class="game-container-dark-style">Price: $${game.price}</div>
          </div>

          <div
            class="absolute bottom-0 flex h-1/5 w-full items-center justify-center bg-[#131B26] text-center font-extrabold text-white"
          >
            ${game.name}
          </div>
        </div>
        `,
        )
      })
    })
})
