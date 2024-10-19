
function home_card_edit(event) {
    let uuid = event.target.closest(".home_card").querySelector(":scope > .home_card_text > .home_card_text_uuid").innerText;
    window.location.href = server_ip + "/editor" + `?uuid=${uuid}&`;
}

var open_home_card_uuid;
var open_home_card_target;

function home_card_menu(event) {
    let home_card = event.target.closest(".home_card");

    if (home_card.getAttribute("open") == "false") {
        home_card.style.position = "relative";
        home_card.style.zIndex = "3";
        home_card.style.scale = "1.05";
        show_background_blur();
        home_card.querySelector(".home_card_menu_button > i").className = "ph-bold ph-x-circle";
        home_card.setAttribute("open", true);

        document.querySelector("#home_card_menu").style.display = "flex";

        const rect = home_card.getBoundingClientRect();
        document.querySelector("#home_card_menu").style.top = `${rect.bottom + 10}px`;
        document.querySelector("#home_card_menu").style.left = `${rect.right - document.querySelector("#home_card_menu").offsetWidth}px`;

        setTimeout(function() {
            document.querySelector("#home_card_menu").classList.add("show");
        }, 50);

        open_home_card_uuid = home_card.querySelector(".home_card_text_uuid").innerText;
        open_home_card_target = home_card;

    } else {
        home_card.querySelector(".home_card_menu_button > i").className = "ph-bold ph-dots-three";
        home_card.style.scale = "1";
        document.querySelector("#home_card_menu").classList.remove("show");
        hide_background_blur();

        setTimeout(function() {
            home_card.style.zIndex = "1";
            home_card.setAttribute("open", "false");
            document.querySelector("#home_card_menu").style.display = "none";
        }, 500);
    }
    
}

function create_home_card(uuid, name) {
    let div = document.createElement("div");
    div.classList.add("home_card");

    let edit_button = document.createElement("button");
    edit_button.classList.add("ui_button_icon");
    edit_button.classList.add("home_card_edit_button")

    let edit_button_icon = document.createElement("i");
    edit_button_icon.className = "ph-bold ph-pencil-simple-line";

    edit_button.appendChild(edit_button_icon);
    edit_button.addEventListener("click", (event) => home_card_edit(event));

    let menu_button = document.createElement("button");
    menu_button.classList.add("ui_button_icon");
    menu_button.classList.add("home_card_menu_button")

    let menu_button_icon = document.createElement("i");
    menu_button_icon.className = "ph-bold ph-dots-three";

    menu_button.appendChild(menu_button_icon);
    menu_button.addEventListener("click", (event) => home_card_menu(event));

    let text_div = document.createElement("div");
    text_div.classList.add("home_card_text");

    let text_name = document.createElement("p");
    text_name.classList.add("home_card_text_name");
    text_name.innerText = name;

    let text_uuid = document.createElement("p");
    text_uuid.classList.add("home_card_text_uuid");
    text_uuid.innerText = uuid;

    text_div.appendChild(text_name);
    text_div.appendChild(text_uuid);

    div.appendChild(text_div);
    div.appendChild(edit_button);
    div.appendChild(menu_button);

    div.setAttribute("open", false);

    document.querySelector("#home_cards").appendChild(div);
}

function create_wallet_card(uuid, name) {
    let div = document.createElement("div");
    div.classList.add("home_card");

    let view_button = document.createElement("button");
    view_button.classList.add("ui_button_icon");
    view_button.classList.add("home_wallet_view_button")

    let view_button_icon = document.createElement("i");
    view_button_icon.className = "ph-bold ph-arrow-circle-right";

    view_button.appendChild(view_button_icon);
    view_button.addEventListener("click", (event) => home_wallet_view(event));

    let remove_button = document.createElement("button");
    remove_button.classList.add("ui_button_icon");
    remove_button.classList.add("home_wallet_remove_button")

    let remove_button_icon = document.createElement("i");
    remove_button_icon.className = "ph-bold ph-trash";

    remove_button.appendChild(remove_button_icon);
    remove_button.addEventListener("click", (event) => home_wallet_remove(event));

    let text_div = document.createElement("div");
    text_div.classList.add("home_card_text");

    let text_name = document.createElement("p");
    text_name.classList.add("home_card_text_name");
    text_name.innerText = name;

    let text_uuid = document.createElement("p");
    text_uuid.classList.add("home_card_text_uuid");
    text_uuid.innerText = uuid;

    text_div.appendChild(text_name);
    text_div.appendChild(text_uuid);

    div.appendChild(text_div);
    div.appendChild(view_button);
    div.appendChild(remove_button);

    div.setAttribute("open", false);

    document.querySelector("#home_wallet").appendChild(div);
}

function home_wallet_view(event) {
    let uuid = event.target.closest(".home_card").querySelector(":scope > .home_card_text > .home_card_text_uuid").innerText;
    window.location.href = server_ip + "/card" + `?uuid=${uuid}&from_wallet=true`;
}

async function home_wallet_remove(event) {
    const response = await fetch(server_ip + "/removefromwallet", {
        method: "POST",
        headers: {
            "uuid": event.target.closest(".home_card").querySelector(":scope > .home_card_text > .home_card_text_uuid").innerText
        }
    });

    response.text().then(function (text) {
        if (text == "Request is not a POST request") {
            create_notification("There was a problem removing that card from your wallet", text, "warning");
            log("WARNING", text);

        } else if (text == "Not signed in") {
            create_notification("There was a problem removing that card from your wallet", text, "warning");
            log("WARNING", text);

        } else if (text == "Success") {
            create_notification("Card removed from wallet", "The card has been removed from your wallet", "check-circle");
            window.location.reload();
            
        } else {
            create_notification("There was a problem removing that card from your wallet", "There was an unknown issue", "warning");
            log("WARNING", "There was an unknown issue: " + text);
        }
    });
}

