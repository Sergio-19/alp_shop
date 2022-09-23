// при загрузке страницы получаем корзину из localStorage, получаем массив из артикулов товаров и отправляем на сервер, на сервере дулаем выборку по артикулам, и на клиент приходит массив объектов товаров, циклом выводим значения в шаблон, а количество товаров забираем из cartPage

let cartPage = {}
let goodsBlock = document.querySelector('.cart__blocks-good') //Блок в котором находятся
let goodCol = document.querySelector('#cart__order-amount') // span в котором количество товаров в корзине в шт.
let goodSum = document.querySelector('#cart__order-sum')   // вывод суммы цен всех товаров в корзине
let cartResult = document.querySelector('#cart__order-result') // вывод итоговой суммы, товары + доставка
let cartDelivery = document.querySelector('#cart__order-delivery') // вывод суммы доставки
let cartTitle = document.querySelector('#cart__block-title') // заголовок корзины

let loadCartInfo = false //флаг, который обозначает загрузились ли данные с сервера

//получение содержимого корзины из localeStorage при загрузке страницы корзины
function getStorageToCartPage(cart) {
    Object.keys(localStorage).forEach((el)=> {
        cart[el] = Number(localStorage[el])
    })
   return cart
}

//функция для подсчёта количества товаров в корзине 
function goodAmount(obj) {
    let amount = 0
    Object.keys(obj).forEach((el)=> {
        amount += obj[el]
    })
    return amount
}


//функция получения информации о товарах в корзине с сервера

async function getToCartInfo() {
    
    try {
        const response = await axios.post('/info/cart', Object.keys(getStorageToCartPage(cartPage)))
            if(response.data.success) {
                loadCartInfo = true
                let sum = 0
                let cart = response.data.cart
                cart.forEach((good)=> {
                    goodsBlock.insertAdjacentHTML('beforeend', `<div class="cart__blocks-good-item">
                    <div class="cart__blocks-good-item-info">
                        <div class="cart__blocks-good-item-info-image">
                            <img src= '${good.images}' alt= '${good.name}'/>
                        </div>
                        <div class="cart__blocks-good-item-info-text">
                            <p>${good.name}</p>
                            <span>Артикул: ${good.article}</span>
                         </div>
                    </div>
                    <div class="cart__blocks-good-item-amount">
                        <button data-good_id = ${good.article} class = 'j-minus'>-</button>
                        <div class="cart__blocks-good-item-amount-delete">
                            <strong>${cartPage[good.article]}</strong>
                            <span data-good_id = ${good.article} class = "j-delete">Удалить</span>
                        </div>
                        <button data-good_id = ${good.article} class = 'j-plus'>+</i></button>
                    </div>
                    <div class="cart__blocks-good-item-price">
                        <strong>${good.price} ₽</strong>
                        <span>${good.oldprice} ₽</span>
                    </div>
                </div`)
                    sum += good.price * cartPage[good.article]
                })
                cartResult.innerHTML = `${sum + 598} ₽`
                cartDelivery.innerHTML = `598 ₽`
                goodSum.innerHTML = `${sum} ₽`
                goodCol.innerHTML = `Товары: ${goodAmount(cartPage)} шт.`

                document.querySelectorAll('.j-plus').forEach((el)=> {
                    el.addEventListener('click', (e)=> cartPlus(e, cart))
                })
                document.querySelectorAll('.j-minus').forEach((el)=> {
                    el.addEventListener('click', (e)=> cartMinus(e, cart))
                })
                document.querySelectorAll('.j-delete').forEach((el)=> {
                    el.addEventListener('click', (e)=> cartDelete(e))
                })
                
            } 
            if(!response.data.success) {
                cartTitle.innerHTML = "Корзина пуста"
            }

    } catch (e) {
        console.log(e)
    }
  
}
    getToCartInfo()  

//функция добавления в localeStorage содержимого корзины

function addLocaleStorage(cart) {
    Object.keys(cart).forEach((el)=> {
       localStorage[el] = cart[el]
    })   

}    

//функция увеличения количества товара в корзине
    function cartPlus(e, cart) {
        let sum = 0
        let goodId = e.target.dataset.good_id
        cartPage[goodId]++
        e.target.parentElement.querySelector('strong').innerHTML = cartPage[goodId]
        let cartHeader = document.querySelector('.header__cart-round') // кружок в который выводится количество товаров в коризине в header
        let cartNav = document.querySelector('.popup__controls-btn-cart-round') // кружок в который выводится количество товаров в коризине в меню
        cartHeader.style.display = 'block'
        cartHeader.innerHTML = goodAmount(cartPage)
        cartNav.style.display = 'block'
        cartNav.innerHTML = goodAmount(cartPage)

        cart.forEach((good)=> {
            sum += good.price * cartPage[good.article]
        })

        cartResult.innerHTML = `${sum + 598} ₽`
        cartDelivery.innerHTML = `598 ₽`
        goodSum.innerHTML = `${sum} ₽`
        goodCol.innerHTML = `Товары: ${goodAmount(cartPage)} шт.`
        addLocaleStorage(cartPage)
    }

//функция уменьшения товара в корзине   

    function cartMinus(e, cart) {
        let sum = 0
        let goodId = e.target.dataset.good_id
        if(cartPage[goodId] > 1){
            cartPage[goodId]--
        } else {
            cartPage[goodId] = 1 
        }
        e.target.parentElement.querySelector('strong').innerHTML = cartPage[goodId]
        let cartHeader = document.querySelector('.header__cart-round') // кружок в который выводится количество товаров в коризине в header
        let cartNav = document.querySelector('.popup__controls-btn-cart-round') // кружок в который выводится количество товаров в коризине в меню
        cartHeader.style.display = 'block'
        cartHeader.innerHTML = goodAmount(cartPage)
        cartNav.style.display = 'block'
        cartNav.innerHTML = goodAmount(cartPage)

        cart.forEach((good)=> {
            sum += (good.price * cartPage[good.article])
        })

        cartResult.innerHTML = `${sum + 598} ₽`
        goodSum.innerHTML = `${sum} ₽`
        goodCol.innerHTML = `Товары: ${goodAmount(cartPage)} шт.`
        addLocaleStorage(cartPage)
    }

//функция удаления товара из корзины
    function cartDelete(e) {
        let goodId = e.target.dataset.good_id
        console.log(cartPage)
        delete cartPage[goodId]
        localStorage.removeItem(goodId)
        location.reload()
       
        // addLocaleStorage(cartPage)
    

    }    