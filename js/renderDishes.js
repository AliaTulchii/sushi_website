const productsDishesContainer = document.querySelector("#products-dishes-container");

getProducts();
async function getProducts() {
  const response = await fetch("./js/productsDishes.json");
  console.log(response);

  const productsArray = await response.json();
  console.log(productsArray);

  renderProducts(productsArray);
}



function renderProducts(productsArray) {
    productsArray.forEach((item) => {
    const productHTML = `
                            <div class="menu__card">
                                <div class="card " data-id="${item.id}">
                                    <img class="menu__product-img" src="${item.imgSrc}" alt="${item.title}">
                                    <div class="card-body menu__product-body">
                                        <h4 class="menu__product-title">${item.title}</h4>
                                        <p><small data-items-in-box class="menu__product-description">${item.itemsInBox}</small></p>
        
                                        <div class="details-wrapper">
                                            <div class="menu__product-items counter-wrapper">
                                                <div class="items__control first" data-action="minus">-</div>
                                                <div class="items__current" data-counter>1</div>
                                                <div class="items__control second" data-action="plus">+</div>
                                            </div>
        
                                            <div class="price">
                                                <div class="price__weight">${item.weight}</div>
                                                <div class="price__currency">${item.price}</div>
                                            </div>
                                        </div>
        
                                        <button data-cart type="button" class="menu__product-button">
                                        add to cart
                                        <i class="ri-shopping-bag-line bag"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
        `;
      
        productsDishesContainer.insertAdjacentHTML('beforeend', productHTML)
  });
}
