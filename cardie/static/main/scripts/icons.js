// TODO: Support {{ server_url }}
let icons_url = "http://127.0.0.1:8000/iconlist";

async function fetch_icon_list() {
    response = await fetch(icons_url)

    const text = await response.text();
    console.log(text)
}

fetch_icon_list();