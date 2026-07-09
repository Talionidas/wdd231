const url = "data/members.json";

const membersContainer = document.querySelector("#members");

async function getMembers() {

    const response = await fetch(url);

    const members = await response.json();

    displayMembers(members);

}

getMembers();

function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h2>${member.name}</h2>
            <p>${member.tagline}</p>
            <p><strong>Address:</strong><br>${member.address}</p>
            <p><strong>Phone:</strong><br>${member.phone}</p>
            <p><strong>Membership:</strong> ${membershipLevel(member.membership)}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        membersContainer.appendChild(card);

    });

}

function membershipLevel(level) {

    if (level === 3) return "Gold";

    if (level === 2) return "Silver";

    return "Member";

}

const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

gridBtn.addEventListener("click", () => {

    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");

});

listBtn.addEventListener("click", () => {

    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");

});