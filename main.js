// JavaScript for automatic slideshow
let slideIndex = 0;
let timeout;

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    clearTimeout(timeout); // Clear any previous timeout
    timeout = setTimeout(showSlides, 5000); // Change slide every 5 seconds
}

showSlides();

// JavaScript for random slide click
let slideshow = document.querySelector('.slideshow-container');

slideshow.addEventListener('click', function () {
    let slides = document.getElementsByClassName("mySlides");
    let currentIndex = slideIndex - 1;
    let randomIndex = currentIndex;

    while (randomIndex === currentIndex) {
        randomIndex = Math.floor(Math.random() * slides.length);
    }

    slideIndex = randomIndex + 1;
    showSlides();
});
