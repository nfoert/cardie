function show_rename() {
    show_background_blur();

    document.querySelector("#editor_rename").style.display = "flex";
    document.querySelector("#editor_rename").classList.remove("hide-rename");
    document.querySelector("#editor_rename").classList.add("show-rename");
}

function hide_rename() {
    document.querySelector("#editor_rename").classList.add("hide-rename");

    setTimeout(() => {
        document
            .querySelector("#editor_rename")
            .classList.remove("show-rename");
        document.querySelector("#editor_rename").style.display = "none";

        hide_background_blur();
    }, 500);
}

function rename_card() {
    const card_name = document.querySelector("#editor_rename_input").value;

    document.querySelector("#editor_header_name_text_cardname").innerText =
        card_name;
    hide_rename();
}

document
    .querySelector("#editor_rename_top_close")
    .addEventListener("click", (event) => {
        hide_rename();
    });

document
    .querySelector("#editor_rename_submit")
    .addEventListener("click", (event) => {
        rename_card();
    });

document
    .querySelector("#editor_header_name_button")
    .addEventListener("click", (event) => {
        show_rename();
    });
