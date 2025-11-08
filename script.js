document.addEventListener("DOMContentLoaded", () => {
  const petCardsContainer = document.getElementById("pets-container");
  const backendURL = "https://petpal-backend-nza1.onrender.com"; // 🌐 LIVE BACKEND URL

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

        // Show pet details on click
        card.addEventListener("click", () => {
          const details = card.querySelectorAll(".details");
          if (details.length === 0) {
            const html = `
              <p class="details"><b>Type:</b> ${pet.type}</p>
              <p class="details"><b>Age:</b> ${pet.age}</p>
              <p class="details">${pet.description}</p>
              <button class="adopt-btn details" onclick="adoptPet(${pet.id}); event.stopPropagation();">Adopt</button>
            `;
            card.insertAdjacentHTML("beforeend", html);
          } else {
            details.forEach(d => d.remove());
          }
        });

        petCardsContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Error loading pets:", err);
      petCardsContainer.innerHTML = "<p>⚠️ Failed to load pets. Please try again.</p>";
    });
});

function adoptPet(petId) {
  const backendURL = "https://petpal-backend-nza1.onrender.com";
  const user = localStorage.getItem("petpal_user");

  if (!user) {
    showToast("Please login to adopt a pet 🐾");
    setTimeout(() => (window.location.href = "login.html"), 1500);
    return;
  }

  fetch(`${backendURL}/adopt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pet_id: petId, user_name: user })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) showToast(data.error);
      else {
        showToast(data.message || "Adopted!");
        setTimeout(() => window.location.reload(), 1500);
      }
    })
    .catch(err => {
      console.error("Adoption failed:", err);
      showToast("Something went wrong.");
    });
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}
