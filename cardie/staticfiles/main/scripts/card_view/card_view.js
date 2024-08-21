var cardview_json;

async function render_card_view() {
    let uuid_param = new URL(window.location.href).searchParams.get("uuid");

    if (uuid_param == null) {
        log("WARNING", "No UUID");
       // TODO: Show that the card cannot be found

    } else {
        const response = await fetch(server_ip + "/getcard", {
            method: "POST",
            headers: {
                "UUID": uuid_param,
            }
        });

        response.text().then(function (text) {
            if (text == "Request is not a POST request") {
                log("WARNING", text);
                create_notification("There was an issue fetching the card", text, "warning");

            } else if (text == "Card does not exist!") {
                // TODO: Show that the card cannot be found
                log("WARNING", "Card does not exist");
                create_notification("That card could not be found", text, "warning");

            } else {
                log("INFO", "This card exists on the server!");
                card_render_from_json(".card_card", text);
                cardview_json = text;

                document.querySelector("#cardview_text_cardname").innerText = JSON.parse(text)["name"];
                document.querySelector("#cardview_text_username").innerText = `Created by ${JSON.parse(text)["author"]}`;
                show_cardview_status();
            }
        });
    }
}

function show_cardview_status() {
    try {
        var from_wallet_param = new URL(window.location.href).searchParams.get("from_wallet");
    } catch {
        var from_wallet_param = false;
    }

    if (from_wallet_param) {
        document.querySelector("#cardview_bottom_createaccount").style.display = "none";
        document.querySelector("#cardview_bottom_save").style.display = "none";
        document.querySelector("#cardview_bottom_owned").style.display = "none";

    } else {
        if (username == JSON.parse(cardview_json)["author"]) {
            document.querySelector("#cardview_bottom_createaccount").style.display = "none";
            document.querySelector("#cardview_bottom_save").style.display = "none";
            document.querySelector("#cardview_bottom_owned").style.display = "block";
        
        } else if (username) {
            document.querySelector("#cardview_bottom_createaccount").style.display = "none";
            document.querySelector("#cardview_bottom_save").style.display = "block";
            document.querySelector("#cardview_bottom_owned").style.display = "none";
        
        } else {
            document.querySelector("#cardview_bottom_createaccount").style.display = "block";
            document.querySelector("#cardview_bottom_save").style.display = "none";
            document.querySelector("#cardview_bottom_owned").style.display = "none";
        }
    }

    
}

async function save_to_wallet() {
    let uuid_param = new URL(window.location.href).searchParams.get("uuid");

    if (uuid_param == null) {
        log("WARNING", "No UUID");
       // TODO: Show that the card cannot be found

    } else {
        const response = await fetch(server_ip + "/savetowallet", {
            method: "POST",
            headers: {
                "UUID": uuid_param,
            }
        });

        response.text().then(function (text) {
            if (text == "Request is not a POST request") {
                log("WARNING", text);
                create_notification("There was an issue fetching the card", text, "warning");

            } else if (text == "Missing headers") {
                log("WARNING", text);
                create_notification("There was a problem saving your card", text, "warning");

            } else if (text == "Not signed in") {
                log("WARNING", text);
                create_notification("There was a problem saving your card", text, "warning");
                window.location.href = `${server_ip}/authentication`;

            } else if (text == "Card not found") {
                log("WARNING", text);
                create_notification("There was a problem saving your card", text, "warning");

            } else if (text == "Success") {
                log("INFO", "Card saved to wallet");
                create_notification("Card saved", "This card has been saved to your wallet", "check-circle");

            } else {
                log("WARNING", "There was an unknown error saving that card to your wallet");
                create_notification("There was a problem saving your card", "There was an unknown error", "warning");
            }
        });
    }
}

document.querySelector("#cardview_signin").addEventListener("click", (event) => {
    window.location.href = `${server_ip}/authentication?sign_in=true&ref=${window.location.href}`
});

document.querySelector("#cardview_save").addEventListener("click", (event) => {
    save_to_wallet();
});

render_card_view();
