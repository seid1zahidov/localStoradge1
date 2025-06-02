const slides = document.querySelectorAll<HTMLElement>('.slide');
const prev = document.getElementById('prev') as HTMLButtonElement;
const next = document.getElementById('next') as HTMLButtonElement;

let current: number = 0;
const now: number = new Date().getTime();
const threeDays: number = 3 * 24 * 60 * 60 * 1000;

function setSliderData(): void {
  localStorage.setItem("sliderShown", "yes");
  localStorage.setItem("sliderExpiry", (now + threeDays).toString());
}

function checkSliderExpiry(): void {
  const expiry = localStorage.getItem("sliderExpiry");
  if (!expiry || new Date().getTime() > Number(expiry)) {
    localStorage.removeItem("sliderShown");
    localStorage.removeItem("sliderExpiry");
    console.log("Slider müddəti bitib, məlumat silindi.");
  }
}

function showSlide(index: number): void {
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

if (!localStorage.getItem("sliderShown")) {
  setSliderData();
} else {
  console.log("Slider artıq göstərilib.");
}

showSlide(current);