async function list_cards() {
    const response = await fetch(server_ip + "/listcards", {
        method: "POST",
        headers: {
            "Username": username,
        }
    });

    response.text().then(function (text) {
        if (text == "Request is not a POST request") {
            create_notification("There was a problem listing your cards", text, "warning");
            return false;
            
        } else {
            text = JSON.parse(text);
            for (const card in text) {
                create_home_card(text[card]["uuid"], text[card]["name"]);
            }
        }
    });
}

async function log_out() {
    const response = await fetch(server_ip + "/logout", {
        method: "POST",
    });

    response.text().then(function (text) {
        if (text == "Request is not a POST request") {
            create_notification("There was a problem logging out", text, "warning");
            return false;

        } else {
            window.location.href = server_ip + "/authentication";
        }
    });
}

function create_new_card() {
    window.location.href = server_ip + "/editor";
}

async function get_wallet() {
    const response = await fetch(server_ip + "/getwallet", {
        method: "POST",
    });

    response.text().then(function (text) {
        if (text == "Request is not a POST request") {
            log("WARNING", text);
            create_notification("There was a problem getting your wallet", text, "warning");
            return false;

        } else if (text == "Not signed in") {
            log("WARNING", "You're not signed in!");
            window.location.href = `${server_ip}/authentication`;
            
        } else {
            text = JSON.parse(text);

            if (!text.length == 0) {
                document.querySelector("#home_wallet_nocards").style.display = "none";
            }

            for (const card in text) {
                create_wallet_card(text[card]["uuid"], text[card]["name"]);
            }
        }
    });
}

document.querySelector("#home_top_image").addEventListener("click", (event) => {
    window.location.href = server_ip;
});

document.querySelector("#home_menu_edit").addEventListener("click", (event) => {
    window.location.href = `${server_ip}/editor?uuid=${open_home_card_uuid}&`;
});

document.querySelector("#home_menu_rename").addEventListener("click", (event) => {
    document.querySelector("#dialog_home_rename_input").value = open_home_card_target.querySelector(".home_card_text > .home_card_text_name").innerText;
    document.querySelector("#dialog_home_rename").showModal();
});

document.querySelector("#dialog_home_rename > .ui_dialog_generic_top > .ui_dialog_generic_top_close").addEventListener("click", (event) => {
    document.querySelector("#dialog_home_rename").close();
});

document.querySelector("#dialog_home_rename_submit").addEventListener("click", async (event) => {
    const response = await fetch(server_ip + "/renamecard", {
        method: "POST",
        headers: {
            "uuid": open_home_card_uuid,
            "name": document.querySelector("#dialog_home_rename_input").value
        }
    });

    response.text().then(function (text) {
        if (text == "Request is not a POST request") {
            create_notification("There was a problem renaming your card", text, "warning");
            log("WARNING", text)

        } else if (text == "Missing headers") {
            create_notification("There was a problem renaming your card", text, "warning");
            log("WARNING", text);

        } else if (text == "Card not found") {
            create_notification("There was a problem renaming your card", text, "warning");
            log("WARNING", text);

        } else if (text == "Success") {
            create_notification("Card deleted", "Your card has been renaming", "check-circle");
            log("INFO", "Card renamed");
            window.location.reload();

        } else {
            create_notification("There was a problem", "There was an unknown problem renaming your card", "warning");
            log("WARNING", "There was an unknown problem renaming the card");
        }
    });
});

document.querySelector("#home_menu_copylink").addEventListener("click", async (event) => {
    await navigator.clipboard.writeText(`${server_ip}/card?uuid=${open_home_card_uuid}&`).then(() => {
        event.target.closest(".ui_button_small").style.color = "#5dca63";

        setInterval( () => {
            event.target.closest(".ui_button_small").style.color = "#ffffff";
        }, 1000);
    });
});

document.querySelector("#home_menu_delete").addEventListener("click", (event) => {
    document.querySelector("#dialog_home_delete").showModal();
});

document.querySelector("#dialog_home_delete > .ui_dialog_generic_top > .ui_dialog_generic_top_close").addEventListener("click", (event) => {
    document.querySelector("#dialog_home_delete").close();
});

document.querySelector("#dialog_home_delete_cancel").addEventListener("click", (event) => {
    document.querySelector("#dialog_home_delete").close();
});

document.querySelector("#dialog_home_delete_delete").addEventListener("click", async (event) => {
    const response = await fetch(server_ip + "/deletecard", {
        method: "POST",
        headers: {
            "uuid": open_home_card_uuid
        }
    });

    response.text().then(function (text) {
        if (text == "Request is not a POST request") {
            create_notification("There was a problem deleting your card", text, "warning");
            log("WARNING", text)

        } else if (text == "Missing headers") {
            create_notification("There was a problem deleting your card", text, "warning");
            log("WARNING", text);

        } else if (text == "Card not found") {
            create_notification("There was a problem deleting your card", text, "warning");
            log("WARNING", text);

        } else if (text == "Success") {
            create_notification("Card deleted", "Your card has been deleted", "check-circle");
            log("INFO", "Card deleted");
            window.location.reload();

        } else {
            create_notification("There was a problem", "There was an unknown problem deleting your card", "warning");
            log("WARNING", "There was an unknown problem deleting the card");
        }
    });
});

list_cards();
get_wallet();