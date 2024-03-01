let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides-container');
const totalSlides = slides.length;
let carouselInterval;

// Функция для перехода к конкретному слайду
function goToSlide(slideIndex) {
  // Обновляем положение контейнера слайдов
  slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
  // Удаляем класс 'active' у всех слайдов
  slides.forEach(slide => slide.classList.remove('active'));
  // Добавляем класс 'active' к текущему слайду
  slides[slideIndex].classList.add('active');
  // Обновляем индекс текущего слайда
  currentSlide = slideIndex;
}

// Функция для переключения на следующий слайд
function nextSlide() {
  let nextIndex = (currentSlide + 1) % totalSlides;
  goToSlide(nextIndex);
}

// Инициализация автоматической прокрутки
carouselInterval = setInterval(nextSlide, 2000);

// Функции для обработки свайпов
function handleSwipe() {
  let touchStartX = 0;
  let touchEndX = 0;

  slidesContainer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, false);

  slidesContainer.addEventListener('touchmove', e => {
    // Предотвращаем стандартное поведение прокрутки
    e.preventDefault();
  }, { passive: false });

  slidesContainer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].clientX;
    if (touchEndX < touchStartX) {
      nextSlide();
    }
    // Если нужен свайп в обе стороны, добавьте функцию prevSlide и раскомментируйте следующий код:
    // else if (touchEndX > touchStartX) {
    //   prevSlide();
    // }
  }, false);
}

handleSwipe();

// Функция для переключения на предыдущий слайд (если нужна поддержка свайпа в обе стороны)
function prevSlide() {
  let prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
  goToSlide(prevIndex);
}

// Инициализируем слайдер с первого слайда
goToSlide(currentSlide);
