// Makes every .card_card element flip on click

var cards = document.getElementsByClassName("card_card");

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function() {
        cards[i].classList.toggle("card_flipped");
    });
}

// Functions for adding elements to the card
function card_delete_items(card_selector) {
    document.querySelector(`${card_selector} .card_items`).replaceChildren();
}

function card_create_text_item(card_selector, uuid, icon, text) {
    let div = document.createElement("div");
    div.classList.add("card_item_text");
    div.setAttribute("uuid", uuid)

    let icon_element = document.createElement("i");
    icon_element.className = `ph-bold ${icon}`;

    let text_element = document.createElement("p");
    text_element.innerText = text;

    div.appendChild(icon_element);
    div.appendChild(text_element);

    document.querySelector(`${card_selector} .card_items`).appendChild(div);
}

function card_create_link_item(card_selector, uuid, icon, text, url) {
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

    document.querySelector(`${card_selector} .card_items`).appendChild(div);
}

function card_render_from_json(card_selector, json) {
    // Renders the contents of the card from the json

    json = JSON.parse(json);
    card_delete_items(card_selector);

    document.querySelector(`${card_selector} .card_top_text_username`).innerText = json["details"]["username"];
    document.querySelector(`${card_selector} .card_top_text_pronouns`).innerText = json["details"]["pronouns"];

    for (const item in json["information"]["items"]) {
        if (json["information"]["items"][item]["url_enabled"]) {
            card_create_link_item(card_selector, json["information"]["items"][item]["uuid"], json["information"]["items"][item]["icon"], json["information"]["items"][item]["text"], json["information"]["items"][item]["url"]);
        
        } else {
            card_create_text_item(card_selector, json["information"]["items"][item]["uuid"], json["information"]["items"][item]["icon"], json["information"]["items"][item]["text"]);
        }
    }
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