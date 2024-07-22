import '../main.min.css'
import '../cart.scss'

function getCartItems () {
  return JSON.parse(localStorage.getItem('cart')) || []
}

function setCartItems (cartItems) {
  localStorage.setItem('cart', JSON.stringify(cartItems))
}

export function displayCartItems () {
  const cartItems = getCartItems()
  const productItemCart = document.getElementById('product-item-cart')
  const priceItemCart = document.getElementById('price-item-cart')
  const quantityItemCart = document.getElementById('quantity-item-cart')
  const subtotalItemCart = document.getElementById('subtotal-item-cart')

  if (
    !productItemCart ||
    !priceItemCart ||
    !quantityItemCart ||
    !subtotalItemCart
  ) {
    return
  }

  productItemCart
    .querySelectorAll('.game-img-title')
    .forEach((el) => el.remove())
  priceItemCart.querySelectorAll('.price').forEach((el) => el.remove())
  quantityItemCart
    .querySelectorAll('.item-count-container')
    .forEach((el) => el.remove())
  subtotalItemCart
    .querySelectorAll('.subtotal-count')
    .forEach((el) => el.remove())

  cartItems.forEach((item, index) => {
    const productElement = document.createElement('div')
    productElement.classList.add('game-img-title')
    productElement.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.name}">
      <div class="game-title">${item.name}</div>
    `
    productItemCart.appendChild(productElement)

    const priceElement = document.createElement('div')
    priceElement.classList.add('price')
    priceElement.innerText = item.price
    priceItemCart.appendChild(priceElement)

    const quantityElement = document.createElement('div')
    quantityElement.classList.add('item-count-container')
    quantityElement.innerHTML = `
      <button class="remove-item" data-index="${index}">-</button>
      <div class="quantity">${item.quantity}</div>
      <button class="add-item" data-index="${index}">+</button>
    `
    quantityItemCart.appendChild(quantityElement)

    const subtotalElement = document.createElement('div')
    subtotalElement.classList.add('subtotal-count')
    const priceNumber = parseFloat(item.price.replace(/[^0-9.-]+/g, ''))
    const subtotal = priceNumber * item.quantity
    subtotalElement.innerHTML = `
      <div class="subtotal" data-index="${index}">$${subtotal.toFixed(2)}</div>
      <button class="delete-item" data-index="${index}">X</button>
    `
    subtotalItemCart.appendChild(subtotalElement)

    const deleteButton = subtotalElement.querySelector('.delete-item')
    deleteButton.addEventListener('click', () => removeItem(index))
  })

  updateQuantityColor()
}

function displaySummaryValue () {
  const summarySubtotal = document.getElementById('summary-subtotal')
  const summaryVat = document.getElementById('summary-vat')
  const summaryTotal = document.getElementById('summary-total')
  const cartItems = getCartItems()

  let subtotal = 0

  cartItems.forEach((item) => {
    const priceNumber = parseFloat(item.price.replace(/[^0-9.-]+/g, ''))
    if (!isNaN(priceNumber)) {
      subtotal += priceNumber * item.quantity
    }
  })

  const vatRate = 0.2
  const vat = subtotal * vatRate
  const total = subtotal + vat

  summarySubtotal.innerHTML = `
    <div>Subtotal:</div>
    <div>$${subtotal.toFixed(2)}</div>
  `

  summaryVat.innerHTML = `
    <div>VAT:</div>
    <div>$${vat.toFixed(2)}</div>
  `

  summaryTotal.innerHTML = `
    <div>Order Total:</div>
    <div>$${total.toFixed(2)}</div>
  `
}

function updateQuantityColor () {
  const addItems = document.querySelectorAll('.add-item')
  const subtractItems = document.querySelectorAll('.remove-item')
  const quantities = document.querySelectorAll('.quantity')
  const updateButton = document.querySelector('.update-btn')

  if (!addItems || !subtractItems || !quantities) {
    return
  }

  addItems.forEach((addItem) => {
    addItem.addEventListener('click', () => {
      const index = addItem.dataset.index
      const cartItems = getCartItems()
      cartItems[index].quantity += 1
      setCartItems(cartItems)
      quantities[index].textContent = cartItems[index].quantity
      quantities[index].style.color = 'green'

      const priceNumber = parseFloat(
        cartItems[index].price.replace(/[^0-9.-]+/g, '')
      )
      const newSubtotal = priceNumber * cartItems[index].quantity
      const subtotalElement = document.querySelector(
        `.subtotal[data-index="${index}"]`
      )
      subtotalElement.textContent = `$${newSubtotal.toFixed(2)}`

      updateButton.removeAttribute('disabled')
      updateButton.classList.remove('text-muted')
    })
  })

  subtractItems.forEach((subtractItem) => {
    subtractItem.addEventListener('click', () => {
      const index = subtractItem.dataset.index
      const cartItems = getCartItems()
      cartItems[index].quantity = Math.max(0, cartItems[index].quantity - 1)
      setCartItems(cartItems)
      quantities[index].textContent = cartItems[index].quantity
      quantities[index].style.color = 'red'

      const priceNumber = parseFloat(
        cartItems[index].price.replace(/[^0-9.-]+/g, '')
      )
      const newSubtotal = priceNumber * cartItems[index].quantity
      const subtotalElement = document.querySelector(
        `.subtotal[data-index="${index}"]`
      )
      subtotalElement.textContent = `$${newSubtotal.toFixed(2)}`

      updateButton.removeAttribute('disabled')
      updateButton.classList.remove('text-muted')
    })
  })
}

function removeItem (index) {
  const cartItems = getCartItems()

  cartItems.splice(index, 1)

  setCartItems(cartItems)

  displayCartItems()
}

function resetAfterUpdate () {
  const updateButton = document.querySelector('.update-btn')
  const quantities = document.querySelectorAll('.quantity')

  updateButton.addEventListener('click', () => {
    quantities.forEach((quantity) => {
      if (quantity.style.color !== '#a4a4a5') {
        quantity.style.color = '#a4a4a5'
      }
    })

    updateButton.setAttribute('disabled', '')
  })
}

document.addEventListener('DOMContentLoaded', () => {
  displayCartItems()
  displaySummaryValue()
  resetAfterUpdate()

  const updateButton = document.querySelector('.update-btn')
  updateButton.addEventListener('click', () => {
    displaySummaryValue()
  })
})

export function setMockCartData () {
  const mockCartData = [
    {
      name: 'Game 1',
      price: '$19.99',
      imgSrc: '/assets/mock/game1.jpg',
      quantity: 1
    },
    {
      name: 'Game 2',
      price: '$29.99',
      imgSrc: '/assets/mock/game2.jpg',
      quantity: 2
    }
  ]
  localStorage.setItem('cart', JSON.stringify(mockCartData))
}
