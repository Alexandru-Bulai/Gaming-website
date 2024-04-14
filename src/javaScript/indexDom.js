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
  const gamesContainer = document.querySelector('#grid-games')
  const gamesPath = 'src/javaScript/games.json'
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

  const searchInput = document.querySelector('#search-input')

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase()
    filterAndDisplayGames(searchTerm)
  })

  function filterAndDisplayGames (input) {
    let visibleGamesCount = 0
    const gridContainer = document.querySelectorAll('.grid-container')

    gridContainer.forEach((game) => {
      const name = game.getAttribute('data-name').toLowerCase()
      console.log(gridContainer)

      if (game.getAttribute('data-name').toLowerCase() === name) {
        if (name.includes(input)) {
          game.style.display = 'block'
          visibleGamesCount++
        } else {
          game.style.display = 'none'
        }
      }
    })

    const noResultsElement = document.querySelector('#no-results')
    noResultsElement.style.display = visibleGamesCount === 0 ? 'flex' : 'none'
  }

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
      addCountCart()
    })
})

function populateGamesContainer (payload, gamesContainer) {
  payload.forEach((game) => {
    gamesContainer.insertAdjacentHTML(
      'beforeend',
      ` 
    <div
      class="game-container grid-container group relative h-96 w-72 items-center hover:bg-[#304F69] hover:bg-opacity-90 sm:h-80 sm:w-56 md:h-64 md:w-52"
      data-name= "${game.name.toLowerCase()}"
    >
      <img
        class="game-container-cover h-full max-h-[80%] w-full " data-img
        src="/assets/home-page/game-cover/${game.cover}"
        alt="${game.name} cover"
      />

      <div class="game-container-stats">
        <button class="add-to-cart game-container-dark-style  transition-all duration-300 hover:scale-105 hover:ring-opacity-100 w-64 sm:w-52 md:w-48">
          Add to cart
        </button>

        <div class="game-container-dark-style" data-price >Price: $${game.price}</div>
      </div>

      <div
        class="absolute bottom-0 flex h-1/5 w-full items-center justify-center bg-[#131B26] text-center font-extrabold text-white" data-name>
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
      `
      <div class="highlight-container game-container group">
          <img class="highlight-img" data-img src="/assets/home-page/highlights/${game.highlight}" alt="${game.name} cover"/>

        <div class="hidden h-3/5 justify-between group-hover:flex">
            <div class="gameplay-image flex flex-1 justify-center m-3">
                ${gameplayImages}
            </div>
        </div>

        <p class="hidden h-1/5 text-center group-hover:block" data-name>${game.name}</p>

        <div class="flex justify-between">
            <button class="add-to-cart dark-button mx-5 hidden size-10 items-center justify-center rounded-full ring-2 group-hover:flex">🛒</button>
            <div class="dark-button mx-5 hidden size-10 w-24 items-center justify-center rounded-full ring-2 group-hover:flex" data-price>
                Price: $${game.price}
            </div>
        </div> 
      </div>
        `
    )

    const highlightContainer = mainHighlightContainer.lastElementChild

    const imgElement = highlightContainer.querySelector('.gameplay-image img')
    const startImageUpdate = () => {
      imgElement.src = `/assets/home-page/gameplay/${game.gameplay[0]}`
      intervalId = setInterval(updateImage, 2000)
    }

    const stopImageUpdate = () => {
      clearInterval(intervalId)
    }

    highlightContainer.addEventListener('mouseenter', startImageUpdate)
    highlightContainer.addEventListener('mouseleave', stopImageUpdate)

    let currentIndex = 0
    let intervalId

    const updateImage = () => {
      currentIndex = (currentIndex + 1) % game.gameplay.length
      imgElement.src = `/assets/home-page/gameplay/${game.gameplay[currentIndex]}`
    }
  })
}

function getImage (game, index) {
  if (Array.isArray(game.gameplay) && game.gameplay.length > 0) {
    return `<img class="w-full h-full gameplay-image-${index}" src="/assets/home-page/gameplay/${game.gameplay[0]}" alt="${game.name} gameplay moment"/>`
  } else {
    return '<p class="mt-4"> Gameplay could not be found </p>'
  }
}

function updateCartCount (cartCountElement, count) {
  if (cartCountElement) {
    cartCountElement.innerText = count
  }
}

export function addGameToCart (cartContainer, title, price, imgSrc) {
  if (!cartContainer) return false

  const gameCartElement = document.createElement('div')
  gameCartElement.classList.add('game-item')

  gameCartElement.innerHTML = `
  <div class="flex items-center gap-5 p-4"> 
    <img src="${imgSrc}" alt="Game cover" class="h-20 w-20 rounded-full"> 
    <span><strong>${title}</stong></span>
    <span>${price}</span>
    </div>
  `

  cartContainer.append(gameCartElement)
  return true
}

function addCountCart () {
  let count = 0
  const cartButtons = document.querySelectorAll('.add-to-cart')
  const cartContainer = document.querySelector('#game-items-container')
  const cartCountElement = document.querySelector('#cart-count')

  cartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const gameContainer = button.closest('.game-container')
      if (!gameContainer) {
        return
      }

      const title = gameContainer.querySelector('[data-name]')?.innerText
      const price = gameContainer.querySelector('[data-price]')?.innerText
      const imgSrc = gameContainer.querySelector('[data-img]')?.src

      if (title && price && imgSrc) {
        const added = addGameToCart(cartContainer, title, price, imgSrc)
        if (added) {
          count++
          updateCartCount(cartCountElement, count)
        }
      }
    })
  })
}
