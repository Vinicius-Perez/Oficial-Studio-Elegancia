document.addEventListener('DOMContentLoaded', function() {
  // Menu Mobile corrigido
  const btnMobile = document.getElementById('btn-mobile');
  const menu = document.getElementById('menu');
  
  function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();
    menu.classList.toggle('active');
    const isActive = menu.classList.contains('active');
    btnMobile.setAttribute('aria-expanded', isActive);
    
    if (isActive) {
      btnMobile.setAttribute('aria-label', 'Fechar Menu');
    } else {
      btnMobile.setAttribute('aria-label', 'Abrir Menu');
    }
  }
  
  btnMobile.addEventListener('click', toggleMenu);
  btnMobile.addEventListener('touchstart', toggleMenu);
  
  // Fechar menu ao clicar em um item
  document.querySelectorAll('#menu a').forEach(item => {
    item.addEventListener('click', () => {
      menu.classList.remove('active');
      btnMobile.setAttribute('aria-expanded', 'false');
      btnMobile.setAttribute('aria-label', 'Abrir Menu');
    });
  });

  // Carrossel do Hero
  function initHeroCarrossel() {
    const carrossel = document.querySelector('.hero-carrossel .carrossel');
    const items = document.querySelectorAll('.hero-carrossel .carrossel-item');
    
    let currentIndex = 0;
    const totalItems = items.length;
    let interval;
    
    function slideTo(index) {
      currentIndex = (index + totalItems) % totalItems;
      carrossel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    function slideNext() {
      slideTo(currentIndex + 1);
    }
    
    function startAutoPlay() {
      interval = setInterval(slideNext, 5000);
    }
    
    function stopAutoPlay() {
      clearInterval(interval);
    }
    
    startAutoPlay();
    
    // Pausar auto-play quando interagir
    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', stopAutoPlay);
    hero.addEventListener('mouseleave', startAutoPlay);
    hero.addEventListener('touchstart', stopAutoPlay);
  }
  
  initHeroCarrossel();

  // Scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });
  
  // Formulário de contato
  const formContato = document.getElementById('form-contato');
  const toast = document.getElementById('toast');
  
  if (formContato) {
    formContato.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simular envio (substituir por código real de envio)
      showToast('Mensagem enviada com sucesso! Em breve entraremos em contato.');
      formContato.reset();
    });
  }
  
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
  
  // Animação ao rolar a página
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.card, .galeria-item, .parceiro, .sobre-texto');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Configurar elementos para animação
  document.querySelectorAll('.card, .galeria-item, .parceiro, .sobre-texto').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Executar uma vez ao carregar a página
});