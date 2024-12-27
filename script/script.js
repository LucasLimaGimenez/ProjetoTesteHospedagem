document.addEventListener('scroll', function() {
    const circularButton = document.getElementById('circular-button');
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 500) { // Aproximadamente no final da página
        circularButton.style.display = 'flex';
    } else {
        circularButton.style.display = 'none';
    }
});

document.getElementById('circular-button').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Rola suavemente
    });
});

let slideIndex = 0;
showSlides(slideIndex);

function currentSlide(n) {
    showSlides(slideIndex = n - 1);
}

function showSlides(n) {
    let slides = document.querySelectorAll('.slides img');
    let dots = document.querySelectorAll('.dot');
    
    if (n >= slides.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

/*
// Navegação automática (opcional)
setInterval(() => {
    showSlides(slideIndex += 1);
}, 5000); // Muda a cada 5 segundos

*/

let totalPrice = 0;

function showForm(product) {
    // Fechar qualquer formulário aberto
    closeForm();

    // Recuperar os dados do produto
    const price = product.getAttribute('data-price');
    const productName = product.querySelector('.product-title').textContent;

    // Criar o formulário
    const formHtml = `
        <div id="product-form" style="display:block;">
            <h3>Adicionar ${productName}</h3>
            <form id="addProductForm" onsubmit="addToCart(event, this)">
                <label for="quantity">Quantidade:</label>
                <input type="number" id="quantity" name="quantity" min="1" value="1" required>
                <input type="hidden" id="product-price" name="price" value="${price}">
                <button type="submit">Adicionar ao Carrinho</button>
                <button type="button" onclick="closeForm()">Cancelar</button>
            </form>
        </div>
    `;

    // Inserir o formulário logo após o produto clicado
    product.insertAdjacentHTML('afterend', formHtml);
}

function addToCart(event, form) {
    event.preventDefault();

    const quantity = parseInt(form.querySelector('#quantity').value, 10);
    const price = parseFloat(form.querySelector('#product-price').value);

    const itemTotal = quantity * price;
    totalPrice += itemTotal;

    // Atualizar o total no carrinho
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);

    console.log(`Produto adicionado: Quantidade: ${quantity}, Total do Item: ${itemTotal.toFixed(2)}`);

    // Fechar o formulário
    closeForm();
}

function closeForm() {
    const form = document.getElementById('product-form');
    if (form) {
        form.remove();
    }
}