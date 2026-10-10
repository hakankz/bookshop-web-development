// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('payment-form');
    const cardInput = document.getElementById('card-number');
    const monthInput = document.getElementById('exp-month');
    const yearInput = document.getElementById('exp-year');
    const cvvInput = document.getElementById('cvv');
    const messageDiv = document.getElementById('message');
  
    // Form submit event
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // prevent form from reloading the page
  
      // Step 2 will go here: validation
      // Clear old message
messageDiv.textContent = "";
messageDiv.style.display = "none";

// Get and trim values
const card = cardInput.value.trim();
const month = monthInput.value.trim();
const year = yearInput.value.trim();
const cvv = cvvInput.value.trim();

// Regular Expressions
const cardRegex = /^(5[1-5][0-9]{14})$/;
const monthRegex = /^(0?[1-9]|1[0-2])$/;
const yearRegex = /^(202[4-9])$/;
const cvvRegex = /^[0-9]{3,4}$/;

// Validate each field
if (!cardRegex.test(card)) {
    messageDiv.style.display = "block";
  messageDiv.textContent = "Invalid card number. Must be 16 digits starting with 51–55.";
  return;
}

if (!monthRegex.test(month)) {
    messageDiv.style.display = "block";
  messageDiv.textContent = "Invalid month. Must be between 1 and 12.";
  return;
}

const currentYear = new Date().getFullYear();
if (!/^\d{4}$/.test(year) || parseInt(year) < currentYear) {
    messageDiv.style.display = "block";
    messageDiv.textContent = "Invalid year. It must not be in the past.";
    return;
}


// Check for expiration (month & year not in the past)
const now = new Date();
const thisMonth = now.getMonth() + 1;
const thisYear = now.getFullYear();
const inputMonth = parseInt(month);
const inputYear = parseInt(year);

if (
  inputYear < thisYear ||
  (inputYear === thisYear && inputMonth < thisMonth)
) {
    messageDiv.style.display = "block";
  messageDiv.textContent = "Card is expired.";
  return;
}



if (!cvvRegex.test(cvv)) {
    messageDiv.style.display = "block";
  messageDiv.textContent = "Invalid CVV. Must be 3 or 4 digits.";
  return;
}

// All validations passed
// Step 3 will go here: send the POST request
// Build the JSON object
const data = {
    master_card: Number(card),
    exp_month: Number(month),
    exp_year: Number(year),
    cvv_code: cvv
  };
  
  // Send the POST request
  fetch("https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Payment failed. Please try again.");
    }
    return response.json();
  })
  .then(result => {
    // Show success and redirect
    messageDiv.style.display = "block";
    messageDiv.style.backgroundColor = "#e6ffe6";
    messageDiv.style.color = "#006400";
    messageDiv.textContent = result.message;
  
    // Save last 4 digits to localStorage
    const last4 = card.slice(-4);
    localStorage.setItem("last4", last4);
  
    // Redirect to success page after 1.5 seconds
    setTimeout(() => {
      window.location.href = "success.html";
    }, 1500);
  })
  .catch(error => {
    messageDiv.style.display = "block";
    messageDiv.style.backgroundColor = "#ffe6e6";
    messageDiv.style.color = "#b00020";
    messageDiv.textContent = error.message;
  });
  

    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");
  
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  });
  