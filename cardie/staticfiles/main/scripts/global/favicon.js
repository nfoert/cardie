// Thanks to https://stackoverflow.com/questions/260857/changing-website-favicon-dynamically

// TODO: Support {{ server_url }}
let favicon_light_url = "http://127.0.0.1:8000/static/main/images/favicon_light.ico";
let favicon_dark_url = "http://127.0.0.1:8000/static/main/images/favicon_dark.ico"

function favicon_light() {
    var link = document.querySelector("link[rel~='icon']");

    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }

    link.href = favicon_light_url;
}

function favicon_dark() {
    var link = document.querySelector("link[rel~='icon']");

    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }

    link.href = favicon_dark_url;
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    favicon_light();
    
} else {
    favicon_dark();
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const newColorScheme = event.matches ? "dark" : "light";
    
    if (newColorScheme == "dark") {
        favicon_light();

    } else {
        favicon_dark();
    }
});

