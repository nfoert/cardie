try {
    var temp_uuid = new URL(window.location.href).searchParams.get("temp_uuid");

} catch {
    var temp_uuid = false;
}

function show_warning(warning) {
    log("WARNING", warning)
    document.querySelector("#authentication-error > p").innerText = warning;
    document.querySelector("#authentication-error").style.display = "flex";

    setTimeout(function() {
        document.querySelector("#authentication-error").classList.add("show");
    }, 100);
}

async function sign_in() {
    log("INFO", "Signing the user in...");
    var username = document.querySelector("#signin-username").value;
    var password = document.querySelector("#signin-password").value;

    if (temp_uuid) {
        var response = await fetch(server_ip + "/auth/signin", {
            method: "GET",
            headers: {
                "X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
                "Internal": true,
                "Username": username,
                "Password": password,
                "TempUUID": temp_uuid
            }
        });
        
    } else {
        var response = await fetch(server_ip + "/auth/signin", {
            method: "GET",
            headers: {
                "X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
                "Internal": true,
                "Username": username,
                "Password": password
            }
        });
    }

    log("DEBUG", temp_uuid)

    response.text().then(function (text) {
        if (text == "success") {
            log("INFO", "Success!");
            window.location.href = `${server_ip}/home`;

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

        } else if (text.includes("card_added_to_account")) {
            window.location.href = `${server_ip}/editor?uuid=${text.replace("card_added_to_account ", "")}`;
        
        } else {
            show_warning("There was a problem signing you in!");
        }
    });
}

async function create_account() {
    log("INFO", "Creating an account for the user...");
    var username = document.querySelector("#createaccount-username").value;
    var password = document.querySelector("#createaccount-password").value;
    var email = document.querySelector("#createaccount-email").value;

    if (temp_uuid) {
        var response = await fetch(server_ip + "/auth/createaccount", {
            method: "GET",
            headers: {
                "X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
                "Internal": true,
                "Username": username,
                "Password": password,
                "Email": email,
                "TempUUID": temp_uuid
            }
        });
    } else {
        var response = await fetch(server_ip + "/auth/createaccount", {
            method: "GET",
            headers: {
                "X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
                "Internal": true,
                "Username": username,
                "Password": password,
                "Email": email
            }
        });
    }

    response.text().then(function (text) {
        if (text == "success") {
            log("INFO", "Success!");
            window.location.href = `${server_ip}/home`;

        } else if (text == "no_username") {
            show_warning("Your account needs an username!");

        } else if (text == "no_password") {
            show_warning("Your account needs an password!");

        } else if (text == "no_email") {
            show_warning("Your account needs an email!");

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
            show_warning("Creating accounts is disabled on this server");

        } else if (text.includes("card_added_to_account")) {
            window.location.href = `${server_ip}/editor?uuid=${text.replace("card_added_to_account ", "")}`;
        
        } else {
            show_warning("There was a problem creating your account!");
        }

        console.log(text);
    });
}

function check_sign_in() {
    document.querySelector("#signin-signin").disabled = !(
        document.querySelector("#signin-username").value != "" && 
        document.querySelector("#signin-password").value != ""
    );
}

function check_create_account() {
    document.querySelector("#createaccount-createaccount").disabled = !(
        document.querySelector("#createaccount-username").value != "" && 
        document.querySelector("#createaccount-password").value != "" && 
        document.querySelector("#createaccount-email").value != ""
    );
}

document.querySelector("#signin-signin").addEventListener("click", sign_in);
document.querySelector("#createaccount-createaccount").addEventListener("click", create_account);

document.querySelector("#signin-username").addEventListener("input", check_sign_in);
document.querySelector("#signin-password").addEventListener("input", check_sign_in);
document.querySelector("#createaccount-username").addEventListener("input", check_create_account);
document.querySelector("#createaccount-password").addEventListener("input", check_create_account);
document.querySelector("#createaccount-email").addEventListener("input", check_create_account);

document.querySelector("#signin-signin").disabled = true;
document.querySelector("#createaccount-createaccount").disabled = true;

document.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
        if (document.querySelector("#signin-box").style.display != "none") {
            sign_in();
            
        } else {
            create_account();
        }
    }
}, false);