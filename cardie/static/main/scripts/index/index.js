
document.querySelector("#welcome_box_buttons_signin").addEventListener("click", function() {
    window.location.href = server_ip + "/authentication";
});

document.querySelector("#welcome_box_buttons_sourcecode").addEventListener("click", function() {
    window.location.href = "https://github.com/nfoert/cardie";
});

document.querySelector("#welcome_box_buttons_demo").addEventListener("click", function() {
    window.location.href = server_ip + "/editor?demo=True&";
});

document.querySelector("#index_top_account_signin").addEventListener("click", (event) => {
    window.location.href = `${server_ip}/authentication`;
});

document.querySelector("#index_top_account_home").addEventListener("click", (event) => {
    window.location.href = `${server_ip}/home`;

});

if (username) {
    document.querySelector("#index_top_account_signin").style.display = "none";
    document.querySelector("#index_top_account_home").innerHTML = `<i class="ph-bold ph-user-check"></i> ${username}`;
    document.querySelector("#index_top_account_home").style.display = "block";

} else {
    document.querySelector("#index_top_account_signin").style.display = "block";
    document.querySelector("#index_top_account_home").style.display = "none";
}