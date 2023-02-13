let menuBurgas = [
  {
    "id": 0,
    "nombre": "La 1",
    "precio": 1000,
    "img": "imagenes/b1.jpg"
  },
  {
    "id": 1,
    "nombre": "La 2",
    "precio": 1200,
    "img": "imagenes/b2.jpg"
  },
  {
    "id": 2,
    "nombre": "La 3",
    "precio": 1400,
    "img": "imagenes/b3.jpg"
  },
  {
    "id": 3,
    "nombre": "La 4",
    "precio": 1600,
    "img": "imagenes/231513.webp"
  },
  {
    "id": 4,
    "nombre": "La 5",
    "precio": 1800,
    "img": "imagenes/como-hacer-hamburguesa-de-pollo-crispy.png"
  },
  {
    "id": 5,
    "nombre": "La 6",
    "precio": 2000,
    "img": "imagenes/Hamburguesa-de-pollo-casera.png"
  },
  {
    "id": 6,
    "nombre": "La 7",
    "precio": 2200,
    "img": "imagenes/6234944679b08_mostaza180322.png"
  }
]

let carrito = []
let unidades = ""
let totalFinal = ""
let carritoJSON = ""
let contenedor = document.getElementById("contenedor")
let modal = document.getElementById("miModal")
let cartNav = document.getElementById("cart-nav")
let total = document.getElementById("total")
let carritoRender = document.getElementById("cart-row")
let botonCarrito = document.getElementById("cart-button")
let contenedorCarritoTotal = document.getElementById("contenedorCarritoTotal")

botonCarrito.addEventListener("click", mostrar)
renderizar(menuBurgas)

comprobar(carrito)

function comprobar() {
  if (localStorage.getItem("Carrito")) {
    carrito = JSON.parse(localStorage.getItem("Carrito"))
    renderizarCarrito(carrito)
    totalRender(carrito)
  } else {
    totalRenderVacio(carrito)
  }
}

let lonely = document.getElementById("Lonely")
let distraction = document.getElementById("Distraction")
let people = document.getElementById("People")
let inside = document.getElementById("Inside")

let inicio = document.getElementById("Inicio")
let logo = document.getElementById("Logo")

inicio.addEventListener("click", renderizarTodo)
logo.addEventListener("click", renderizarTodo)

lonely.addEventListener("click", filtro)
distraction.addEventListener("click", filtro)
people.addEventListener("click", filtro)
inside.addEventListener("click", filtro)

function filtro(e) {
  e.preventDefault()
  console.log(e.target.id)
  let categoriaFiltrado = menuBurgas.filter(
    (cuadro) => cuadro.categoria == e.target.id
  )
  renderizar(categoriaFiltrado)
}

function renderizarTodo(e) {
  e.preventDefault()
  renderizar(menuBurgas)
}

function renderizar(array) {
  contenedor.innerHTML = ""
  for (const cuadro of array) {
    let tarjetaBody = document.createElement("div")

    tarjetaBody.className = "tarjeta-body"
    tarjetaBody.innerHTML = `
          <div class="card">
              <div class="card-img">
                  <img src="${cuadro.img}" alt="Card image cap">
              </div>
              <h5 class="card-title">${cuadro.nombre}</h5>
              <div class="cardBody">
                <h6 class= "precio"><strong>Precio: $ ${cuadro.precio.toFixed(2)}</strong></h6>
                <button id="${cuadro.id}"  class="btn btn-secondary me-md-2">Añadir</button>
              </div>
          </div>
          `

    contenedor.append(tarjetaBody)
  }

  let comprar = document.getElementsByClassName("btn btn-secondary me-md-2")

  for (boton of comprar) {
    boton.addEventListener("click", addCarrito)
  }
}

function renderizarCarrito(array) {
  carritoRender.innerHTML = ""
  for (let cuadro of array) {
    let cart = document.createElement("div")
    cart.className = "cart-render"
    cart.innerHTML = `
          <div class="cart-row">
              <div  style="flex:1"><img class="row-image" src="${cuadro.img
      }"></div>
              <div  style="flex:2"><p class="cart-p">${cuadro.nombre}</p></div>
              <div  style="flex:1"><p class="cart-p">$${cuadro.precio.toFixed(2)}</p></div>`
    carritoRender.append(cart)
  }
}

