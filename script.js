// ==========================
// CARRINHO GLOBAL
// ==========================

let cart =
JSON.parse(localStorage.getItem("cart"))
|| [];

// ==========================
// SALVAR CARRINHO
// ==========================

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

// ==========================
// ADICIONAR AO CARRINHO
// ==========================

function addToCart(name,price,image){

    const existingItem =
    cart.find(item => item.name === name);

    if(existingItem){

        existingItem.quantity++;

    }else{

        cart.push({

            name:name,
            price:price,
            image:image,
            quantity:1

        });

    }

    saveCart();

    renderCart();

    updateCartCount();

    showToast(name);

}

// ==========================
// REMOVER ITEM
// ==========================

function removeItem(index){

    cart.splice(index,1);

    saveCart();

    renderCart();

    updateCartCount();

}

// ==========================
// CONTADOR
// ==========================

function updateCartCount(){

    const cartCount =
    document.querySelector(".cart-count");

    if(!cartCount) return;

    let totalItems = 0;

    cart.forEach(item=>{

        totalItems += item.quantity;

    });

    cartCount.innerText =
    totalItems;

}

// ==========================
// RENDERIZAR
// ==========================

function renderCart(){

    const containers =
    document.querySelectorAll(".cart-items");

    const subtotalElement =
    document.querySelector(".cart-total");

    const shippingElement =
    document.getElementById("shippingPrice");

    const finalTotal =
    document.getElementById("finalTotal");

    if(!containers.length) return;

    // LIMPAR

    containers.forEach(container=>{

        container.innerHTML = "";

    });

    // TOTAL

    let total = 0;

    // PRODUTOS

    cart.forEach((item,index)=>{

        total += item.price * item.quantity;

        const productHTML = `

        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-info">

                <h3>${item.name}</h3>

                <p>
                    Quantidade: ${item.quantity}
                </p>

                <span>
                    R$ ${(item.price * item.quantity).toFixed(2)}
                </span>

            </div>

            <button onclick="removeItem(${index})">

                ✕

            </button>

        </div>

        `;

        containers.forEach(container=>{

            container.innerHTML += productHTML;

        });

    });

    // SUBTOTAL

    if(subtotalElement){

        subtotalElement.innerText =
        "R$ " + total.toFixed(2);

    }

    // FRETE

    let shipping = 40;

    if(total >= 3000){

        shipping = 0;

    }

    if(shippingElement){

        shippingElement.innerText =
        shipping === 0
        ? "Grátis"
        : "R$ " + shipping.toFixed(2);

    }

    // TOTAL FINAL

    if(finalTotal){

        finalTotal.innerText =
        "R$ " + (total + shipping).toFixed(2);

    }

}

// ==========================
// ABRIR CARRINHO
// ==========================

function openCart(){

    const sideCart =
    document.getElementById("sideCart");

    const overlay =
    document.getElementById("cartOverlay");

    if(sideCart){

        sideCart.classList.add("active");

    }

    if(overlay){

        overlay.classList.add("active");

    }

}

// ==========================
// FECHAR CARRINHO
// ==========================

function closeCart(){

    const sideCart =
    document.getElementById("sideCart");

    const overlay =
    document.getElementById("cartOverlay");

    if(sideCart){

        sideCart.classList.remove("active");

    }

    if(overlay){

        overlay.classList.remove("active");

    }

}

// ==========================
// TOAST
// ==========================

function showToast(productName){

    const toast =
    document.getElementById("toast");

    const toastText =
    document.getElementById("toastText");

    if(!toast || !toastText) return;

    toastText.innerText =
    productName + " adicionado ao carrinho";

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}

// ==========================
// FRETE
// ==========================

function calculateShipping(){

    const cep =
    document.getElementById("cep");

    const shippingElement =
    document.getElementById("shippingPrice");

    const finalTotal =
    document.getElementById("finalTotal");

    if(!cep || !shippingElement) return;

    let shipping = 40;

    if(cep.value.startsWith("69")){

        shipping = 20;

    }

    // TOTAL

    let subtotal = 0;

    cart.forEach(item=>{

        subtotal += item.price * item.quantity;

    });

    shippingElement.innerText =
    "R$ " + shipping.toFixed(2);

    if(finalTotal){

        finalTotal.innerText =
        "R$ " + (subtotal + shipping).toFixed(2);

    }

}

// ==========================
// PAGAMENTO
// ==========================

const paymentForm =
document.getElementById("payment-form");

