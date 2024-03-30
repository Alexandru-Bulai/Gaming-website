const hamburgerMenu = document.querySelector('#hamburger-menu')
const nav = document.querySelector('#nav-index')

function showElement (button, element) {
  button.addEventListener('click', () => {
    element.classList.toggle('flex')
    element.classList.toggle('hidden')
  })
}
showElement(hamburgerMenu, nav)
