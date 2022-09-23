
let cart = {}

let alert = document.querySelector('#my__alert') //алерт при добавлении в корзину

let cartHeader = document.querySelector('.header__cart-round') // кружок в который выводится количество товаров в коризине в header
let cartNav = document.querySelector('.popup__controls-btn-cart-round') // кружок в который выводится количество товаров в коризине в меню

document.querySelectorAll('.add-to-cart').forEach((el)=> {
   el.onclick = addCart
})


//функция показа алерта
function showAlert() {
    alert.classList.add('my__alert-show')
    setTimeout(()=> {
        alert.classList.remove('my__alert-show')
    }, 1500)
}



//получение содержимого корзины из localeStorage при загрузке страницы и обновление отображения количества товаров в header и в меню
function getStorage() {
    Object.keys(localStorage).forEach((el)=> {
        cart[el] = Number(localStorage[el])
    })
    cartHeader.style.display = 'block'
    cartHeader.innerHTML = goodAmount(cart)
    cartNav.style.display = 'block'
    cartNav.innerHTML = goodAmount(cart)
}

getStorage()

//Функция добавления товара в корзину при клике на кнопку "Добавить в корзину"

function addCart() {
    let goodId = this.dataset.good_id
    if(cart[goodId]) {
        cart[goodId]++
    } else {
        cart[goodId] = 1
    }
    
    cartHeader.style.display = 'block'
    cartHeader.innerHTML = goodAmount(cart)
    cartNav.style.display = 'block'
    cartNav.innerHTML = goodAmount(cart)
    showAlert()
    addLocaleStorage(cart)
}

//функция для подсчета колическтва товаров в корзине
function goodAmount(obj) {
    let amount = 0
    Object.keys(obj).forEach((el)=> {
        amount += obj[el]
    })
    return amount
}

//функция добавления в localeStorage содержимого корзины

function addLocaleStorage(cart) {
     Object.keys(cart).forEach((el)=> {
        localStorage[el] = cart[el]
     })   

}
                              