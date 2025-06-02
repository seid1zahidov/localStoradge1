var slides = document.querySelectorAll('.slide');
var prev = document.getElementById('prev');
var next = document.getElementById('next');
var current = 0;
var now = new Date().getTime();
var threeDays = 3 * 24 * 60 * 60 * 1000;
function setSliderData() {
    localStorage.setItem("sliderShown", "yes");
    localStorage.setItem("sliderExpiry", (now + threeDays).toString());
}
function checkSliderExpiry() {
    var expiry = localStorage.getItem("sliderExpiry");
    if (!expiry || new Date().getTime() > Number(expiry)) {
        localStorage.removeItem("sliderShown");
        localStorage.removeItem("sliderExpiry");
        console.log("Slider müddəti bitib, məlumat silindi.");
    }
}
function showSlide(index) {
    slides.forEach(function (slide) { return slide.classList.remove('active'); });
    slides[index].classList.add('active');
}
prev.addEventListener('click', function () {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
});
next.addEventListener('click', function () {
    current = (current + 1) % slides.length;
    showSlide(current);
});
checkSliderExpiry();
if (!localStorage.getItem("sliderShown")) {
    setSliderData();
}
else {
    console.log("Slider artıq göstərilib.");
}
showSlide(current);
