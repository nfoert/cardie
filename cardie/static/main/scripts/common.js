function get_or_throw(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Could not find element with selector "${selector}"`);
    }
    return element;
}
