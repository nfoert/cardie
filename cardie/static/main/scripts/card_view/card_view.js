async function render_card_view() {
    let uuid_param = new URL(window.location.href).searchParams.get("uuid");

    if (uuid_param == null) {
        console.log("no uuid");
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
                console.log("there was a problem")

            } else if (text == "Card does not exist!") {
                // TODO: Show that the card cannot be found

            } else {
                console.log("This card exists on the server!");
                card_render_from_json(".card_card", text);

                document.querySelector("#cardview-text-cardname").innerText = JSON.parse(text)["name"];
                document.querySelector("#cardview-text-username").innerText = `Created by ${JSON.parse(text)["author"]}`; // TODO: an author value is needed in the JSON
            }
        });
    }
}

render_card_view();