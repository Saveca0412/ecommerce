"use strict"
const items = [
    {
      id: 1,
      name: 'Hoodies',
      price: 14.00,
      image: 'https://academlo-store.netlify.app/assets/img/featured1.png',
      category: 'hoodies',
      quantity: 10
    },
    {
      id: 2,
      name: 'Shirts',
      price: 24.00,
      image: 'https://academlo-store.netlify.app/assets/img/featured2.png',
      category: 'shirts',
      quantity: 15
    },
    {
      id: 3,
      name: 'Sweatshirts',
      price: 24.00,
      image: 'https://academlo-store.netlify.app/assets/img/featured3.png',
      category: 'sweatshirts',
      quantity: 20
    },
    {
      id: 4,
      name: 'Sweatshirts',
      price: 30.00,
      image: 'https://academlo-store.netlify.app/assets/img/featured3.png',
      category: 'sweatshirts',
      quantity: 10
    }
]
let cartIcon = document.querySelector("#open-cart")
let cartOverlay = document.querySelector(".shopping-cart-overlay")
let cartClose = document.getElementById("cart-close")
let listProducts = document.querySelector(".product__list")
let cartContainer = document.querySelector(".carro__container")
let cartCount = document.querySelector("#cart-count")
let addButton = document.querySelector(".add-button")
let moon = document.querySelector("#moon")
let sun = document.querySelector("#sun")
let cart = []

document.addEventListener("DOMContentLoaded", () =>{
    mostrarProductos()
    const storedCart = window.sessionStorage.getItem('cart')
    if (storedCart) {
      cart = JSON.parse(storedCart)
    }
    mostrarProductosCart()
})
cartIcon.addEventListener( "click", () =>{
    cartOverlay.classList.add("open-cart")
})
cartClose.addEventListener( "click", () =>{
    cartOverlay.classList.remove("open-cart")
})
moon.addEventListener( "click", () =>{
  document.body.classList.add("dark-mode")
})
sun.addEventListener( "click", () =>{
  document.body.classList.remove("dark-mode")
})
/*darkMode.addEventListener( "click", () =>{
  darkMode.classList.remove("dark-mode")
})*/
/* nav en el scroll */
let header = document.querySelector("header")
window.addEventListener( "scroll", () =>{
    if( window.scrollY > 60 ){
        header.classList.add("scroll-header")
    }else{
        header.classList.remove("scroll-header")
    }
})
function mostrarProductos() {
    let fragmentHTML = ""
    items.forEach( (product) =>{
        fragmentHTML += `
        <div class="product-card">
            <div class="product-image-container">
                <img src=${product.image} alt="" class="product-img">
            </div>
            <p>$${product.price}</p>
            <button data-id="${product.id}" class="product-button">
                <i class='bx bx-plus-circle bx-md'></i>
            </button>
        </div>
        `
    })
    listProducts.innerHTML = fragmentHTML
    let productsButton = document.querySelectorAll(".product-button")
    productsButton.forEach( (button) =>{
        button.addEventListener("click", () =>{
            let id = parseInt( button.getAttribute("data-id") )
            let product = items.find( item =>{
                return item.id === id
            })
            agregarProducto(product)
            // cart.push( product )
            //console.log((cart))
        })
    })
}
/*
[
    {
        id: 2,
        quantitySelected: 1,
    },
]
*/

function agregarProducto(producto) {
    let resultadoFind = cart.find(item => item.id === producto.id)
      
    if(resultadoFind) {
        cart.forEach(item => {
          if(item === resultadoFind) item.quantity += 1
        })
    } else {
      const cartProduct = {
        ...producto,
        quantity: 1,
      } 
      cart.push(cartProduct)
    }
    window.sessionStorage.setItem('cart', JSON.stringify(cart))
    mostrarProductosCart()
    console.log(cart)
}
function mostrarProductosCart(){
    let suma = 0
    let cantidadTotal = 0
    const cartHTMLElements = cart.map(item => {
        return `
        <div class="cart-item">
            <img src=${item.image} alt="">
            <p>${item.name}</p>
            <small>Cantidad: ${item.quantity}</small>
        </div>
        `
        // let totalProducto = item.quantitySelected * item.price
        // suma += totalProducto
    })
    const fragmentHTML = cartHTMLElements.join('')
    cartContainer.innerHTML = fragmentHTML
    cartCount.innerHTML = getBagItems(cart)
  }

  function getBagItems(cart) {
    return cart.reduce((acc, item) => {
      return acc + item.quantity
    }, 0)
  }


