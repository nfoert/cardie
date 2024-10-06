// Makes every .card_card element flip on click

const cards = document.getElementsByClassName("card_card");
let card_items = [];

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", () => {
        cards[i].classList.toggle("card_flipped");
    });
}

const card_i_style = document.createElement("style");
card_i_style.type = "text/css";
document.getElementsByTagName("head")[0].appendChild(card_i_style);

const card_p_style = document.createElement("style");
card_p_style.type = "text/css";
document.getElementsByTagName("head")[0].appendChild(card_p_style);

// Functions for adding elements to the card
function card_delete_items(card_selector) {
    card_items = [];
    get_or_throw(`${card_selector} .card_items`).replaceChildren();
    get_or_throw("#dialog_card_menu_items").replaceChildren();
}

function card_create_text_item(card_selector, uuid, icon, text) {
    let existing_selector = card_items.find(
        (entry) => entry.selector === card_selector,
    );
    if (existing_selector) {
        existing_selector.items.push({ uuid: uuid, text: text });
    } else {
        card_items.push({
            selector: card_selector,
            items: [{ uuid: uuid, text: text }],
        });
        existing_selector = { items: [] };
    }

    const div = document.createElement("div");
    div.classList.add("card_item_text");
    div.setAttribute("uuid", uuid);

    const icon_element = document.createElement("i");
    icon_element.className = `ph-bold ${icon}`;

    const text_element = document.createElement("p");
    text_element.innerText = text;

    div.appendChild(icon_element);
    div.appendChild(text_element);

    if (existing_selector.items.length <= 7) {
        get_or_throw(`${card_selector} .card_items`).appendChild(div);
    } else {
        if (!document.querySelector("#dialog_card_menu_button")) {
            const menu_button = document.createElement("button");
            menu_button.id = "dialog_card_menu_button";
            menu_button.innerHTML = `<i class="ph-bold ph-list"></i> View more items...`;

            menu_button.addEventListener("click", (event) => {
                event.stopPropagation();
                get_or_throw("#dialog_card_menu").showModal();
            });

            get_or_throw(`${card_selector} .card_items`).appendChild(
                menu_button,
            );
        }

        get_or_throw("#dialog_card_menu_items").appendChild(div);
    }
}

function card_create_link_item(card_selector, uuid, icon, text, url) {
    let existing_selector = card_items.find(
        (entry) => entry.selector === card_selector,
    );
    if (existing_selector) {
        existing_selector.items.push({ uuid: uuid, text: text });
    } else {
        card_items.push({
            selector: card_selector,
            items: [{ uuid: uuid, text: text }],
        });
        existing_selector = { items: [] };
    }

    const div = document.createElement("div");
    div.classList.add("card_item_link");
    div.setAttribute("uuid", uuid);

    const icon_element = document.createElement("i");
    icon_element.className = `ph-bold ${icon}`;

    const button_element = document.createElement("button");
    button_element.innerText = text;

    button_element.addEventListener("click", (event) => {
        event.stopPropagation();
        window.location.href = url;
    });

    div.appendChild(icon_element);
    div.appendChild(button_element);

    if (existing_selector.items.length <= 7) {
        get_or_throw(`${card_selector} .card_items`).appendChild(div);
    } else {
        if (!document.querySelector("#dialog_card_menu_button")) {
            const menu_button = document.createElement("button");
            menu_button.id = "dialog_card_menu_button";
            menu_button.innerHTML = `<i class="ph-bold ph-list"></i> View more items...`;

            menu_button.addEventListener("click", (event) => {
                event.stopPropagation();
                get_or_throw("#dialog_card_menu").showModal();
            });

            get_or_throw(`${card_selector} .card_items`).appendChild(
                menu_button,
            );
        }

        get_or_throw("#dialog_card_menu_items").appendChild(div);
    }
}

function card_set_colors(card_selector, background, accent, text) {
    get_or_throw(`${card_selector} .card_card_front`).style.backgroundColor =
        background;
    get_or_throw(`${card_selector} .card_card_back`).style.backgroundColor =
        background;

    card_i_style.innerHTML = `${card_selector} i { color: ${accent} }`;
    card_p_style.innerHTML = `${card_selector} p { color: ${text} }`;
}

