// TODO: Support {{ server_url }}
const icons_url = "http://127.0.0.1:8000/iconlist";
const itemsData = []; // Array to store item data
let icon_selected_item;

function create_icon(icon) {
    const div_element = document.createElement("div");
    div_element.classList.add("editor-iconselector-icon");
    div_element.setAttribute("icon", icon);

    const icon_element = document.createElement("i");
    icon_element.className = "editor-iconselector-icon-icon ph-bold";
    icon_element.classList.add(`ph-${icon}`);

    const text_element = document.createElement("p");
    text_element.classList.add("editor-iconselector-icon-text");
    text_element.innerText = icon;

    div_element.appendChild(icon_element);
    div_element.appendChild(text_element);
    div_element.addEventListener("click", icon_clicked);

    itemsData.push(div_element);

    get_or_throw("#editor-iconselector-icons").appendChild(div_element);
}

function render_icons(icons) {
    icons = JSON.parse(icons);
    for (const icon in icons) {
        create_icon(icons[icon]);
    }
}

async function fetch_icon_list() {
    const response = await fetch(icons_url);
    const text = await response.text();
    render_icons(text);
}

document.addEventListener("DOMContentLoaded", (event) => {
    fetch_icon_list();
});

// Function to render items
const renderItems = (filteredItems) => {
    get_or_throw("#editor-iconselector-icons").innerHTML = "";
    // biome-ignore lint/complexity/noForEach: <explanation>
    filteredItems.forEach((item) =>
        get_or_throw("#editor-iconselector-icons").appendChild(item),
    );
};

// Function to sort items alphabetically by the icon attribute
const sortItems = (items) => {
    return items.sort((a, b) =>
        a.getAttribute("icon").localeCompare(b.getAttribute("icon")),
    );
};

// Function to filter items based on search query
const filterItems = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    return itemsData.filter((item) =>
        item.getAttribute("icon").toLowerCase().includes(lowerCaseQuery),
    );
};

// Event listener for the search box
get_or_throw("#editor-iconselector-top-search").addEventListener(
    "input",
    (e) => {
        const query = e.target.value;
        const filteredItems = filterItems(query);
        const sortedItems = sortItems(filteredItems);
        renderItems(sortedItems);
    },
);

function show_iconselector(item) {
    icon_selected_item = item;
    show_background_blur();

    get_or_throw("#editor-iconselector").style.display = "flex";
    get_or_throw("#editor-iconselector").classList.remove("hide-iconselector");
    get_or_throw("#editor-iconselector").classList.add("show-iconselector");
}

function hide_iconselector() {
    get_or_throw("#editor-iconselector").classList.add("hide-iconselector");

    setTimeout(() => {
        get_or_throw("#editor-iconselector").classList.remove(
            "show-iconselector",
        );
        get_or_throw("#editor-iconselector").style.display = "none";
        hide_background_blur();
    }, 500);
}

function icon_clicked(event) {
    const icon = event.target
        .closest(".editor-iconselector-icon")
        .getAttribute("icon");
    console.log(icon_selected_item, icon);

    window.dispatchEvent(
        new CustomEvent("iconSelected", {
            detail: { icon_selected_item, icon },
        }),
    );

    hide_iconselector();
}

get_or_throw("#editor-iconselector-top-close").addEventListener(
    "click",
    (event) => {
        hide_iconselector();
    },
);
