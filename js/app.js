// toggling the sidebar
(function () {
    const cartInfo = document.querySelector("#cart-info")
    const cart = document.querySelector("#cart");
    cartInfo.addEventListener("click", () => {
        cart.classList.toggle("show-cart")
    })

})();

// add items to the cart 

(function () {
    const cartBtn = document.querySelectorAll(".store-item-icon");
    for (let item of cartBtn) {
        item.addEventListener("click", (e) => {
            const targetIconParent = e.target.parentElement;
            if (targetIconParent.classList.contains("store-item-icon")) {
                let fullPath = targetIconParent.previousElementSibling.src;
                let pos = fullPath.indexOf("img") + 3;
                let parPath = fullPath.slice(pos);

                // making object for passing the items from page to sidebar 
                const item = {}
                item.img = `img-cart${parPath}`
                let name = e.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
                item.name = name;
                let price = e.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
                let finalPrice = price.slice(1).trim();
                item.price = finalPrice;
                console.log(item)
                const cartItem = document.createElement("div")
                cartItem.classList.add("cart-item",
                    "d-flex",
                    "justify-content-between",
                    "my-3",
                    "text-capitalize"
                );
                cartItem.innerHTML = `
                <img src=${item.img} class="img-fluid rounded-circle" id="item-img" alt="">
                    <div class="item-text">
                        <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                        <span>$</span>
                        <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                    </div>
                    <a href="#" id='cart-item-remove' class="cart-item-remove">
                      <i class="fas fa-trash"></i>
                    </a>
                
                `;
                // select the cart 
                const getCart = document.querySelector("#cart")
                const total = document.querySelector(".cart-total-container");
                getCart.insertBefore(cartItem, total);
                alert("items added correctluy")
                showTotal();


            }
        })
    }
    function showTotal() {
        let total = []
        const getAllsideBarValue = document.querySelectorAll(".cart-item-price")
        for (let cart of getAllsideBarValue) {
            total.push(parseFloat(cart.textContent))

        }
        const totalMoney = total.reduce((total, item) => {
            total += item;
            return total
        }, 0)
        const finalMoney = totalMoney.toFixed(2);
        const getTotalDiv = document.querySelector("#cart-total")
        const getCountDiv = document.querySelector("#item-count")
        const getTotalItem = document.querySelector(".item-total")
        getTotalDiv.textContent = finalMoney;
        getTotalItem.textContent = finalMoney;
        getCountDiv.textContent = total.length;
    }
})();