function card_render_from_json(card_selector, json) {
    // Renders the contents of the card from the json

    const parsed_json = JSON.parse(json);
    card_delete_items(card_selector);

    get_or_throw(`${card_selector} .card_top_text_username`).innerText =
        // biome-ignore lint/complexity/useLiteralKeys: <explanation>
        parsed_json["details"]["primary"];
    get_or_throw(`${card_selector} .card_top_text_pronouns`).innerText =
        // biome-ignore lint/complexity/useLiteralKeys: <explanation>
        parsed_json["details"]["secondary"];

    card_set_colors(
        card_selector,
        // biome-ignore lint/complexity/useLiteralKeys: <explanation>
        parsed_json["colors"]["background"],
        // biome-ignore lint/complexity/useLiteralKeys: <explanation>
        parsed_json["colors"]["accent"],
        // biome-ignore lint/complexity/useLiteralKeys: <explanation>
        parsed_json["colors"]["text"],
    );
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    card_set_layout(card_selector, parsed_json["layout"]);
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    card_set_font(card_selector, parsed_json["font_style"]);

    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    for (const item in parsed_json["information"]["items"]) {
        // biome-ignore lint/complexity/useLiteralKeys: <explanation>
        if (parsed_json["information"]["items"][item]["url_enabled"]) {
            card_create_link_item(
                card_selector,
                // biome-ignore lint/complexity/useLiteralKeys: <explanation>
                parsed_json["information"]["items"][item]["uuid"],
                // biome-ignore lint/complexity/useLiteralKeys: <explanation>
                parsed_json["information"]["items"][item]["icon"],
                // biome-ignore lint/complexity/useLiteralKeys: <explanation>
                parsed_json["information"]["items"][item]["text"],
                // biome-ignore lint/complexity/useLiteralKeys: <explanation>
                parsed_json["information"]["items"][item]["url"],
            );
        } else {
            card_create_text_item(
                card_selector,
                // biome-ignore lint/complexity/useLiteralKeys: <explanation>
                parsed_json["information"]["items"][item]["uuid"],
                // biome-ignore lint/complexity/useLiteralKeys: <explanation>
                parsed_json["information"]["items"][item]["icon"],
                // biome-ignore lint/complexity/useLiteralKeys: <explanation>
                parsed_json["information"]["items"][item]["text"],
            );
        }
    }
}

const ALLOWED_LAYOUTS = ["left", "right", "center", ""];
function card_set_layout(card_selector, layout) {
    // layout can be "left", "right", "center"
    const card = get_or_throw(`${card_selector} .card_card_front`);
    if (!ALLOWED_LAYOUTS.includes(layout)) {
        log("WARNING", "The card layout parameter is not an accepted value");
        throw new Error("The card layout parameter is not an accepted value");
    }
    card.setAttribute("card-align", layout === "" ? "left" : layout);
}

function card_set_font(card_selector, name) {
    let font_style = get_font_style(name);
    if (!font_style) {
        throw new Error("The font style does not exist");
    }
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    load_font(font_style["header"]["name"], font_style["header"]["url"]);
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    load_font(font_style["text"]["name"], font_style["text"]["url"]);

    const primary_top = get_or_throw(
        `${card_selector} .card_top_text_username`,
    );
    const secondary_top = get_or_throw(
        `${card_selector} .card_top_text_pronouns`,
    );
    const items = get_or_throw(`${card_selector} .card_items`);

    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    primary_top.style.fontFamily = font_style["header"]["name"];
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    secondary_top.style.fontFamily = font_style["text"]["name"];
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    items.style.fontFamily = font_style["text"]["name"];

    font_style = name;
}

// NOTE(@ar4s): I think that behaviour can achieved by using only CSS
for (let i = 0; i < cards.length; i++) {
    const outer = cards[i];
    const maxWidth = outer.clientWidth;
    const maxHeight = outer.clientHeight;

    window.addEventListener("resize", resize);

    resize();

    function resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isMax = width >= maxWidth && height >= maxHeight;
        const scale = Math.min(width / maxWidth, height / maxHeight);

        // @ts-ignore
        outer.style.transform = isMax ? "" : `scale(${scale})`;
    }
}

window.addEventListener("setFontOnCard", (event) => {
    // Called when a font item is clicked in the editor
    event.stopImmediatePropagation();
    // @ts-ignore
    const { header, text, style_name } = event.detail;
    card_set_font(".card_card", style_name);
    font_style = style_name;
});

get_or_throw(
    "#dialog_card_menu > .ui_dialog_generic_top > .ui_dialog_generic_top_close",
).addEventListener("click", (event) => {
    get_or_throw("#dialog_card_menu").close();
});
