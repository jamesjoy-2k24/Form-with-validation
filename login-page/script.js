// Handles form submission and client-side validation
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const email = formData.get("email").trim();
  const password = formData.get("password").trim();

  if (!email || !email.includes("@") || !email.includes(".")) {
    alert("Please provide a valid email address.");
    return;
  }

  if (password.length < 8) {
    alert("Please provide a password with at least 8 characters.");
    return;
  }

  // Send form data to the server if you have a server endpoint for login
  const request = new Request("/api/login", {
    method: "POST",
    body: formData,
  });

  fetch(request)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then((data) => {
      // Handle successful login
      console.log(data);
      alert("Login successful!");
    })
    .catch((error) => {
      console.error(error);
      if (error.status === 401) {
        alert("Invalid email or password.");
      } else {
        alert("An error occurred during the login process. Please try again.");
      }
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('form[action="/login"]');
  form.addEventListener("submit", handleSubmit);
});
