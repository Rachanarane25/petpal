// Fetch pets from Flask backend
document.addEventListener("DOMContentLoaded", () => {
  const petList = document.getElementById("pet-list");

  fetch("http://127.0.0.1:5000/pets")
    .then(response => response.json())
    .then(data => {
      data.forEach(pet => {
        const card = document.createElement("div");
        card.classList.add("pet-card");
        card.innerHTML = `
          <img src="https://placekitten.com/250/180" alt="${pet.name}">
          <h3>${pet.name}</h3>
          <p>Type: ${pet.type}</p>
          <p>Age: ${pet.age} years</p>
          <p>Location: ${pet.location}</p>
        `;
        petList.appendChild(card);
      });
    })
    .catch(err => {
      petList.innerHTML = `<p style="color:red;">Failed to load pets 😢</p>`;
      console.error(err);
    });
});
