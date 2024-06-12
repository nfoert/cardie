// It starts at one... this feels wrong...
var text_items = new Array();
var link_items = new Array();
var currently_editing_icon;

function create_text_item(id, text, icon) {
    text_item = document.createElement("div");
    text_item.classList.add("text_item");
    text_item.setAttribute("uuid", id);

    text_item_icon = document.createElement("button");
    text_item_icon.className = "ui_button_small text_item_icon";
    text_item_icon.innerHTML = `<i class="ph-bold ${icon}"></i> Icon`
    text_item_icon.addEventListener("click", open_iconselector_foritem);

    text_item_text = document.createElement("input");
    text_item_text.type = "text";
    text_item_text.placeholder = "Text";
    text_item_text.className = "ui_input_generic text_item_text";
    text_item_text.value = text;

    text_item_delete = document.createElement("button");
    text_item_delete.className = "ui_button_smallicon text_item_delete";
    text_item_delete.addEventListener("click", delete_item);

    text_item_delete_icon = document.createElement("i");
    text_item_delete_icon.className = "ph-bold ph-trash";
    text_item_delete.appendChild(text_item_delete_icon);

    text_item.appendChild(text_item_icon);
    text_item.appendChild(text_item_text);
    text_item.appendChild(text_item_delete);

    document.querySelector("#editor_main_settings_information_text_items").appendChild(text_item);
    text_items.push(text_item);
}

function create_link_item(id, text, link, icon) {
    link_item = document.createElement("div");
    link_item.classList.add("link_item");
    link_item.setAttribute("uuid", id);

    link_item_icon = document.createElement("button");
    link_item_icon.className = "ui_button_small link_item_icon";
    link_item_icon.innerHTML = `<i class="ph-bold ${icon}"></i> Icon`
    link_item_icon.addEventListener("click", open_iconselector_foritem);

    link_item_text = document.createElement("input");
    link_item_text.type = "text";
    link_item_text.placeholder = "Text";
    link_item_text.className = "ui_input_generic link_item_text";
    link_item_text.value = text;

    link_item_url = document.createElement("input");
    link_item_url.type = "text";
    link_item_url.placeholder = "URL";
    link_item_url.className = "ui_input_generic link_item_url";
    link_item_url.value = link;

    link_item_delete = document.createElement("button");
    link_item_delete.className = "ui_button_smallicon link_item_delete";
    link_item_delete.addEventListener("click", delete_item);

    link_item_delete_icon = document.createElement("i");
    link_item_delete_icon.className = "ph-bold ph-trash";
    link_item_delete.appendChild(link_item_delete_icon);

    link_item.appendChild(link_item_icon);
    link_item.appendChild(link_item_url);
    link_item.appendChild(link_item_text);
    link_item.appendChild(link_item_delete);

    document.querySelector("#editor_main_settings_information_link_items").appendChild(link_item);
    link_items.push(link_item);
}

function delete_item(event) {
    let item = event.target.closest(".link_item, .text_item");

    if (item.className == "text_item") {
        const index = text_items.indexOf(item);
        if (index > -1) {
            text_items.splice(index, 1);
        }

    } else if (item.className == "link_item") {
        const index = link_items.indexOf(item);
        if (index > -1) {
            link_items.splice(index, 1);
        }
    }

    item.remove();
}

function open_iconselector_foritem(event) {
    let item = event.target.closest(".link_item, .text_item");
    currently_editing_icon = item;
    show_iconselector();
}

function render_card() {
    // TODO: What if there's more than one card on the page?

    document.querySelector(".card_top_text_username").innerText = document.querySelector("#editor_main_settings_details_username").value;
    document.querySelector(".card_top_text_pronouns").innerText = document.querySelector("#editor_main_settings_details_pronouns").value;

    card_delete_items();

    for (const item in text_items) {
        let item_uuid = text_items[item].getAttribute("uuid");
        let item_icon = text_items[item].querySelector(":scope > .text_item_icon > i").className.replace("ph-bold ", "");
        let item_text = text_items[item].querySelector(":scope > .text_item_text").value;

        card_create_text_item(item_uuid, item_icon, item_text);
    }

    for (const link in link_items) {
        let item_uuid = link_items[link].getAttribute("uuid");
        let item_icon = link_items[link].querySelector(":scope > .link_item_icon > i").className.replace("ph-bold ", "");
        let item_text = link_items[link].querySelector(":scope > .link_item_text").value;
        let item_url = link_items[link].querySelector(":scope > .link_item_url").value;

        card_create_link_item(item_uuid, item_icon, item_text, item_url);
    }
}

function render_card_from_json(json) {
    console.log("Render card from json");
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
        create_text_item(
            json["information"]["items"]["links"][item]["uuid"],
            json["information"]["items"]["links"][item]["text"],
            json["information"]["items"]["links"][item]["url"],
            json["information"]["items"]["links"][item]["icon"]
        )
    }

    render_card();
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

document.querySelector("#editor_main_settings_information_text_add").addEventListener("click", (event) => {
    if (text_items.length == 0) {
        create_text_item(0, "", "ph-star");

    } else {
        create_text_item(parseInt(text_items.slice(-1)[0].getAttribute("uuid")) + 1, "", "ph-star")
    }
});

document.querySelector("#editor_main_settings_information_link_add").addEventListener("click", (event) => {
    if (link_items.length == 0) {
        create_link_item(0, "", "", "ph-star")

    } else {
        create_link_item(parseInt(link_items.slice(-1)[0].getAttribute("uuid")) + 1, "", "", "ph-star")
    }
});