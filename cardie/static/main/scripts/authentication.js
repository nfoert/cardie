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
}

async function sign_in() {
    var username = document.querySelector("#signin-username").value;
    var password = document.querySelector("#signin-password").value;

    const response = await fetch(server_ip + "/auth/signin", {
        method: "GET",
        headers: {
            "X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
            "Username": username,
            "Password": password,
        }
    });

    response.text().then(function (text) {
        console.log("request done!")
        console.log(text)
    });
}

async function create_account() {
    var username = document.querySelector("#createaccount-username").value;
    var password = document.querySelector("#createaccount-password").value;
    var email = document.querySelector("#createaccount-password").value;
}

document.querySelector("#signin-createaccount").addEventListener("click", update_state);
document.querySelector("#createaccount-signin").addEventListener("click", update_state);

document.querySelector("#signin-signin").addEventListener("click", sign_in);
document.querySelector("#createaccount-createaccount").addEventListener("click", create_account);