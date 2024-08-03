var old_card_data = JSON.stringify(editor_create_json());
var new_card_data;

try {
    var demo_param = JSON.parse(new URL(window.location.href).searchParams.get("demo").toLowerCase());

} catch {
    var demo_param = false;
}

async function start_editor() {
    if (demo_param == false) {
        let uuid_param = new URL(window.location.href).searchParams.get("uuid");

        document.querySelector("#editor_main_preview_demo").style.display = "none";

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
                    log("INFO", "A new card has been created on the server with uuid " + new_uuid);
                    create_notification("New card created", "A new card has been successfully created", "check-circle");
                    status_saved();
    
                } else {
                    status_error();
                    log("WARNING", "There was a problem")
                    create_notification("There was a problem", "There was an unknown issue", "warning");
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
                    log("WARNING", "There was a problem");
                    create_notification("There was a problem checking the card", "There was an unknown issue", "warning");
    
                } else if (text == "Card does not exist!") {
                    log("WARNING", "Card does not exist!");
                    status_error();
                    window.location.href = server_ip;
    
                } else if (text == "No Permission") {
                    log("WARNING", "No Permission")
                    window.location.href = server_ip;
    
                } else {
                    log("INFO", "This card exists on the server!")
                    card_render_from_json(".card_card", text);
                    editor_load_from_json(text);
                    status_saved();
                }
            });
        }
    } else if (demo_param == true) {
        document.querySelector("#editor_status").style.display = "none";
        document.querySelector("#editor_header_name").style.display = "none";
        document.querySelector("#editor_main_preview_share").style.display = "none";
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
            log("INFO", "Data has been saved")
            status_saved();
            return true;

        } else {
            log("WARNING", "There was a problem saving the card")
            status_error();
            create_notification("There was a problem saving your card", "There was an unknown issue", "warning");
            return false;
        }
    });
}

function save_loop() {
    new_card_data = JSON.stringify(editor_create_json());

    if (new_card_data != old_card_data) {
        old_card_data = new_card_data;
        save_card(new_card_data);
        card_render_from_json(".card_card", new_card_data);
    }
}

function demo_loop() {
    new_card_data = JSON.stringify(editor_create_json());

    if (new_card_data != old_card_data) {
        old_card_data = new_card_data;
        card_render_from_json(".card_card", new_card_data);
    }
}

async function editor_demo_auth(sign_in) {
    const response = await fetch(server_ip + "/createtempcard", {
        method: "POST",
        headers: {
            "data": JSON.stringify(editor_create_json())
        }
    });

    response.text().then(function (text) {
        if (text == "Missing headers") {
            log("WARNING", text);
            create_notification("There was an error creating the temporary card", "Missing headers in the request", "warning");

        } else if (text == "Request is not a POST request") {
            log("WARNING", text);
            create_notification("There was an error creating the temporary card", "Request is not a POST request", "warning");

        } else if (response.status == 200) {
            log("INFO", `The new temporary card has been created with uuid ${text}!`);

            if (sign_in) {
                window.location.href = `${server_ip}/authentication?sign_in=true&temp_uuid=${text}&`;
            } else {
                window.location.href = `${server_ip}/authentication?sign_in=false&temp_uuid=${text}&`;
            }

        } else {
            log("WARNING", text);
        }
    });
}

document.querySelector("#editor_header_title_home").addEventListener("click", (event) => {
    window.location.href = server_ip + "/home";
});

document.querySelector("#editor_share_copylink").addEventListener("click", async (event) => {
    let uuid_param = new URL(window.location.href).searchParams.get("uuid");

    await navigator.clipboard.writeText(`${server_ip}/card?uuid=${uuid_param}&`).then(() => {
        event.target.innerHTML = `<i class="ph-bold ph-check-circle"></i> Copied!`;

        setInterval( () => {
            event.target.innerHTML = `<i class="ph-bold ph-copy"></i> Copy Link`;
        }, 3000);
    });
});

// TODO: Implement
document.querySelector("#editor_share_copyqr").addEventListener("click", async (event) => {

});

// TODO: Implement
document.querySelector("#editor_share_downloadqr").addEventListener("click", (event) => {

});

document.querySelector("#editor_demo_signin").addEventListener("click", (event) => {
    editor_demo_auth(true);
});

document.querySelector("#editor_demo_createaccount").addEventListener("click", (event) => {
    editor_demo_auth(false);
});

start_editor();

if (demo_param == false) {
    setInterval(save_loop, 3000);
} else {
    setInterval(demo_loop, 1000);
}
