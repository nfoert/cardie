var home_state = "wallet" // wallet, cards

function state_wallet() {
    home_state = "wallet";

    document.querySelector("#home-navigation-wallet").disabled = true;
    document.querySelector("#home-cards").style.display = "none";

    document.querySelector("#home-navigation-cards").disabled = false;
    document.querySelector("#home-wallet").style.display = "flex";
}

function state_cards() {
    home_state = "cards";

    document.querySelector("#home-navigation-cards").disabled = true;
    document.querySelector("#home-wallet").style.display = "none";

    document.querySelector("#home-navigation-wallet").disabled = false;
    document.querySelector("#home-cards").style.display = "flex";
}

function home_card_edit(event) {
    let uuid = event.target.closest(".home_card").querySelector(":scope > .home_card_text > .home_card_text_uuid").innerText;
    window.location.href = server_ip + "/editor" + `?uuid=${uuid}&`;
}

function create_home_card(uuid, name) {
    let div = document.createElement("div");
    div.classList.add("home_card");

    let edit_button = document.createElement("button");
    edit_button.classList.add("ui_button_icon");

    let edit_button_icon = document.createElement("i");
    edit_button_icon.className = "ph ph-pencil-simple-line"

    edit_button.appendChild(edit_button_icon);
    edit_button.addEventListener("click", (event) => home_card_edit(event))

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

    document.querySelector("#home-cards").appendChild(div);
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
            return false;
        } else {
            text = JSON.parse(text);
            for (const card in text) {
                create_home_card(text[card]["uuid"], text[card]["name"]);
            }
        }
    });
}

document.querySelector("#home-navigation-wallet").addEventListener("click", function() {
    state_wallet();
})

document.querySelector("#home-navigation-cards").addEventListener("click", function() {
    state_cards();
})

state_wallet();
list_cards();