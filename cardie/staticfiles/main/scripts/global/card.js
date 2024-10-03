// Makes every .card_card element flip on click

var cards = document.getElementsByClassName("card_card");
var card_items = [];

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function() {
        cards[i].classList.toggle("card_flipped");
    });
}

var card_i_style = document.createElement('style');
card_i_style.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(card_i_style);

var card_p_style = document.createElement('style');
card_p_style.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(card_p_style);

// Functions for adding elements to the card
function card_delete_items(card_selector) {
    card_items = []
    document.querySelector(`${card_selector} .card_items`).replaceChildren();
    document.querySelector(`#dialog_card_menu_items`).replaceChildren();
}

function card_create_text_item(card_selector, uuid, icon, text) {
    let existing_selector = card_items.find(entry => entry.selector === card_selector);
    console.log(card_selector, existing_selector, card_items)
    if (existing_selector) {
        existing_selector.items.push({"uuid": uuid, "text": text});
    } else {
        card_items.push({selector: card_selector, items: [{"uuid": uuid, "text": text}]});
        existing_selector = {items: []};
    }

    let div = document.createElement("div");
    div.classList.add("card_item_text");
    div.setAttribute("uuid", uuid)

    let icon_element = document.createElement("i");
    icon_element.className = `ph-bold ${icon}`;

    let text_element = document.createElement("p");
    text_element.innerText = text;

    div.appendChild(icon_element);
    div.appendChild(text_element);

    if (existing_selector.items.length <= 8) {
        document.querySelector(`${card_selector} .card_items`).appendChild(div);

    } else {
        if (!(document.querySelector("#dialog_card_menu_button"))) {
            let menu_button = document.createElement("button")
            menu_button.classList.add("ui_button_small");
            menu_button.id = "dialog_card_menu_button";
            menu_button.innerHTML = `<i class="ph-bold ph-list"></i> View more items...`;

            menu_button.addEventListener("click", function() {
                event.stopPropagation();
                document.querySelector("#dialog_card_menu").showModal();
            });

            document.querySelector(`${card_selector} .card_items`).appendChild(menu_button);
        }
        
        document.querySelector(`#dialog_card_menu_items`).appendChild(div);
    }
}

function card_create_link_item(card_selector, uuid, icon, text, url) {
    let existing_selector = card_items.find(entry => entry.selector === card_selector);
    if (existing_selector) {
        existing_selector.items.push({"uuid": uuid, "text": text});
    } else {
        card_items.push({selector: card_selector, items: [{"uuid": uuid, "text": text}]});
        existing_selector = {items: []};
    }

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

    if (existing_selector.items.length <= 8) {
        document.querySelector(`${card_selector} .card_items`).appendChild(div);

    } else {
        if (!(document.querySelector("#dialog_card_menu_button"))) {
            let menu_button = document.createElement("button")
            menu_button.classList.add("ui_button_small");
            menu_button.id = "dialog_card_menu_button";
            menu_button.innerHTML = `<i class="ph-bold ph-list"></i> View more items...`;

            menu_button.addEventListener("click", function() {
                event.stopPropagation();
                document.querySelector("#dialog_card_menu").showModal();
            });

            document.querySelector(`${card_selector} .card_items`).appendChild(menu_button);
        }
        
        document.querySelector(`#dialog_card_menu_items`).appendChild(div);
    }
}

function card_set_colors(card_selector, background, accent, text) {
    document.querySelector(`${card_selector} .card_card_front`).style.backgroundColor = background;
    document.querySelector(`${card_selector} .card_card_back`).style.backgroundColor = background;

    card_i_style.innerHTML = `${card_selector} i { color: ${accent} }`;
    card_p_style.innerHTML = `${card_selector} p { color: ${text} }`;
}

function card_render_from_json(card_selector, json) {
    // Renders the contents of the card from the json

    json = JSON.parse(json);
    card_delete_items(card_selector);

    document.querySelector(`${card_selector} .card_top_text_username`).innerText = json["details"]["primary"];
    document.querySelector(`${card_selector} .card_top_text_pronouns`).innerText = json["details"]["secondary"];

    card_set_colors(card_selector, json["colors"]["background"], json["colors"]["accent"], json["colors"]["text"])
    card_set_layout(card_selector, json["layout"]);
    card_set_font(card_selector, json["font_style"]);

    for (const item in json["information"]["items"]) {
        if (json["information"]["items"][item]["url_enabled"]) {
            card_create_link_item(card_selector, json["information"]["items"][item]["uuid"], json["information"]["items"][item]["icon"], json["information"]["items"][item]["text"], json["information"]["items"][item]["url"]);
        
        } else {
            card_create_text_item(card_selector, json["information"]["items"][item]["uuid"], json["information"]["items"][item]["icon"], json["information"]["items"][item]["text"]);
        }
    }
}

function card_set_layout(card_selector, layout) {
    // layout can be "left", "right", "center"
    let card = document.querySelector(`${card_selector} .card_card_front`);

    if (layout == "left") {
        card.setAttribute("card-align", "left");

    } else if (layout == "right") {
        card.setAttribute("card-align", "right");

    } else if (layout == "center") {
        card.setAttribute("card-align", "center")

    } else if (layout == "") { // Default value in databases
        card.setAttribute("card-align", "left");

    } else {
        log("WARNING", "The card layout parameter is not an accepted value");
    }
}

function card_set_font(card_selector, name) {
    let font_style = get_font_style(name);
    load_font(font_style["header"]["name"], font_style["header"]["url"]);
    load_font(font_style["text"]["name"], font_style["text"]["url"]);

    let primary_top = document.querySelector(`${card_selector} .card_top_text_username`);
    let secondary_top = document.querySelector(`${card_selector} .card_top_text_pronouns`);
    let items = document.querySelector(`${card_selector} .card_items`);

    primary_top.style.fontFamily = font_style["header"]["name"];
    secondary_top.style.fontFamily = font_style["text"]["name"];
    items.style.fontFamily = font_style["text"]["name"];

    font_style = name;
}

for (let i = 0; i < cards.length; i++) {
    let outer = cards[i],
    maxWidth = outer.clientWidth,
    maxHeight = outer.clientHeight;

    window.addEventListener("resize", resize);

    resize();

    function resize() {
        let scale,
        width = window.innerWidth,
        height = window.innerHeight,
        isMax = width >= maxWidth && height >= maxHeight;

        scale = Math.min(width / maxWidth, height / maxHeight);
        outer.style.transform = isMax ? '' : 'scale(' + scale + ')';
    }
}

window.addEventListener('setFontOnCard', (event) => { // Called when a font item is clicked in the editor
    event.stopImmediatePropagation();
    const { header, text, style_name } = event.detail;
    card_set_font(".card_card", header, text);
    font_style = style_name;
});

document.querySelector("#dialog_card_menu > .ui_dialog_generic_top > .ui_dialog_generic_top_close").addEventListener("click", (event) => {
    document.querySelector("#dialog_card_menu").close();
});