function get_blur_element() {
    /**
     * @constant
     * @type {HTMLElement | null}
     */
    const blurElement = document.querySelector(".background_blur");
    if (!blurElement) {
        throw new Error("Could not find background blur element");
    }
    return blurElement;
}

function show_background_blur() {
    /**
     * @constant
     * @type {HTMLElement | null}
     */
    const blurElement = get_blur_element();
    blurElement.style.display = "flex";

    setTimeout(() => {
        blurElement.classList.add("show");
    }, 10);
}

function hide_background_blur() {
    // TODO: This doesn't seem to animate correctly
    const blurElement = get_blur_element();
    blurElement.classList.remove("show");
    setTimeout(() => {
        blurElement.style.display = "none";
    }, 500);
}
