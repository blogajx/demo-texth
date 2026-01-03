  const basePath = ''; // set if needed

  function initStickyHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;

    // Offset for body padding
    function setOffset() {
      const h = header.offsetHeight || 72;
      document.documentElement.style.setProperty('--header-h', h + 'px');
      document.body.classList.add('has-fixed-header');
    }
    setOffset();
    window.addEventListener('resize', setOffset);

    let lastY = window.scrollY;
    let ticking = false;

    function onScroll() {
      const y = window.scrollY;
      const goingDown = y > lastY;

      if (y > 10) header.classList.add('is-stuck');
      else header.classList.remove('is-stuck');

      if (y > 80 && goingDown) {
        header.classList.add('is-hidden'); // hide on scroll down
      } else {
        header.classList.remove('is-hidden'); // show on scroll up
      }

      lastY = y <= 0 ? 0 : y;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }
    
// // Load navbar, then init scripts
// fetch(basePath + "/navbar.html")
//   .then(r => r.text())
//   .then(html => {
//     document.getElementById("navbar-container").innerHTML = html;

//     initStickyHeader();       // sticky + scroll behavior
//     initNavbarInteractions(); // search toggle + mobile toggle + scroll-to-top
//   })
//   .catch(err => console.error("Error loading navbar:", err));

  // Search toggle
//   document.getElementById("searchIcon").addEventListener("click", function() {
//     window.location.href = "search.html"; // works everywhere
// });