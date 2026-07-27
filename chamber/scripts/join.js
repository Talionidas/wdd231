const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}



const buttons = document.querySelectorAll("[data-dialog]");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const dialog = document.querySelector(`#${button.dataset.dialog}`);

        if (dialog) {
            dialog.showModal();
        }

    });

});



const closeButtons = document.querySelectorAll(".close-dialog");

closeButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.closest("dialog").close();

    });

});