document.addEventListener("DOMContentLoaded", () => {
  const petCardsContainer = document.getElementById("pets-container");

  fetch("http://127.0.0.1:5000/pets")
    .then(response => response.json())
    .then(pets => {
      petCardsContainer.innerHTML = "";
      pets.forEach(pet => {
        const card = document.createElement("div");
        card.className = "pet-card";

        card.innerHTML = `
          <img src="http://127.0.0.1:5000${pet.image}" alt="${pet.name}">
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
