document.querySelector("#editor_share_print").addEventListener("click", (event) => {
    document.querySelector("#dialog_print").showModal()
});

document.querySelector("#dialog_print > .ui_dialog_generic_top > .ui_dialog_generic_top_close").addEventListener("click", (event) => {
    document.querySelector("#dialog_print").close();
});