
document.querySelector("#welcome-box-buttons-signin").addEventListener("click", function() {
    window.location.href = server_ip + "/authentication";
});

document.querySelector("#welcome-box-buttons-sourcecode").addEventListener("click", function() {
    window.location.href = "https://github.com/nfoert/cardie";
});

document.querySelector("#welcome-box-buttons-demo").addEventListener("click", function() {
    window.location.href = server_ip + "/editor?demo=True&";
});