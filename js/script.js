const themeSlug = "ieee-sb-cek"; // Optional theme slug

function clearForm(formId) {
  document.getElementById(formId).reset();
}

window.addEventListener("message", (event) => {
  if (event?.data?.zoom) {
    const mains = document.querySelectorAll('main');
    for (const main of mains) {
      main.style.zoom = event?.data?.zoom;
    }
  }
}, false);

document.addEventListener('DOMContentLoaded', () => {
  // Wait for images and other resources to load before applying zoom
  window.addEventListener('load', () => {
    // Check if content width exceeds viewport width before hiding overflow
    const contentWidth = document.documentElement.scrollWidth;
    const viewportWidth = window.innerWidth;

    if (contentWidth > viewportWidth) {
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflowX = "auto"; // Allow horizontal scrolling if needed
    }

    function applyZoom() {
      const vpTags = document.querySelectorAll('.yotako-main');

      for (const vp of vpTags) {
        if (vp.offsetParent) {
          const zoomClass = vp.classList.value.match(/size_(\d+)/)?.[1];
          if (zoomClass) {
            const closest = parseFloat(zoomClass);
            vp.parentElement.style.setProperty('zoom', window.innerWidth / closest, 'important');

            // Consider using min-width instead of resetting margins and padding
            vp.parentElement.style.minWidth = `${window.innerWidth}px`; // Ensure parent fills viewport width
          }
        }
      }
    }

    window.onresize = applyZoom;

    applyZoom(); // Call applyZoom after resources are loaded
  });
});
