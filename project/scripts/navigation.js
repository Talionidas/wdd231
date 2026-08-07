export function initializeNavigation() {

    const menuButton = document.querySelector("#menuButton");
    const navigation = document.querySelector(".navigation");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("open");
        menuButton.classList.toggle("open");

        const expanded = menuButton.classList.contains("open");

        menuButton.setAttribute("aria-expanded", expanded);

        if (expanded) {
            menuButton.innerHTML = "✕";
        } else {
            menuButton.innerHTML = "☰";
        }

    });

}