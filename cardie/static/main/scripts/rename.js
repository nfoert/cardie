function show_rename() { 
    show_background_blur();

    document.querySelector("#editor_rename").style.display = "flex";
    document.querySelector("#editor_rename").classList.remove("hide-rename");
    document.querySelector("#editor_rename").classList.add("show-rename");
}

function hide_rename() {
    document.querySelector("#editor_rename").classList.add("hide-rename");

    setTimeout(function() {
        document.querySelector("#editor_rename").classList.remove("show-rename");
        document.querySelector("#editor_rename").style.display = "none";

        hide_background_blur();
    }, 500);
}