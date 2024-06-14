import '../main.min.css'
import '../cart.scss'

function getCartItems () {
  return JSON.parse(localStorage.getItem('cart')) || []
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

  cartItems.forEach((item) => {
    const productElement = document.createElement('div')
    productElement.classList.add('game-img-title')
    productElement.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.name}" class="h-20 w-20 rounded-full">
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
      <button class="remove-item">-</button>
      <div class="quantity">${item.quantity}</div>
      <button class="add-item">+</button>
    `
    quantityItemCart.appendChild(quantityElement)

    const subtotalElement = document.createElement('div')
    subtotalElement.classList.add('subtotal-count')
    const priceNumber = parseFloat(item.price.replace(/[^0-9.-]+/g, ''))
    const subtotal = priceNumber * item.quantity
    subtotalElement.innerHTML = `
      <div class="subtotal">$${subtotal.toFixed(2)}</div>
      <div class="delete-item">X</div>
    `
    subtotalItemCart.appendChild(subtotalElement)
  })
}

function displaySummaryValue () {
  const summarySubtotal = document.getElementById('summary-subtotal')
  const summaryVat = document.getElementById('summary-vat')
  const summaryTotal = document.getElementById('summary-total')
  const cartItemSubtotals = document.querySelectorAll('.subtotal')

  let subtotal = 0

  cartItemSubtotals.forEach((priceElement) => {
    const price = parseFloat(priceElement.textContent.replace(/[^0-9.-]+/g, ''))
    if (!isNaN(price)) {
      subtotal += price
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

document.addEventListener('DOMContentLoaded', () => {
  displayCartItems()
  displaySummaryValue()
})
