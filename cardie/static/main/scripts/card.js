// Makes every .card_card element flip on click

var cards = document.getElementsByClassName("card_card");

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function() {
        cards[i].classList.toggle("card_flipped");
    });
}

// Functions for adding elements to the card
function card_delete_items() {
    // TODO: What if there are multiple cards on the page?
    document.querySelector(".card_items").replaceChildren();
}

function card_create_text_item(uuid, icon, text) {
    let div = document.createElement("div");
    div.classList.add("card_item_text");
    div.setAttribute("uuid", uuid)

    let icon_element = document.createElement("i");
    icon_element.className = `ph-bold ${icon}`;

    let text_element = document.createElement("p");
    text_element.innerText = text;

    div.appendChild(icon_element);
    div.appendChild(text_element);

    // TODO: What if there are multiple cards on the page?
    document.querySelector(".card_items").appendChild(div);
}

function card_create_link_item(uuid, icon, text, url) {
    let div = document.createElement("div");
    div.classList.add("card_item_link");
    div.setAttribute("uuid", uuid)

    let icon_element = document.createElement("i");
    icon_element.className = `ph-bold ${icon}`;

    let button_element = document.createElement("button");
    button_element.innerText = text;

    button_element.addEventListener("click", (event) => {
        window.location.href = url;
    })

    div.appendChild(icon_element);
    div.appendChild(button_element);

    // TODO: What if there are multiple cards on the page?
    document.querySelector(".card_items").appendChild(div);
}

function card_create_json() {
    // TODO: What if there are multiple cards on the page?
    // TODO: UUID support

    let card_json = {
        "uuid": "unknown",
        "name": "",
        "layout": "",
        "details": {
            "username": "",
            "pronouns": ""
        },
        "information": {
            "items": {
                "text": [],
                "links": []
            }
        }
    }

    card_json["name"] = document.querySelector("#editor_header_name_text_cardname").innerText;
    card_json["details"]["username"] = document.querySelector("#editor_main_settings_details_username").value;
    card_json["details"]["pronouns"] = document.querySelector("#editor_main_settings_details_pronouns").value

    for (const item in text_items) {
        let item_uuid = text_items[item].getAttribute("uuid");
        let item_icon = text_items[item].querySelector(":scope > .text_item_icon > i").className.replace("ph-bold ", "");
        let item_text = text_items[item].querySelector(":scope > .text_item_text").value;

        let item_json = {
            "uuid": item_uuid,
            "icon": item_icon,
            "text": item_text
        }

        card_json["information"]["items"]["text"].push(item_json);
    }

    for (const link in link_items) {
        let item_uuid = link_items[link].getAttribute("uuid");
        let item_icon = link_items[link].querySelector(":scope > .link_item_icon > i").className.replace("ph-bold ", "");
        let item_text = link_items[link].querySelector(":scope > .link_item_text").value;
        let item_url = link_items[link].querySelector(":scope > .link_item_url").value;

        let item_json = {
            "uuid": item_uuid,
            "icon": item_icon,
            "text": item_text,
            "url": item_url
        }

        card_json["information"]["items"]["links"].push(item_json);
    }

    return card_json;
}