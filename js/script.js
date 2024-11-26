// Optional theme slug
const themeSlug = "ieee-sb-cek";

function clearForm(formId) {
  document.getElementById(formId).reset();
}

// Event listener for handling custom zoom level via postMessage
window.addEventListener("message", (event) => {
  if (event?.data?.zoom) {
    const mains = document.querySelectorAll("main");
    for (const main of mains) {
      main.style.transform = `scale(${event.data.zoom})`;
      main.style.transformOrigin = "0 0";
    }
  }
}, false);

document.addEventListener("DOMContentLoaded", () => {
  // Ensure the page layout adapts to the viewport size
  const applyResponsiveLayout = () => {
    const contentWidth = document.documentElement.scrollWidth;
    const viewportWidth = window.innerWidth;

    if (contentWidth > viewportWidth) {
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflowX = "auto";
    }
  };

  // Attach the resize handler
  window.addEventListener("resize", applyResponsiveLayout);

  // Call the function on page load to ensure proper layout
  applyResponsiveLayout();

  // Fix any zoom-based issues dynamically
  const adjustZoom = () => {
    const vpTags = document.querySelectorAll(".yotako-main");
    for (const vp of vpTags) {
      if (vp.offsetParent) {
        const zoomClass = vp.classList.value.match(/size_(\d+)/)?.[1];
        if (zoomClass) {
          const closest = parseFloat(zoomClass);
          vp.parentElement.style.setProperty("transform", `scale(${window.innerWidth / closest})`, "important");
          vp.parentElement.style.transformOrigin = "0 0";
          vp.parentElement.style.minWidth = `${window.innerWidth}px`;
        }
      }
    }
  };

  // Apply zoom adjustments on page load and resize
  window.addEventListener("load", adjustZoom);
  window.addEventListener("resize", adjustZoom);

  // Initial adjustments
  adjustZoom();
});
