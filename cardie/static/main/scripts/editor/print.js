var print_single = false;

document.querySelector("#editor_share_print").addEventListener("click", (event) => {
    document.querySelector("#dialog_print").showModal()
});

document.querySelector("#dialog_print > .ui_dialog_generic_top > .ui_dialog_generic_top_close").addEventListener("click", (event) => {
    document.querySelector("#dialog_print").close();
});

document.querySelector("#dialog_print_single").addEventListener("click", (event) => {
    print_single = true;
});

document.querySelector("#dialog_print_double").addEventListener("click", (event) => {
    print_single = false;
});

document.querySelector("#dialog_print_print").addEventListener("click", (event) => {
    log("INFO", "Opening print dialog");
    window.print();
});

window.addEventListener("beforeprint", (event) => {
    log("INFO", "Preparing DOM for printing");

    if (print_single) {
        for (let card = 0; card < 3; card++) {
            let new_card = document.querySelector(".card_card").cloneNode(true);
            new_card.classList.add("print-card");
            document.querySelector("#editor_main_preview").appendChild(new_card);
        }

    } else {
        let front_div = document.createElement("div");
        front_div.classList.add("print-div");
        front_div.id = "print_front_div";

        let back_div = document.createElement("div");
        back_div.classList.add("print-div");
        back_div.id = "print_back_div";

        document.querySelector("#editor_main_preview").appendChild(front_div);
        document.querySelector("#editor_main_preview").appendChild(back_div);

        for (let card = 0; card < 8; card++) {
            let card_front = document.querySelector(".card_card > .card_card_front").cloneNode(true);
            card_front.classList.add("print-card");
            document.querySelector("#print_front_div").appendChild(card_front);
        }

        for (let card = 0; card < 8; card++) {
            let card_back = document.querySelector(".card_card > .card_card_back").cloneNode(true);
            card_back.classList.add("print-card");
            document.querySelector("#print_back_div").appendChild(card_back);
        }

        document.querySelector(".card_card").style.display = "none";
        document.querySelector("#editor_main_preview").classList.add("twosided");
    }
});

window.addEventListener("afterprint", (event) => {
    log("INFO", "Cleaning up DOM after printing");

    document.querySelector("#editor_main_preview").classList.remove("twosided")
    document.querySelector(".card_card").style.display = "block";

    let cards = document.querySelectorAll(".print-card");

    // TODO: Throws an exception but still works
    try {
        for (const card in cards) {
            cards[card].remove();
        }
    } catch {
        null;
    }
    
    try {
        let divs = document.querySelectorAll(".print-div");

        // TODO: Throws an exception but still works
        for (const div in divs) {
            divs[div].remove();
        }
    } catch {
        null;
    }
});