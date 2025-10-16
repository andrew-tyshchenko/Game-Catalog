// Бургер-меню та додаткові ефекти
document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav ul');
  const header = document.querySelector('header');
  
  // Ефект скролу для header
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Бургер-меню
  burger.addEventListener('click', function(event) {
    event.stopPropagation();
    nav.classList.toggle('active');
    
    if (nav.classList.contains('active')) {
      burger.innerHTML = '✕';
      burger.style.color = '#667eea';
    } else {
      burger.innerHTML = '&#9776;';
      burger.style.color = '#495057';
    }
  });
  
  // Закриваємо меню при кліку на посилання
  const currentHash = window.location.hash;
  document.querySelectorAll('.nav a').forEach(link => {
    if (link.getAttribute('href') === currentHash) {
      link.classList.add('active');
    }
  });
  
  
  // Закриваємо меню при кліку поза ним
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.nav') && !event.target.closest('.burger')) {
      nav.classList.remove('active');
      burger.innerHTML = '&#9776;';
      burger.style.color = '#495057';
    }
  });
  
  // Додаємо активний клас до поточного пункту меню
  const currentPage = window.location.pathname;
  document.querySelectorAll('.nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage || 
        (currentPage === '/' && link.getAttribute('href') === '#')) {
      link.classList.add('active');
    }
  });

  // Пошук ігор
  const searchInput = document.getElementById('searchInput');
  const cards = document.querySelectorAll('.card');
if (searchInput) {
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    
    cards.forEach(card => {
      const gameTitle = card.querySelector('h2').textContent.toLowerCase();
      
      if (gameTitle.includes(searchTerm)) {
        card.style.display = 'flex'; // Зміна з 'block' на 'flex'
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
}
  
  // Анімація появи карток
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    
    observer.observe(card);
  });
});