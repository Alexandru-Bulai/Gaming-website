// Variable to store the current page count
export let pageCount = 0

// Function to move through the menu pages
export function moveMenu (add, sub) {
  // Increment pageCount if add is true
  if (add) {
    pageCount += 1
  }
  // Decrement pageCount if sub is true
  if (sub) {
    pageCount -= 1
  }
  // Ensure pageCount doesn't go below 0
  if (pageCount <= 0) {
    pageCount = 0
  }
  // Throw an error if both add and sub are true
  if (add && sub) {
    throw new Error('Please select only one option at a time')
  }
}

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  // Selecting DOM elements
  const nextBtn = document.querySelector('#highlight-foreward')
  const prevBtn = document.querySelector('#highlight-backward')
  const mainHighlightContainer = document.querySelector('#mainHighlight')

  // Function to update visibility of highlight containers
  function updateVisibility () {
    const highlightVisibility = document.querySelectorAll(
      '.highlight-container'
    )

    // Loop through highlight containers and display only the one matching the pageCount
    highlightVisibility.forEach((div, index) => {
      div.style.display = index === pageCount ? 'block' : 'none'
    })
  }

  // Function to update page count and visibility
  function updatePage () {
    const highlightContainer = document.querySelectorAll('.highlight-container')
    const totalDivs = highlightContainer.length

    // Reset pageCount if it goes out of bounds
    if (pageCount > totalDivs - 1 || pageCount <= 0) {
      pageCount = 0
    }
    // Update visibility based on updated pageCount
    updateVisibility()
  }

  // Event listener for next button click
  nextBtn.addEventListener('click', () => {
    // Move menu forward and update page
    moveMenu(true, false)
    updatePage()
  })

  // Event listener for previous button click
  prevBtn.addEventListener('click', () => {
    // Move menu backward and update page
    moveMenu(false, true)
    updatePage()
  })

  // Selecting games container and JSON path
  const gamesContainer = document.querySelector('#grid-games')
  const gamesPath = 'src/javaScript/games.json'

  // Fetching games data from JSON
  fetch(gamesPath)
    .then((response) => {
      // Throw error if network response is not OK
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      // Parse JSON response
      return response.json()
    })
    .then((data) => {
      // Extract games detail from response
      const allGames = data.payload.gamesDetail
      // Populate games container with fetched data
      populateGamesContainer(allGames, gamesContainer)
      // Populate main highlight container with fetched data
      populateGamesHighlights(allGames, mainHighlightContainer)
    })
})

// Function to populate games container with game data
function populateGamesContainer (payload, gamesContainer) {
  payload.forEach((game) => {
    // Insert HTML for each game into games container
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

// Function to populate main highlight container with game data
function populateGamesHighlights (payload, mainHighlightContainer) {
  payload.forEach((game, index) => {
    // Get gameplay images for the game
    const gameplayImages = getImage(game, index)
    // Insert HTML for each game into main highlight container
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

// Function to get gameplay images for a game
function getImage (game, index) {
  let currentIndex = 0

  if (Array.isArray(game.gameplay) && game.gameplay.length > 0) {
    // HTML for the first gameplay image
    const gameplayImages = `<img class="w-full h-full gameplay-image-${index}" src="/assets/home-page/gameplay/${game.gameplay[currentIndex]}" alt="${game.name} gameplay moment"/>`

    // Function to update gameplay image at intervals
    const updateImage = () => {
      currentIndex = (currentIndex + 1) % game.gameplay.length
      const imgElement = document.querySelector(`.gameplay-image-${index}`)
      imgElement.src = `/assets/home-page/gameplay/${game.gameplay[currentIndex]}`
    }

    // Set interval to update gameplay image every 2 seconds
    setInterval(updateImage, 2000)

    return gameplayImages
  } else {
    // Return message if gameplay images are not available
    return '<p class="mt-4"> Gameplay could not be found </p>'
  }
}
