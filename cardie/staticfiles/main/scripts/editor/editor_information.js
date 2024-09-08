// It starts at one... this feels wrong...
var text_items = new Array();
var link_items = new Array();
var currently_editing_icon;

function open_iconselector_foritem(event) {
    let item = event.target.closest(".link_item, .text_item");
    currently_editing_icon = item;
    show_iconselector();
}

// TOOD: Deprecate
function render_card() {
    // TODO: What if there's more than one card on the page?

    document.querySelector(".card_top_text_username").innerText = document.querySelector("#editor_main_settings_details_username").value;
    document.querySelector(".card_top_text_pronouns").innerText = document.querySelector("#editor_main_settings_details_pronouns").value;

    card_delete_items(".card_card");

    for (const item in text_items) {
        let item_uuid = text_items[item].getAttribute("uuid");
        let item_icon = text_items[item].querySelector(":scope > .text_item_icon > i").className.replace("ph-bold ", "");
        let item_text = text_items[item].querySelector(":scope > .text_item_text").value;

        card_create_text_item(".card_card", item_uuid, item_icon, item_text);
    }

    for (const link in link_items) {
        let item_uuid = link_items[link].getAttribute("uuid");
        let item_icon = link_items[link].querySelector(":scope > .link_item_icon > i").className.replace("ph-bold ", "");
        let item_text = link_items[link].querySelector(":scope > .link_item_text").value;
        let item_url = link_items[link].querySelector(":scope > .link_item_url").value;

        card_create_link_item(".card_card", item_uuid, item_icon, item_text, item_url);
    }
}

function editor_create_json() {
    let card_json = {
        "uuid": "unknown",
        "name": "",
        "author": "unknown",
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
    card_json["author"] = username;
    card_json["details"]["username"] = document.querySelector("#editor_main_settings_details_username").value;
    card_json["details"]["pronouns"] = document.querySelector("#editor_main_settings_details_pronouns").value;

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

function editor_load_from_json(json) {
    // Sets up all the buttons based on the json

    json = JSON.parse(json);

    document.querySelector("#editor_header_name_text_cardname").innerText = json["name"];
    document.querySelector("#editor_main_settings_details_username").value = json["details"]["username"];
    document.querySelector("#editor_main_settings_details_pronouns").value = json["details"]["pronouns"];

    for (const item in json["information"]["items"]["text"]) {
        create_text_item(
            json["information"]["items"]["text"][item]["uuid"],
            json["information"]["items"]["text"][item]["text"],
            json["information"]["items"]["text"][item]["icon"]
        )
    }

    for (const item in json["information"]["items"]["links"]) {
        create_link_item(
            json["information"]["items"]["links"][item]["uuid"],
            json["information"]["items"]["links"][item]["text"],
            json["information"]["items"]["links"][item]["url"],
            json["information"]["items"]["links"][item]["icon"]
        )
    }
}

function status_saved() {
    document.querySelector("#editor_status").innerHTML = '<i class="ph-bold ph-check-circle"></i> Saved';
}

function status_saving() {
    document.querySelector("#editor_status").innerHTML = '<i class="ph-bold ph-spinner-gap"></i> Saving...';
}

function status_error() {
    document.querySelector("#editor_status").innerHTML = '<i class="ph-bold ph-warning"></i> Error';

}