var home_state = "wallet" // wallet, cards

function state_wallet() {
    home_state = "wallet";

    document.querySelector("#home-navigation-wallet").disabled = true;
    document.querySelector("#home-cards").style.display = "none";

    document.querySelector("#home-navigation-cards").disabled = false;
    document.querySelector("#home-wallet").style.display = "flex";
}

function state_cards() {
    home_state = "cards";

    document.querySelector("#home-navigation-cards").disabled = true;
    document.querySelector("#home-wallet").style.display = "none";

    document.querySelector("#home-navigation-wallet").disabled = false;
    document.querySelector("#home-cards").style.display = "flex";
}

document.querySelector("#home-navigation-wallet").addEventListener("click", function() {
    state_wallet();
})

document.querySelector("#home-navigation-cards").addEventListener("click", function() {
    state_cards();
})

state_wallet();