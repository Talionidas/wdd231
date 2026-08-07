export async function loadFeaturedRaces() {

    const raceContainer = document.querySelector("#featuredRaces");

    if (!raceContainer) {
        return;
    }

    try {

        const response = await fetch("data/races.json");

        if (!response.ok) {
            throw new Error("Unable to load race data.");
        }

        const races = await response.json();

        const featuredRaces = races.filter(race => race.featured);

        featuredRaces.forEach(race => {

            const card = document.createElement("article");
            card.classList.add("race-card");

            card.innerHTML = `
                <img
                    src="${race.image}"
                    alt="${race.name}"
                    loading="lazy"
                    width="500"
                    height="300">

                <div class="race-card-content">

                    <h3>${race.name}</h3>

                    <p><strong>Location:</strong> ${race.location}</p>

                    <p><strong>Distance:</strong> ${race.displayDistance}</p>

                    <p><strong>Category:</strong> ${race.category}</p>

                    <button
                        class="details-button"
                        data-id="${race.id}">
                        View Details
                    </button>

                </div>
            `;

            raceContainer.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        raceContainer.innerHTML = `
            <p>
                Sorry, featured races could not be loaded at this time.
            </p>
        `;

    }

}