import { initializeNavigation } from "./navigation.js";
import { initializeFooter } from "./footer.js";

initializeNavigation();
initializeFooter();

let allRaces = [];

let favorites = JSON.parse(localStorage.getItem("favoriteRaces")) || [];

const raceContainer = document.querySelector("#raceContainer");
const resultsCount = document.querySelector("#resultsCount");

const searchInput = document.querySelector("#searchInput");
const distanceFilter = document.querySelector("#distanceFilter");
const categoryFilter = document.querySelector("#categoryFilter");
const regionFilter = document.querySelector("#regionFilter");
const monthFilter = document.querySelector("#monthFilter");
const elevationFilter = document.querySelector("#elevationFilter");

const dialog = document.querySelector("#raceDialog");
const dialogContent = document.querySelector("#dialogContent");
const closeDialog = document.querySelector("#closeDialog");

initialize();

async function initialize() {
    await loadRaces();
    attachEventListeners();
}

async function loadRaces() {
    try {
        const response = await fetch("data/races.json");

        if (!response.ok) {
            throw new Error("Unable to load race data.");
        }

        allRaces = await response.json();

        displayRaces(allRaces);

    } catch (error) {
        console.error(error);

        raceContainer.innerHTML = `
            <p>Unable to load race data.</p>
        `;
    }
}

function attachEventListeners() {

    searchInput.addEventListener("input", filterRaces);

    distanceFilter.addEventListener("change", filterRaces);

    categoryFilter.addEventListener("change", filterRaces);

    regionFilter.addEventListener("change", filterRaces);

    monthFilter.addEventListener("change", filterRaces);

    elevationFilter.addEventListener("change", filterRaces);

}

function filterRaces() {

    let filtered = [...allRaces];

    const search = searchInput.value.toLowerCase();

    if (search !== "") {
        filtered = filtered.filter(race =>
            race.name.toLowerCase().includes(search)
        );
    }

    if (categoryFilter.value !== "all") {
        filtered = filtered.filter(race =>
            race.category === categoryFilter.value
        );
    }

    if (regionFilter.value !== "all") {
        filtered = filtered.filter(race =>
            race.region === regionFilter.value
        );
    }

    if (monthFilter.value !== "all") {
        filtered = filtered.filter(race =>
            race.month === monthFilter.value
        );
    }

    if (distanceFilter.value !== "all") {
        filtered = filtered.filter(race =>
            race.distance <= Number(distanceFilter.value)
        );
    }

    if (elevationFilter.value !== "all") {

        const elevation = Number(elevationFilter.value);

        if (elevation === 2001) {

            filtered = filtered.filter(race =>
                race.elevation >= 2000
            );

        } else {

            filtered = filtered.filter(race =>
                race.elevation <= elevation
            );

        }
    }

    displayRaces(filtered);

}

function displayRaces(races) {

    raceContainer.innerHTML = "";

    resultsCount.textContent = `${races.length} race(s) found`;

    races.forEach(race => {

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

                <p><strong>Month:</strong> ${race.month}</p>

                <button
                    class="details-button"
                    data-id="${race.id}">
                    View Details
                </button>

                <button
                    class="favorite-button"
                    data-id="${race.id}">
                    ${favorites.includes(race.id)
                        ? "★ Remove from Favorites"
                        : "★ Add to Favorites"}
                </button>

            </div>
        `;

        raceContainer.appendChild(card);

    });

}
raceContainer.addEventListener("click", (event) => {

    const button = event.target;

    if (!button.dataset.id) {
        return;
    }

    const raceId = Number(button.dataset.id);

    if (button.classList.contains("details-button")) {
        openRaceModal(raceId);
    }

    if (button.classList.contains("favorite-button")) {
        toggleFavorite(raceId);
    }

});


function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites = favorites.filter(
            raceId => raceId !== id
        );

    } else {

        favorites.push(id);

    }

    saveFavorites();

    displayRaces(
        applyCurrentFilters()
    );

}


function saveFavorites() {

    localStorage.setItem(
        "favoriteRaces",
        JSON.stringify(favorites)
    );

}


function applyCurrentFilters() {

    let filtered = [...allRaces];

    const search = searchInput.value.toLowerCase();

    if (search !== "") {

        filtered = filtered.filter(race =>
            race.name.toLowerCase().includes(search)
        );

    }

    if (categoryFilter.value !== "all") {

        filtered = filtered.filter(race =>
            race.category === categoryFilter.value
        );

    }

    if (regionFilter.value !== "all") {

        filtered = filtered.filter(race =>
            race.region === regionFilter.value
        );

    }

    if (monthFilter.value !== "all") {

        filtered = filtered.filter(race =>
            race.month === monthFilter.value
        );

    }

    if (distanceFilter.value !== "all") {

        filtered = filtered.filter(race =>
            race.distance <= Number(distanceFilter.value)
        );

    }

    if (elevationFilter.value !== "all") {

        const elevation = Number(elevationFilter.value);

        if (elevation === 2001) {

            filtered = filtered.filter(race =>
                race.elevation >= 2000
            );

        } else {

            filtered = filtered.filter(race =>
                race.elevation <= elevation
            );

        }

    }

    return filtered;

}


function openRaceModal(id) {

    const race = allRaces.find(
        race => race.id === id
    );

    if (!race) {
        return;
    }

    dialogContent.innerHTML = `

        <h2>${race.name}</h2>

        <img
            src="${race.image}"
            alt="${race.name}"
            loading="lazy">

        <p>
            <strong>Location:</strong>
            ${race.location}
        </p>

        <p>
            <strong>Region:</strong>
            ${race.region}
        </p>

        <p>
            <strong>Distance:</strong>
            ${race.displayDistance}
        </p>

        <p>
            <strong>Category:</strong>
            ${race.category}
        </p>

        <p>
            <strong>Month:</strong>
            ${race.month}
        </p>

        <p>
            <strong>Elevation:</strong>
            ${race.elevation} meters
        </p>

        <p>
            ${race.description}
        </p>

        <a
            href="${race.website}"
            target="_blank">
            Official Website
        </a>

    `;

    dialog.showModal();

}


if (closeDialog) {

    closeDialog.addEventListener(
        "click",
        () => dialog.close()
    );

}


if (dialog) {

    dialog.addEventListener(
        "click",
        event => {

            if (event.target === dialog) {
                dialog.close();
            }

        }
    );

}