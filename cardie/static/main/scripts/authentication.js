var state = "signin";

function update_state() {
    if (state == "signin") {
        state = "createaccount";

        document.querySelector("#signin-box").style.display = "none";
        document.querySelector("#createaccount-box").style.display = "flex";

    } else if (state == "createaccount") {
        state = "signin";

        document.querySelector("#createaccount-box").style.display = "none";
        document.querySelector("#signin-box").style.display = "flex";
    }

    console.log(state);
}

document.querySelector("#signin-createaccount").addEventListener("click", update_state);
document.querySelector("#createaccount-signin").addEventListener("click", update_state);