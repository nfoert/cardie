// This file lists the available font styles to be used for cards
// It will primarily contain the array of font style objects which can then be imported by the editor preview or cardview to allow the font to be changed

var font_styles =  [
    {"name": "Simple", 
        "header": {"name": "Noto Sans", "url": "Noto Sans"}, 
        "text": {"name": "Noto Sans", "url": "Noto Sans"}
    },
    {"name": "Modern", 
        "header": {"name": "Bebas Neue", "url": "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"},
        "text": {"name": "Noto Sans", "url": "Noto Sans"}
    },
    {"name": "Fancy", 
        "header": {"name": "Roboto Slab", "url": "https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"}, 
        "text": {"name": "EB Garamond", "url": "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap"}
    },
];

function get_font_style(name) {
    return(font_styles.find(font => font.name == name));
}

async function load_font(name, url) {
    if (url.includes("https://") || url.includes("http://")) {
        load_font_css(url);
        log("INFO", `Loaded font ${name}`);

    } else {
        log("INFO", `Not loading font ${name} because it doesn't have a web url.`);
    }
    
}

async function load_font_css(url) {
    let cssId = url;
    if (!document.getElementById(cssId)) {
        let link  = document.createElement('link');
        link.id   = cssId;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.media = 'all';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    window.dispatchEvent(new CustomEvent('sendFontStyles', {
        detail: { font_styles }
    }));
});

window.addEventListener('loadFont', (event) => {
    event.stopImmediatePropagation();
    const { font_name, font_url } = event.detail;
    load_font(font_name, font_url);
});