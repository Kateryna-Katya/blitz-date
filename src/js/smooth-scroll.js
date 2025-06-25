document.addEventListener('DOMContentLoaded', () => {
    function getHeaderOffset() {
      const header = document.getElementById('site-header');
      return header ? header.offsetHeight : 0;
    }
  
    function smoothScrollToElement(targetId) {
      const target = document.getElementById(targetId);
      if (!target) return;
  
      const offset = getHeaderOffset();
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
  
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  
    const isIndexPage = location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname === '/index';
  
    if (isIndexPage) {
      document.querySelectorAll('a[href*="#"]').forEach(link => {
        link.addEventListener('click', e => {
          const href = link.getAttribute('href');
          const targetId = href.split('#')[1];
  
          if (
            href.startsWith('#') ||
            href.startsWith('index.html#') ||
            href.startsWith('/index.html#')
          ) {
            e.preventDefault();
            smoothScrollToElement(targetId);
          }
        });
      });
  
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1);
        const scrollWhenReady = () => {
          const target = document.getElementById(targetId);
          if (target) {
            smoothScrollToElement(targetId);
          } else {
            requestAnimationFrame(scrollWhenReady);
          }
        };
  
        setTimeout(scrollWhenReady, 100);
      }
    }
  });