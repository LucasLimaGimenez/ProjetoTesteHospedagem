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
    const price = product.getAttribute('data-price');
    document.getElementById('product-price').value = price;
    document.getElementById('product-form').style.display = 'block';
}

function addToCart(event) {
    event.preventDefault();
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('product-price').value;
    
    const itemTotal = quantity * price;
    totalPrice += itemTotal;
    
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    
    // Resetar o formulário e escondê-lo
    document.getElementById('addProductForm').reset();
    document.getElementById('product-form').style.display = 'none';
}
