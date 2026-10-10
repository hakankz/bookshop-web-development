document.addEventListener("DOMContentLoaded", () => {
  const last4 = localStorage.getItem("last4");

  const messageDiv = document.getElementById("success-message");

  if (last4) {
    messageDiv.textContent = `Thank you! Your payment with card ending in ${last4} was successful.`;
  } else {
    messageDiv.textContent = "Thank you! Your payment was successful.";
  }

  // Optional: clear localStorage if you only need it once
  localStorage.removeItem("last4");
});


document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");
  
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  });
  