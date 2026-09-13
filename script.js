const menuButton = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
  menuButton.textContent = navLinks?.classList.contains('open') ? 'Close' : 'Menu';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    if (menuButton) menuButton.textContent = 'Menu';
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelectorAll('.project, .about, .contact').forEach(element => {
  element.classList.add('reveal');
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
