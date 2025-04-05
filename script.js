document.addEventListener('DOMContentLoaded', function() {
    // Carrossel Principal
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const slides = document.querySelectorAll('.slide');
        const dotsContainer = document.querySelector('.carousel-dots');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        let currentIndex = 0;
        let autoplayInterval;
        
        function createDots() {
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            document.querySelector('.carousel-slides').style.transform = `translateX(-${index * 100}%)`;
        }
        
        function goToSlide(index) {
            currentIndex = (index + slides.length) % slides.length;
            showSlide(currentIndex);
            resetAutoplay();
        }
        
        function prevSlide() {
            goToSlide(currentIndex - 1);
        }
        
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }
        
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 5000);
        }
        
        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }
        
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        createDots();
        startAutoplay();
        showSlide(currentIndex);
    }
    
    // Carrossel de Notícias
    const noticiasCarrossel = document.getElementById('noticiasCarrossel');
    if (noticiasCarrossel) {
        const dots = document.querySelectorAll('.nav-dot');
        const cards = document.querySelectorAll('.card-noticias');
        const playPauseBtn = document.getElementById('autoPlayPause');
        let autoPlayInterval;
        let currentIndex = 0;
        let isPlaying = true;
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextCard, 6000);
            isPlaying = true;
            playPauseBtn.textContent = 'Pausar';
        }
        
        function pauseAutoPlay() {
            clearInterval(autoPlayInterval);
            isPlaying = false;
            playPauseBtn.textContent = 'Reproduzir';
        }
        
        function nextCard() {
            currentIndex = (currentIndex + 1) % cards.length;
            scrollToCard(currentIndex);
        }
        
        function scrollToCard(index) {
            const cardWidth = cards[0].offsetWidth + 25;
            noticiasCarrossel.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
            updateDots(index);
            currentIndex = index;
        }
        
        function updateDots(activeIndex) {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        }
        
        noticiasCarrossel.addEventListener('scroll', function() {
            const scrollPosition = noticiasCarrossel.scrollLeft;
            const cardWidth = cards[0].offsetWidth + 25;
            const newIndex = Math.round(scrollPosition / cardWidth);
            
            if (newIndex !== currentIndex) {
                updateDots(newIndex);
                currentIndex = newIndex;
            }
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                scrollToCard(index);
                if (!isPlaying) return;
                clearInterval(autoPlayInterval);
                startAutoPlay();
            });
        });
        
        playPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                pauseAutoPlay();
            } else {
                startAutoPlay();
            }
        });
        
        if (window.innerWidth > 768) {
            noticiasCarrossel.addEventListener('mouseenter', pauseAutoPlay);
            noticiasCarrossel.addEventListener('mouseleave', () => {
                if (!isPlaying) return;
                startAutoPlay();
            });
        }
        
        startAutoPlay();
    }
});
