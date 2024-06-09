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