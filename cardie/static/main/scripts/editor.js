var old_card_data = JSON.stringify(card_create_json());
var new_card_data;

async function start_editor() {
    let uuid_param = new URL(window.location.href).searchParams.get("uuid");

    if (uuid_param == null) {
        let new_uuid = crypto.randomUUID();

        const response = await fetch(server_ip + "/createcard", {
            method: "POST",
            headers: {
                "UUID": new_uuid,
            }
        });

        response.text().then(function (text) {
            if (text == "Done") {
                var refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + '?uuid=' + new_uuid;    
                window.history.pushState({ path: refresh }, '', refresh);
                console.log("A new card has been created on the server with uuid " + new_uuid)
                status_saved();

            } else {
                status_error();
                console.log("there was a problem")
            }
        });

    } else {
        const response = await fetch(server_ip + "/checkcard", {
            method: "POST",
            headers: {
                "UUID": uuid_param,
            }
        });

        response.text().then(function (text) {
            if (text == "Request is not a POST request") {
                status_error();
                console.log("there was a problem")

            } else if (text == "Card does not exist!") {
                status_error();
                window.location.href = server_ip;

            } else {
                console.log("This card exists on the server!")
                render_card_from_json(JSON.parse(text))
                status_saved();
            }
        });
    }
}

async function save_card(card_json) {
    status_saving();
    let uuid_param = new URL(window.location.href).searchParams.get("uuid");

    const response = await fetch(server_ip + "/savecard", {
        method: "POST",
        headers: {
            "UUID": uuid_param,
            "Data": card_json
        }
    });

    response.text().then(function (text) {
        if (text == "Done") {
            console.log("Data has been saved")
            status_saved();
            return true;

        } else {
            console.log("there was a problem")
            status_error();
            return false;
        }
    });
}

function save_loop() {
    new_card_data = JSON.stringify(card_create_json());

    if (new_card_data != old_card_data) {
        old_card_data = new_card_data;
        save_card(new_card_data);
        render_card();
    }
}

document.querySelector("#editor_header_title_home").addEventListener("click", (event) => {
    window.location.href = server_ip + "/home";
})

start_editor();

setInterval(save_loop, 3000);