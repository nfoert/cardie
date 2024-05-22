// TODO: Support {{ server_url }}
let icons_url = "http://127.0.0.1:8000/iconlist";

function create_icon(icon) {
    let div_element = document.createElement("div");
    div_element.classList.add("editor-iconselector-icon");
    div_element.setAttribute("icon", icon);

    icon_element = document.createElement("i");
    icon_element.classList.add("editor-iconselector-icon-icon");
    icon_element.classList.add("ph-bold");
    icon_element.classList.add("ph-" + icon);

    text_element = document.createElement("p");
    text_element.classList.add("editor-iconselector-icon-text");
    text_element.innerText = icon;

    div_element.appendChild(icon_element);
    div_element.appendChild(text_element);

    document.querySelector("#editor-iconselector-icons").appendChild(div_element)
}

function render_icons() {
    
}

async function fetch_icon_list() {
    response = await fetch(icons_url);
    const text = await response.text();
    render_icons(text);
}

fetch_icon_list();