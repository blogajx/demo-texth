document.addEventListener("DOMContentLoaded", function () {
  const basePath = window.location.origin;

  // --- Load Preloader ---
  // Wait for the entire page (images, styles, scripts) to load
  window.addEventListener('load', function() {
      const preloader = document.getElementById('pre-load-animation');
      
      // Add the class that fades it out
      preloader.classList.add('hidden-loader');
      
      // Remove "loading" class from body to allow scrolling
      document.body.classList.remove('loading');
  });

  // --- Load Other Layout Components ---
  // fetch(basePath + "/navbar.html")
  //   .then(r => r.text())
  //   .then(data => document.getElementById("navbar-container").innerHTML = data)
  //   .catch(error => console.error("Navbar load error:", error));

  // fetch(basePath + "/page-navbar.html")
  //   .then(r => r.text())
  //   .then(data => document.getElementById("navbar-container-page").innerHTML = data)
  //   .catch(error => console.error("Page Navbar load error:", error));

  // fetch(basePath + "/related-post.html")
  //   .then(r => r.text())
  //   .then(data => document.getElementById("relatedpost-container-page").innerHTML = data)
  //   .catch(error => console.error("Related post load error:", error));

  // fetch(basePath + "/sponsored.html")
  //   .then(r => r.text())
  //   .then(data => document.getElementById("sponsored-container").innerHTML = data)
  //   .catch(error => console.error("Sponsored load error:", error));

  // fetch(basePath + "/socialandauthor.html")
  //   .then(r => r.text())
  //   .then(data => document.getElementById("socialandauthor").innerHTML = data)
  //   .catch(error => console.error("Social & Author load error:", error));

  // fetch(basePath + "/sidebar.html")
  //   .then(r => r.text())
  //   .then(data => document.getElementById("sidebar-container-page").innerHTML = data)
  //   .catch(error => console.error("Sidebar load error:", error));

  // fetch(basePath + "/sidebar-top.html")
  //   .then(r => r.text())
  //   .then(data => document.getElementById("sidebar-container-page-head").innerHTML = data)
  //   .catch(error => console.error("Sidebar Top load error:", error));

  fetch(basePath + "/footer.html")
    .then(r => r.text())
    .then(data => document.getElementById("footer-container").innerHTML = data)
    .catch(error => console.error("Footer load error:", error));
});
