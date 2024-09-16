// It starts at one... this feels wrong...
var text_items = new Array();
var link_items = new Array();
var currently_editing_icon;
var items_list;

function open_iconselector_foritem(event) {
    let item = event.target.closest(".link_item, .text_item");
    currently_editing_icon = item;
    show_iconselector();
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
            "items": []
        },
        "version": 1
    }

    card_json["name"] = document.querySelector("#editor_header_name_text_cardname").innerText;
    card_json["author"] = username;
    card_json["details"]["username"] = document.querySelector("#editor_main_settings_details_username").value;
    card_json["details"]["pronouns"] = document.querySelector("#editor_main_settings_details_pronouns").value;

    for (const item in items_list) {
        let item_uuid = items_list[item].id;
        let item_icon = items_list[item].icon;
        let item_text = items_list[item].text;
        let item_url = items_list[item].url;
        let item_url_enabled = items_list[item].url_enabled;

        let item_json = {
            "uuid": item_uuid,
            "icon": item_icon,
            "text": item_text,
            "url": item_url,
            "url_enabled": item_url_enabled
        }

        card_json["information"]["items"].push(item_json);
    }

    return card_json;
}

function editor_load_from_json(json) {
    // Sets up all the buttons based on the json

    json = JSON.parse(json);

    document.querySelector("#editor_header_name_text_cardname").innerText = json["name"];
    document.querySelector("#editor_main_settings_details_username").value = json["details"]["username"];
    document.querySelector("#editor_main_settings_details_pronouns").value = json["details"]["pronouns"];

    for (const item in json["information"]["items"]) {
        let uuid = json["information"]["items"][item]["uuid"];
        let text = json["information"]["items"][item]["text"];
        let icon = json["information"]["items"][item]["icon"];
        let url = json["information"]["items"][item]["url"];
        let url_enabled = json["information"]["items"][item]["url_enabled"];

        window.dispatchEvent(new CustomEvent('createItem', {
            detail: { uuid, text, icon, url, url_enabled }
        }));
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

window.addEventListener('itemData', (event) => {
    const { items } = event.detail;
    items_list = items;
});