if(paymentForm){

    paymentForm.addEventListener(
        "submit",
        (e)=>{

            e.preventDefault();

            localStorage.removeItem("cart");

            window.location.href =
            "success.html";

        }
    );

}

// ==========================
// OVERLAY
// ==========================

const overlay =
document.getElementById("cartOverlay");

if(overlay){

    overlay.addEventListener(
        "click",
        closeCart
    );

}

// ==========================
// INICIAR
// ==========================

renderCart();

updateCartCount();
// ==========================
// MÉTODOS PAGAMENTO
// ==========================

function selectPayment(method){

    const cardMethod =
    document.getElementById("cardMethod");

    const pixMethod =
    document.getElementById("pixMethod");

    const cardPayment =
    document.getElementById("cardPayment");

    const pixArea =
    document.getElementById("pixArea");

    if(method === "pix"){

        pixMethod.classList.add("active");

        cardMethod.classList.remove("active");

        pixArea.style.display = "block";

        cardPayment.style.display = "none";

    }

    if(method === "card"){

        cardMethod.classList.add("active");

        pixMethod.classList.remove("active");

        pixArea.style.display = "none";

        cardPayment.style.display = "block";

    }

}

// ==========================
// COPIAR PIX
// ==========================

function copyPix(){

    const pixCode =
    `00020126580014BR.GOV.BCB.PIX0136elixir.perfumes@email.com5204000053039865802BR5920ELIXIR PERFUMARIA6009SAO PAULO62070503***6304ABCD`;

    navigator.clipboard.writeText(
        pixCode
    );

    // TOAST

    const toast =
    document.getElementById(
        "pixToast"
    );

    if(toast){

        toast.classList.add(
            "show"
        );

        setTimeout(()=>{

            toast.classList.remove(
                "show"
            );

        },2600);

    }

}

// ==========================
// CONFIRMAR PIX
// ==========================

function confirmPixPayment(){

    const status =
    document.getElementById("pixStatus");

    if(!status) return;

    // LOADING

    status.innerHTML =
    "Verificando pagamento...";

    // SIMULAÇÃO

    setTimeout(()=>{

        status.innerHTML =
        "Pagamento confirmado com sucesso ✓";

        status.style.color =
        "rgb(46,125,90)";

        // LIMPAR CARRINHO

        localStorage.removeItem("cart");

        // REDIRECIONAR

        setTimeout(()=>{

            window.location.href =
            "success.html";

        },2000);

    },2500);

}
let discount = 0;
// ==========================
// CUPOM
// ==========================

function applyCoupon(){

    const input =
    document.getElementById("couponInput");

    const message =
    document.getElementById("couponMessage");

    if(!input || !message) return;

    const coupon =
    input.value.toUpperCase();

    // CUPONS

    if(coupon === "ELIXIR10"){

        discount = 0.10;

        message.innerHTML =
        "Cupom ELIXIR10 aplicado ✓";

        message.style.color =
        "rgb(46,125,90)";

    }

    else if(coupon === "NOIR15"){

        discount = 0.15;

        message.innerHTML =
        "Cupom NOIR15 aplicado ✓";

        message.style.color =
        "rgb(46,125,90)";

    }

    else if(coupon === "FIRST20"){

        discount = 0.20;

        message.innerHTML =
        "Cupom FIRST20 aplicado ✓";

        message.style.color =
        "rgb(46,125,90)";

    }

    else{

        discount = 0;

        message.innerHTML =
        "Cupom inválido";

        message.style.color =
        "rgb(170,70,70)";

    }

    renderCart();

    // DESCONTO

const discountValue =
total * discount;

const finalPrice =
(total - discountValue) + shipping;

if(finalTotal){

    finalTotal.innerText =
    "R$ " + finalPrice.toFixed(2);

}

}
// ==========================
// TRANSIÇÕES CINEMATOGRÁFICAS
// ==========================

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        const links =
        document.querySelectorAll("a");

        links.forEach(link=>{

            const href =
            link.getAttribute("href");

            // IGNORAR LINKS EXTERNOS

            if(
                href &&
                !href.startsWith("#") &&
                !href.startsWith("javascript")
            ){

                link.addEventListener(
                    "click",
                    function(e){

                        e.preventDefault();

                        // TRANSIÇÃO

                        document.body.classList.add(
                            "page-transition"
                        );

                        // REDIRECIONAR

                        setTimeout(()=>{

                            window.location.href =
                            href;

                        },600);

                    }
                );

            }

        });

    }
);