const form = document.getElementById("registrationForm");
const responseMessage = document.getElementById("responseMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      responseMessage.textContent = result.message;
      responseMessage.style.color = "green";
      form.reset();
    } else {
      responseMessage.textContent = result.error;
      responseMessage.style.color = "red";
    }
  } catch (err) {
    responseMessage.textContent = "An error occurred.";
    responseMessage.style.color = "red";
  }
});
