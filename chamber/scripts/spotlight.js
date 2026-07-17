const spotlight = document.querySelector("#spotlight-container");

async function getMembers(){

    const response = await fetch("data/members.json");
    const members = await response.json();
    displaySpotlights(members);

}

function displaySpotlights(members){

    const eligible =
        members.filter(member =>
            member.membership >=2
        );

    eligible.sort(()=>Math.random()-0.5);

    const selected = eligible.slice(0,3);

    selected.forEach(member=>{

        const card=document.createElement("section");
        card.classList.add("spotlight-card");
        card.innerHTML=`

        <img src="images/${member.image}" alt="${member.name}">

        <h3>${member.name}</h3>
        <p>${member.phone}</p>
        <p>${member.address}</p>

        <a href="${member.website}" target="_blank">

            Visit Website

        </a>

        <p>${member.membership==3?"Gold":"Silver"} Member</p>

        `;

        spotlight.appendChild(card);

    });

}

getMembers();