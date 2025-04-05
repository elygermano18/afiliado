document.addEventListener('DOMContentLoaded', function() {
    // Selecionar elementos do DOM
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const hasSubmenuItems = document.querySelectorAll('.has-submenu');
    
    // Criar overlay para mobile
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    document.body.appendChild(mobileOverlay);

    // Função para abrir/fechar o menu principal
    const toggleMenu = (forceClose = false) => {
        if (forceClose) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
            closeAllSubmenus();
            return;
        }

        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        
        if (!navLinks.classList.contains('active')) {
            closeAllSubmenus();
        }
    };

    // Função para fechar todos os submenus
    const closeAllSubmenus = () => {
        hasSubmenuItems.forEach(item => {
            item.classList.remove('active');
            const submenu = item.querySelector('.submenu');
            if (submenu) {
                submenu.style.display = 'none';
            }
        });
    };

    // Evento de clique no ícone hamburger
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Fechar menu ao clicar no overlay
    mobileOverlay.addEventListener('click', () => toggleMenu(true));

    // Fechar menu ao clicar em links normais (não submenu)
    document.querySelectorAll('.nav-links > li > a:not(.has-submenu > a)').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 868) {
                toggleMenu(true);
            }
        });
    });

    // Controle de submenus em mobile
    hasSubmenuItems.forEach(item => {
        const link = item.querySelector('a');
        const submenu = item.querySelector('.submenu');
        
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 868) {
                e.preventDefault();
                e.stopPropagation();
                
                // Verifica se o submenu já está aberto
                const isActive = item.classList.contains('active');
                
                // Fecha todos os submenus primeiro
                closeAllSubmenus();
                
                // Se não estava ativo, abre o submenu clicado
                if (!isActive) {
                    item.classList.add('active');
                    submenu.style.display = 'block';
                    
                    // Rolagem suave para o submenu
                    setTimeout(() => {
                        submenu.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 50);
                }
            }
        });
    });

    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 868) {
            toggleMenu(true);
        }
    });

    // Impedir que clicks dentro do menu fechem o menu
    navLinks.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Fechar menu ao pressionar Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu(true);
        }
    });
});