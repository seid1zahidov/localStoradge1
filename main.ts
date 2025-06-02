const slides = document.querySelectorAll<HTMLElement>('.slide');
const prev = document.getElementById('prev') as HTMLButtonElement | null;
const next = document.getElementById('next') as HTMLButtonElement | null;

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
  if (slides.length === 0) return; 
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

if (prev && next) {
  prev.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

  next.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });
}

checkSliderExpiry();

if (!localStorage.getItem("sliderShown")) {
  setSliderData();
} else {
  console.log("Slider artıq göstərilib.");
}

showSlide(current);


const themeBtn = document.querySelector(".Change")
const body = document.body
const mode = localStorage.getItem("theme") || "white"
body.classList.add(mode)

themeBtn?.addEventListener("click" , () => {
  if(body.classList.contains("dark")){
    body.classList.replace("dark" , "white")
    localStorage.setItem("theme"  , "white")
  }else{
    body.classList.replace("white" , "dark")
    localStorage.setItem("theme" , "dark")
  }
})