import { displayCartItems, setMockCartData } from '../javaScript/cart'

document.body.innerHTML = `
  <div id="cart-item-container">
    <section id="product-item-cart">Product</section>
    <section id="price-item-cart">Price</section>
    <section id="quantity-item-cart">Quantity</section>
    <section id="subtotal-item-cart">Subtotal</section>
  </div>
`

test('displayCartItems displays items correctly', () => {
  setMockCartData()
  displayCartItems()

  const productItemCart = document.getElementById('product-item-cart')
  const priceItemCart = document.getElementById('price-item-cart')
  const quantityItemCart = document.getElementById('quantity-item-cart')
  const subtotalItemCart = document.getElementById('subtotal-item-cart')

  expect(productItemCart.children.length).toBeGreaterThan(1)
  expect(priceItemCart.children.length).toBeGreaterThan(1)
  expect(quantityItemCart.children.length).toBeGreaterThan(1)
  expect(subtotalItemCart.children.length).toBeGreaterThan(1)
})
