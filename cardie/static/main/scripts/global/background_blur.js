function show_background_blur() { 
    document.querySelector(".background_blur").style.display = "flex";

    setTimeout(function() {
        document.querySelector(".background_blur").classList.add("show");
    }, 10);
}

function hide_background_blur() {
    // TODO: This doesn't seem to animate correctly
    document.querySelector(".background_blur").classList.remove("show");

    setTimeout(function() {
        document.querySelector(".background_blur").style.display = "none";
    }, 500);
}