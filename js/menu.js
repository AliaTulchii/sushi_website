//------------------COUNTER----------------//


window.addEventListener('click', (e) => {
    let counter

    if (e.target.dataset.action === 'plus' || e.target.dataset.action === 'minus') {
        const counterWrapper = e.target.closest('.counter-wrapper')
        counter = counterWrapper.querySelector('[data-counter]')
    }
    

    if (e.target.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText

        if (e.target.closest('.cart-wrapper') ) {
            calcCartPriceAndDelivery()
        }
    } 


    if (e.target.dataset.action === 'minus') {    


        if (parseInt(counter.innerText) > 1) {
            counter.innerText = --counter.innerText
        } else if (e.target.closest('.cart-wrapper') && parseInt(counter.innerText) === 1) {
            e.target.closest('.cart-item').remove()

            toggleCartStatus()
            calcCartPriceAndDelivery()
        }

        if (e.target.closest('.cart-wrapper') ) {
            calcCartPriceAndDelivery()
        }

    }


})


//--------------------ADDING TO CART------------------//

const cartWrapper = document.querySelector('.cart-wrapper')

window.addEventListener('click', (e) => { 
    if (e.target.hasAttribute('data-cart')) {
        const card = e.target.closest('.card')


        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.menu__product-img').getAttribute('src'),
            title: card.querySelector('.menu__product-title').innerText,
            itemsInBox: card.querySelector('[data-items-in-box]').innerText,
            weight: card.querySelector('.price__weight').innerText,
            price: card.querySelector('.price__currency').innerText,
            counter: card.querySelector('[data-counter]').innerText,
        }

        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

        if (itemInCart) {
            const counterElement = itemInCart.querySelector('[data-counter]');
            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter)
        } else {
            const cartItemHTML = `
            <div class="cart-item" data-id="${productInfo.id}">
            <div class="cart-item__top">
                <div class="cart-item__img">
                    <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
                </div>
                <div class="cart-item__desc">
                    <div class="cart-item__title">${productInfo.title}</div>
                    <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>

                    
                    <div class="cart-item__details">

                        <div class="menu__cart-items counter-wrapper">
                            <div class="cart-item__control first" data-action="minus">-</div>
                            <div class="cart-item__current" data-counter="">${productInfo.counter}</div>
                            <div class="cart-item__control second" data-action="plus">+</div>
                        </div>

                        <div class="price">
                            <div class="price__currency">${productInfo.price}</div>
                        </div>

                    </div>
                    

                </div>
            </div>
        </div>
        `
            cartWrapper.insertAdjacentHTML('beforeend',  cartItemHTML)
        }


        card.querySelector('[data-counter]').innerText = '1'

        toggleCartStatus();

        calcCartPriceAndDelivery();
    }
})

//--------------------TOGGLE CART STATUS------------------//

function toggleCartStatus() {
    const cartEmptyBadge = document.querySelector('[data-cart-empty')
    const orderForm = document.querySelector('#order-form')



    if (cartWrapper.children.length > 0) {
        cartEmptyBadge.classList.add('none')
        orderForm.classList.remove('none')
    } else {
        cartEmptyBadge.classList.remove('none')
        orderForm.classList.add('none')
    }
}


//--------------------CALCULATE CART PRICE------------------//
function calcCartPriceAndDelivery() {
    const cartWrapper = document.querySelector('.cart-wrapper')
    const priceEl = cartWrapper.querySelectorAll('.price__currency')
    const priceTotalEl = document.querySelector('.total-price')
    const deliveryCost = document.querySelector('.delivery-cost')
    const deliveryCart = document.querySelector('[data-cart-delivery]')
    


    let totalPrice = 0

    priceEl.forEach(function (item) {
        const amountEl = item.closest('.cart-item').querySelector('[data-counter]')
        
        totalPrice += parseInt(item.innerText) * parseInt(amountEl.innerText)
    })
        
    priceTotalEl.innerText = totalPrice 
    
    if (totalPrice > 0) {
        deliveryCart.classList.remove('none')
    } else {
        deliveryCart.classList.add('none')
    }

    if (totalPrice >= 50) {
        deliveryCost.classList.add('.free');
        deliveryCost.innerText = 'Free delivery'
    } else {
        deliveryCost.classList.remove('.free');
        deliveryCost.innerText = '3$'
    }
}