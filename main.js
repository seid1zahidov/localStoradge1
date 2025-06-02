const slides = document.querySelectorAll('.slide');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let current = 0;
const now = new Date().getTime();
const threeDays = 3 * 24 * 60 * 60 * 1000;
function setSliderData() {
  localStorage.setItem("sliderShown", "yes");
  localStorage.setItem("sliderExpiry", (now + threeDays).toString());
}
function checkSliderExpiry() {
  const expiry = localStorage.getItem("sliderExpiry");
  if (!expiry || new Date().getTime() > Number(expiry)) {
    localStorage.removeItem("sliderShown");
    localStorage.removeItem("sliderExpiry");
    console.log("Slider müddəti bitib, məlumat silindi.");
  }
}
function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

prev.addEventListener('click', () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
});
next.addEventListener('click', () => {
  current = (current + 1) % slides.length;
  showSlide(current);
});
checkSliderExpiry(); 

!localStorage.getItem("sliderShown") ? setSliderData(): console.log(" ") 
showSlide(current);

