
let hamb = document.querySelector('#hamb')
let popup = document.querySelector('#popup')
let mask = document.querySelector('#mask')
let times = document.querySelector('#times')

function showPopup() {
    popup.classList.toggle('popup__wrap-show')
    mask.classList.toggle('popup__mask-show')
}

hamb.addEventListener('click', showPopup)
times.addEventListener('click', showPopup)
