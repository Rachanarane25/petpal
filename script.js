document.addEventListener("DOMContentLoaded", () => {
  const petCardsContainer = document.getElementById("pets-container");
  const backendURL = "https://petpal-backend-nza1.onrender.com";

  // Fetch all pets from the backend
  fetch(`${backendURL}/pets`)
    .then(response => response.json())
    .then(pets => {
      petCardsContainer.innerHTML = ""; // clear "Loading..." text

      pets.forEach(pet => {
        const card = document.createElement("div");
        card.className = "pet-card";

        // Each pet card
        card.innerHTML = `
          <img src="${backendURL}${pet.image}" alt="${pet.name}">
          <h3>${pet.name}</h3>
          <p><b>Type:</b> ${pet.type}</p>
          <p><b>Age:</b> ${pet.age}</p>
          <p>${pet.description}</p>
          <button class="adopt-btn" onclick="adoptPet(${pet.id})">Adopt</button>
        `;

        petCardsContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      petCardsContainer.innerHTML = "<p>Failed to load pets 😢</p>";
    });
});

// Handle pet adoption
function adoptPet(petId) {
  const user = localStorage.getItem("petpal_user");
  const backendURL = "https://petpal-backend-nza1.onrender.com";

  if (!user) {
    // Redirect to login page if not logged in
    window.location.href = "login.html";
    return;
  }

  fetch(`${backendURL}/adopt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pet_id: petId, user_name: user })
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        // Show nice confirmation
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = data.message;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add("show"), 10);
        setTimeout(() => toast.classList.remove("show"), 3000);
        setTimeout(() => toast.remove(), 3500);

        // Remove adopted pet from page
        const petCard = document.querySelector(`.adopt-btn[onclick="adoptPet(${petId})"]`).parentElement;
        petCard.remove();
      }
    })
    .catch(err => console.error(err));
}

// Add toast styling
const style = document.createElement("style");
style.innerHTML = `
.toast {
  position: fixed;
  bottom: 25px;
  right: 25px;
  background: #ff6f61;
  color: white;
  padding: 14px 22px;
  border-radius: 10px;
  font-size: 0.95rem;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.4s ease;
  z-index: 1000;
}
.toast.show {
  opacity: 1;
  transform: translateY(0);
}
`;
document.head.appendChild(style);
