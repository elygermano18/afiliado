document.addEventListener('DOMContentLoaded', function() {
    const carrossel = document.querySelector('.conteiner-noticias');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const dots = document.querySelectorAll('.nav-dot');
    
    if (carrossel && prevButton && nextButton) {
        const cards = document.querySelectorAll('.card-noticias');
        const cardWidth = cards[0].offsetWidth;
        const gap = 25; // Espaço entre cards
        const scrollAmount = cardWidth + gap;
        
        // Atualiza estado dos botões e dots
        function updateControls() {
            const maxScroll = carrossel.scrollWidth - carrossel.clientWidth;
            
            // Botões
            prevButton.disabled = carrossel.scrollLeft <= 10;
            nextButton.disabled = carrossel.scrollLeft >= maxScroll - 10;
            
            // Dots
            const activeIndex = Math.round(carrossel.scrollLeft / scrollAmount);
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        }
        
        // Navegação
        prevButton.addEventListener('click', () => {
            carrossel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        
        nextButton.addEventListener('click', () => {
            carrossel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        
        // Navegação por dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                carrossel.scrollTo({
                    left: index * scrollAmount,
                    behavior: 'smooth'
                });
            });
        });
        
        // Atualiza controles ao scrollar
        carrossel.addEventListener('scroll', updateControls);
        
        // Atualiza ao redimensionar
        window.addEventListener('resize', updateControls);
        
        // Inicializa
        updateControls();
    }
});