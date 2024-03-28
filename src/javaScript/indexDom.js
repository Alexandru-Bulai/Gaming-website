export let pageCount = 0

export function moveMenu (add, sub) {
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
  const mainHighlightContainer = document.querySelector('#mainHighlight')

  function updateVisibility () {
    const highlightVisibility = document.querySelectorAll(
      '.highlight-container'
    )

    highlightVisibility.forEach((div, index) => {
      div.style.display = index === pageCount ? 'block' : 'none'
    })
  }

  function updatePage () {
    const highlightContainer = document.querySelectorAll('.highlight-container')
    const totalDivs = highlightContainer.length

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
      populateGamesContainer(allGames, gamesContainer)
      populateGamesHighlights(allGames, mainHighlightContainer)
    })
})

function populateGamesContainer (payload, gamesContainer) {
  payload.forEach((game) => {
    gamesContainer.insertAdjacentHTML(
      'beforeend',
      ` 
    <div
      class="game-contaimer group relative h-96 w-72 items-center hover:bg-[#304F69] hover:bg-opacity-90 sm:h-80 sm:w-56 md:h-64 md:w-52"
    >
      <!-- Game cover image -->
      <img
        class="h-full max-h-[80%] w-full group-hover:hidden"
        src="/assets/home-page/game-cover/${game.cover}"
        alt="${game.name} cover"
      />

      <!-- Game details -->
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

      <!-- Game name -->
      <div
        class="absolute bottom-0 flex h-1/5 w-full items-center justify-center bg-[#131B26] text-center font-extrabold text-white"
      >
      ${game.name}
      </div>
    </div>
    `
    )
  })
}

function populateGamesHighlights (payload, mainHighlightContainer) {
  payload.forEach((game, index) => {
    const gameplayImages = getImage(game, index)
    mainHighlightContainer.insertAdjacentHTML(
      'beforeend',
      `<div class="highlight-container group hidden h-full w-full max-w-sm border-4 border-[#0B1215]">
          <!-- Game highlight image -->
          <img class="h-full  w-full group-hover:hidden"
               src="/assets/home-page/highlights/${game.highlight}"
               alt="${game.name} cover"/>
          <!-- Gameplay images -->
          <div class="hidden h-3/5 justify-between group-hover:flex">
            <div class="gameplay-image flex flex-1 justify-center m-3">
            ${gameplayImages}
            </div>
          </div>
          <!-- Game name -->
          <p class="hidden h-1/5 text-center group-hover:block">${game.name}</p>
          <!-- Add to cart button and price -->
          <div class="flex justify-between">
            <div class="dark-button mx-5 hidden size-10 items-center justify-center rounded-full ring-2 group-hover:flex">🛒</div>
            <div class="dark-button mx-5 hidden size-10 w-24 items-center justify-center rounded-full ring-2 group-hover:flex">
              Price: $${game.price}
            </div>
          </div>
        </div>`
    )
  })
}

function getImage (game, index) {
  let currentIndex = 0

  if (Array.isArray(game.gameplay) && game.gameplay.length > 0) {
    const gameplayImages = `<img class="w-full h-full gameplay-image-${index}" src="/assets/home-page/gameplay/${game.gameplay[currentIndex]}" alt="${game.name} gameplay moment"/>`

    const updateImage = () => {
      currentIndex = (currentIndex + 1) % game.gameplay.length
      const imgElement = document.querySelector(`.gameplay-image-${index}`)
      imgElement.src = `/assets/home-page/gameplay/${game.gameplay[currentIndex]}`
    }

    setInterval(updateImage, 2000)

    return gameplayImages
  } else {
    return '<p class="mt-4"> Gameplay could not be found </p>'
  }
}
