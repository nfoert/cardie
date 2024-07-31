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

                document.querySelector("#cardview-text-cardname").innerText = JSON.parse(text)["name"];
                document.querySelector("#cardview-text-username").innerText = `Created by ${JSON.parse(text)["author"]}`; // TODO: an author value is needed in the JSON
            }
        });
    }
}

render_card_view();