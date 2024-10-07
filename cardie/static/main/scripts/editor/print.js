let print_single = false;

get_or_throw("#editor_share_print").addEventListener("click", (event) => {
    get_or_throw("#dialog_print").showModal();
});

get_or_throw(
    "#dialog_print > .ui_dialog_generic_top > .ui_dialog_generic_top_close",
).addEventListener("click", (event) => {
    get_or_throw("#dialog_print").close();
});

get_or_throw("#dialog_print_single").addEventListener("click", (event) => {
    print_single = true;
});

get_or_throw("#dialog_print_double").addEventListener("click", (event) => {
    print_single = false;
});

get_or_throw("#dialog_print_print").addEventListener("click", (event) => {
    log("INFO", "Opening print dialog");
    window.print();
});

window.addEventListener("beforeprint", (event) => {
    log("INFO", "Preparing DOM for printing");

    if (print_single) {
        for (let card = 0; card < 3; card++) {
            const new_card = get_or_throw(".card_card").cloneNode(true);
            new_card.classList.add("print-card");
            get_or_throw("#editor_main_preview").appendChild(new_card);
        }
    } else {
        const front_div = document.createElement("div");
        front_div.classList.add("print-div");
        front_div.id = "print_front_div";

        const back_div = document.createElement("div");
        back_div.classList.add("print-div");
        back_div.id = "print_back_div";

        get_or_throw("#editor_main_preview").appendChild(front_div);
        get_or_throw("#editor_main_preview").appendChild(back_div);

        for (let card = 0; card < 8; card++) {
            const card_front = get_or_throw(
                ".card_card > .card_card_front",
            ).cloneNode(true);
            card_front.classList.add("print-card");
            get_or_throw("#print_front_div").appendChild(card_front);
        }

        for (let card = 0; card < 8; card++) {
            const card_back = get_or_throw(
                ".card_card > .card_card_back",
            ).cloneNode(true);
            card_back.classList.add("print-card");
            get_or_throw("#print_back_div").appendChild(card_back);
        }

        get_or_throw(".card_card").style.display = "none";
        get_or_throw("#editor_main_preview").classList.add("twosided");
    }
});

window.addEventListener("afterprint", (event) => {
    log("INFO", "Cleaning up DOM after printing");

    get_or_throw("#editor_main_preview").classList.remove("twosided");
    get_or_throw(".card_card").style.display = "block";

    const cards = document.querySelectorAll(".print-card");

    // TODO: Throws an exception but still works
    try {
        for (const card in cards) {
            cards[card].remove();
        }
    } catch {
        null;
    }

    try {
        const divs = document.querySelectorAll(".print-div");

        // TODO: Throws an exception but still works
        for (const div in divs) {
            divs[div].remove();
        }
    } catch {
        null;
    }
});
