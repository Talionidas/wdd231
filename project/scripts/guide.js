import { initializeNavigation } from "./navigation.js";
import { initializeFooter } from "./footer.js";

initializeNavigation();
initializeFooter();

let races = [];

const form = document.querySelector("#fitnessForm");
const result = document.querySelector("#recommendationResult");

loadRaceData();

async function loadRaceData() {
    try {
        const response = await fetch("data/races.json");

        if (!response.ok) {
            throw new Error("Unable to load race data.");
        }

        races = await response.json();
    } catch (error) {
        console.error(error);

        if (result) {
            result.innerHTML = `
                <p>
                    Race recommendations could not be loaded at this time.
                </p>
            `;
        }
    }
}

if (form) {
    form.addEventListener("submit", calculateRecommendation);
}

function calculateRecommendation(event) {
    event.preventDefault();

    const distanceInput = Number(
        document.querySelector("#cooperDistance").value
    );

    if (!distanceInput || distanceInput <= 0) {
        result.innerHTML = `
            <p>
                Please enter a valid distance.
            </p>
        `;

        return;
    }

    let level;
    let recommendation;

    if (distanceInput < 1800) {
        level = "Beginner";
        recommendation =
            "Start with shorter distances such as 5 km races and gradually build endurance.";
    } else if (distanceInput < 2400) {
        level = "Intermediate";
        recommendation =
            "You could aim for 10 km races or prepare for your first half marathon.";
    } else if (distanceInput < 3000) {
        level = "Advanced";
        recommendation =
            "With structured training, half marathons and longer challenges are realistic.";
    } else {
        level = "Highly Trained";
        recommendation =
            "You may be ready for challenging half marathons, marathons, and mountain races.";
    }

    displayRecommendation(
        level,
        recommendation,
        distanceInput
    );
}

function displayRecommendation(
    level,
    recommendation,
    distanceInput
) {
    let suitableDistances = [];

    if (level === "Beginner") {
        suitableDistances = [
            "5 km",
            "10 km"
        ];
    } else if (level === "Intermediate") {
        suitableDistances = [
            "10 km",
            "Half Marathon"
        ];
    } else if (level === "Advanced") {
        suitableDistances = [
            "Half Marathon",
            "Marathon"
        ];
    } else {
        suitableDistances = [
            "Marathon",
            "Ultra",
            "Mountain Running"
        ];
    }

    const suggestedRaces = races.filter(race => {
        return suitableDistances.some(distance =>
            race.displayDistance.includes(distance)
        );
    }).slice(0, 3);

    result.innerHTML = `
        <h3>Your Running Level: ${level}</h3>

        <p>
            Based on your Cooper Test result of
            ${distanceInput} meters in 12 minutes:
        </p>

        <p>
            ${recommendation}
        </p>

        <h4>
            Suggested Race Goals:
        </h4>

        <ul>
            ${suitableDistances.map(distance =>
                `<li>${distance}</li>`
            ).join("")}
        </ul>

        <h4>
            Example Swiss Races:
        </h4>

        <div class="guide-races">
            ${suggestedRaces.map(race =>
                `
                <article class="race-card">
                    <h5>
                        ${race.name}
                    </h5>

                    <p>
                        ${race.location}
                    </p>

                    <p>
                        ${race.displayDistance}
                    </p>

                    <p>
                        ${race.category}
                    </p>
                </article>
                `
            ).join("")}
        </div>
    `;
}