document.addEventListener("DOMContentLoaded", () => {
  const petCardsContainer = document.getElementById("pets-container");
  const backendURL = "https://petpal-backend-nza1.onrender.com";

  // Fetch pets from your deployed Flask backend
  fetch(`${backendURL}/pets`)
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch pets");
      return response.json();
    })
    .then(pets => {
      petCardsContainer.innerHTML = "";

      pets.forEach(pet => {
        const card = document.createElement("div");
        card.className = "pet-card";

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
      petCardsContainer.innerHTML = "<p>⚠️ Failed to load pets.</p>";
    });
});

function adoptPet(petId) {
  const user = localStorage.getItem("petpal_user");

  if (!user) {
    // Redirect to login if user not logged in
    window.location.href = "login.html";
    return;
  }

  const backendURL = "https://petpal-backend-nza1.onrender.com";

  fetch(`${backendURL}/adopt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pet_id: petId, user_name: user })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      // Refresh pet list after adoption
      window.location.reload();
    })
    .catch(err => console.error("Error:", err));
}
