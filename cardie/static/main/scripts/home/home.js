
function home_card_edit(event) {
    let uuid = event.target.closest(".home_card").querySelector(":scope > .home_card_text > .home_card_text_uuid").innerText;
    window.location.href = server_ip + "/editor" + `?uuid=${uuid}&`;
}

var open_home_card_uuid;

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

document.querySelector("#home-top-image").addEventListener("click", (event) => {
    window.location.href = server_ip;
});

document.querySelector("#home_menu_edit").addEventListener("click", (event) => {
    window.location.href = `${server_ip}/editor?uuid=${open_home_card_uuid}&`;
});

document.querySelector("#home_menu_rename").addEventListener("click", (event) => {

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

});

list_cards();