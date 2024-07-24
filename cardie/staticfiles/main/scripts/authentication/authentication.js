
function show_warning(warning) {
    document.querySelector("#authentication-error > p").innerText = warning;
    document.querySelector("#authentication-error").style.display = "flex";

    setTimeout(function() {
        document.querySelector("#authentication-error").classList.add("show");
    }, 100);
}

async function sign_in() {
    var username = document.querySelector("#signin-username").value;
    var password = document.querySelector("#signin-password").value;

    const response = await fetch(server_ip + "/auth/signin", {
        method: "GET",
        headers: {
            "X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
            "Internal": true,
            "Username": username,
            "Password": password,
        }
    });

    response.text().then(function (text) {
        if (text == "success") {
            window.location.href = server_ip + "/home";

        } else if (text == "error_missing_headers_and_session") {
            show_warning("Missing headers and no session data!");

        } else if (text == "error_password_wrong") {
            show_warning("Your password is incorrect!");

        } else if (text == "error_no_accounts") {
            show_warning("No accounts match that username!");

        } else if (text == "error_multiple_accounts_exist") {
            show_warning("Multiple accounts exist with that username... that's really not supposed to happen...");

        } else if (text == "error_sign_in_disabled") {
            show_warning("Signing in is disabled on this server");

        } else {
            show_warning("There was a problem signing you in!");
        }
    });
}

async function create_account() {
    var username = document.querySelector("#createaccount-username").value;
    var password = document.querySelector("#createaccount-password").value;
    var email = document.querySelector("#createaccount-email").value;

    const response = await fetch(server_ip + "/auth/createaccount", {
        method: "GET",
        headers: {
            "X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
            "Internal": true,
            "Username": username,
            "Password": password,
            "Email": email,
        }
    });

    response.text().then(function (text) {
        if (text == "success") {
            window.location.href = server_ip + "/home";

        } else if (text == "error_account_already_exists") {
            show_warning("An account with that username already exists!");

        } else if (text == "error_missing_headers") {
            show_warning("There is missing header data!");

        } else if (text == "error_missing_headers_and_session") {
            show_warning("Missing headers and no session data!");

        } else if (text == "error_password_wrong") {
            show_warning("Your password is incorrect!");

        } else if (text == "error_no_accounts") {
            show_warning("No accounts match that username!");

        } else if (text == "error_multiple_accounts_exist") {
            show_warning("Multiple accounts exist with that username... that's really not supposed to happen...");

        } else if (text == "error_create_account_disabled") {
            show_warning("Creating accounts is disabled on this server")
        
        } else {
            show_warning("There was a problem creating your account!");
        }
    });
}

document.querySelector("#signin-signin").addEventListener("click", sign_in);
document.querySelector("#createaccount-createaccount").addEventListener("click", create_account);

document.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
        if (document.querySelector("#signin-box").style.display != "none") {
            sign_in();
            
        } else {
            create_account();
        }
    }
}, false);