function addCarrito(e) {
  let productoBuscado = menuBurgas.find((cuadro) => cuadro.id == e.target.id)

  let indexCuadro = carrito.findIndex(
    (cuadro) => cuadro.id == productoBuscado.id
  )

  if (indexCuadro != -1) {
    carrito[indexCuadro].unidades++

    carrito[indexCuadro].subtotal =
      carrito[indexCuadro].precio * carrito[indexCuadro].unidades

    carritoJSON = JSON.stringify(carrito)

    localStorage.setItem("Carrito", carritoJSON)
  } else {
    carrito.push({
      id: productoBuscado.id,
      nombre: productoBuscado.nombre,
      categoria: productoBuscado.categoria,
      precio: productoBuscado.precio,
      img: productoBuscado.img,
      unidades: 1,
      subtotal: productoBuscado.precio,
    })

    carritoJSON = JSON.stringify(carrito)
    localStorage.setItem("Carrito", carritoJSON)
  }
  renderizarCarrito(carrito)
  totalRender(carrito)
  toast("Añadido", { background: "Green", })
}

function removeItem(e) {
  let productoBuscado = menuBurgas.find((cuadro) => cuadro.id == e.target.id)
  let indexCuadro = carrito.findIndex(
    (cuadro) => cuadro.id == productoBuscado.id
  )

  if (indexCuadro != -1) {
    if (carrito[indexCuadro].unidades >= 2) {
      carrito[indexCuadro].unidades--
      carrito[indexCuadro].subtotal =
        carrito[indexCuadro].subtotal - carrito[indexCuadro].precio
      carritoJSON = JSON.stringify(carrito)
      localStorage.setItem("Carrito", carritoJSON)
    } else {
      carrito.splice(indexCuadro, 1)
      carritoJSON = JSON.stringify(carrito)
      localStorage.setItem("Carrito", carritoJSON)
    }
  }
  totalFinal = carrito.reduce((a, b) => a + b.subtotal, 0)
  unidades = carrito.reduce((a, b) => a + b.unidades, 0)
  renderizarCarrito(carrito)
  totalRender(carrito)
  totoast("Removed item", { background: "Red" })
}

function totalRender(array) {
  totalFinal = carrito.reduce((a, b) => a + b.subtotal, 0)
  unidades = carrito.reduce((a, b) => a + b.unidades, 0)
  total.innerHTML = ""
  let totalResumen = document.createElement("div")
  totalResumen.className = "total"
  totalResumen.innerHTML = `
      <span class="close">&times</span> 
      <h5 class="totalh5">Burgas:<strong>${unidades}</strong></h5>
      <h5 class="totalh5">Total:<strong> $ ${totalFinal.toFixed(2)}</strong></h5>
      <button id="clear"style="float:right margin:10px" type="button" class="btn btn-outline-success">Pagar Burgas</button>`
  total.append(totalResumen)

  let span = document.getElementsByClassName("close")[0]
  span.onclick = function () {
    modal.style.display = "none"
  }

  cartNav.innerHTML = ""
  if (array.lenght != 0) {
    let parrafo = document.createElement("div")
    parrafo.className = "cart-total"
    parrafo.innerHTML = `<p>${unidades}</p>`
    cartNav.append(parrafo)
  } else {
    let parrafo = document.createElement("div")
    parrafo.className = "cart-total"
    parrafo.innerHTML = `<p>0</p>`
    cartNav.append(parrafo)
  }

  let clear = document.getElementById("clear")
  clear.addEventListener("click", borrarStor)
}

function totalRenderVacio(array) {
  total.innerHTML = ""
  let totalResumen = document.createElement("div")
  totalResumen.className = "total"
  totalResumen.innerHTML = `
          <span class="close">&times</span> 
          <h5 class="totalh5">Burgas: <strong> 0 </strong></h5>
          <h5 class="totalh5">Total:<strong> $ 0.00 </strong></h5>
          `
  total.append(totalResumen)
  cartNav.innerHTML = ""
  let parrafo = document.createElement("div")
  parrafo.className = "cart-total"
  parrafo.innerHTML = `<p>0</p>`
  cartNav.append(parrafo)

  let span = document.getElementsByClassName("close")[0]
  span.onclick = function () {
    modal.style.display = "none"
  }
}

function mostrar(e) {
  modal.style.display = "block"
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none"
  }
}

function borrarStor() {
  localStorage.removeItem("Carrito")
  contenedorCarritoTotal.className = "modal-content"
  modal.style.display = "none"

  carrito = []
  totalRenderVacio(carrito)
  renderizarCarrito(carrito)
  renderizar(menuBurgas)
  comprobar(carrito)
  Swal.fire({
    title: "¡Gracias por la compra!",
    icon: "success",
    confirmButtonText: "Que tengas un buen día",
    iconColor: "green",
  })
}

function toast(text, style) {
  Toastify({
    text: text,
    style: style,
    duration: 3000,
  }).showToast()
}
