document.addEventListener("DOMContentLoaded", () => {
  const petCardsContainer = document.getElementById("pets-container");
  const backendURL = "https://petpal-backend-nza1.onrender.com";

  petCardsContainer.innerHTML = "Loading pets...";
  fetch(`${backendURL}/pets`)
    .then(res => {
      if (!res.ok) throw new Error(`Backend returned ${res.status}`);
      return res.json();
    })
    .then(pets => {
      petCardsContainer.innerHTML = "";
      pets.forEach(pet => {
        const card = document.createElement("div");
        card.className = "pet-card";
        card.innerHTML = `
          <img src="${backendURL}${pet.image}" alt="${pet.name}">
          <h3>${pet.name}</h3>
        `;
        // show details on click
        card.addEventListener("click", () => {
          const details = card.querySelectorAll('.details');
          if (details.length === 0) {
            const html = `
              <p class="details"><b>Type:</b> ${pet.type}</p>
              <p class="details"><b>Age:</b> ${pet.age}</p>
              <p class="details">${pet.description}</p>
              <button class="adopt-btn details" onclick="adoptPet(${pet.id}); event.stopPropagation();">Adopt</button>
            `;
            card.insertAdjacentHTML('beforeend', html);
          } else {
            details.forEach(d => d.remove());
          }
        });
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
  if (!user) return window.location.href = "login.html";

  const backendURL = "https://petpal-backend-nza1.onrender.com";
  fetch(`${backendURL}/adopt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pet_id: petId, user_name: user })
  })
  .then(r => r.json())
  .then(data => {
    if (data.error) alert(data.error);
    else {
      // prompt success and refresh list
      alert(data.message || "Adopted!");
      window.location.reload();
    }
  })
  .catch(e => console.error(e));
}
