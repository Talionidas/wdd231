const params = new URLSearchParams(window.location.search);


// Helper function
function setValue(id, value) {

    const element = document.querySelector(`#${id}`);

    if (element) {
        element.textContent = value || "Not provided";
    }

}


setValue("firstname", params.get("firstname"));
setValue("lastname", params.get("lastname"));
setValue("email", params.get("email"));
setValue("phone", params.get("phone"));
setValue("business", params.get("business"));


const membership = params.get("membership");

let membershipName = "";

switch (membership) {

    case "np":
        membershipName = "NP Membership";
        break;

    case "bronze":
        membershipName = "Bronze Membership";
        break;

    case "silver":
        membershipName = "Silver Membership";
        break;

    case "gold":
        membershipName = "Gold Membership";
        break;

    default:
        membershipName = "Not selected";

}

setValue("membership", membershipName);


const timestamp = params.get("timestamp");

if (timestamp) {

    const formatted = new Date(timestamp).toLocaleString();

    setValue("timestamp", formatted);

}
else {

    setValue("timestamp", "Unavailable");

}