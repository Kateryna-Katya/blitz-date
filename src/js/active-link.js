const links = document.querySelectorAll('.navigation-item');

links.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    links.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});