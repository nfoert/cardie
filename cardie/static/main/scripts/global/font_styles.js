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
        "header": {"name": "EB Garamond", "url": "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap"}, 
        "text": {"name": "EB Garamond", "url": "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap"}
    },
];

function get_font_style(name) {
    return(font_styles.find(font => font.name == name))
}

async function load_font(name, url) {
    if (url.includes("https://") || url.includes("http://")) {
        get_font_url_from_css(url).then(async (font_url) => {
            const font = new FontFace(name, `url(${font_url})`);
            await font.load();
            document.fonts.add(font);
            log("INFO", `Loaded font ${name}`);
        });
        
    } else {
        log("INFO", `Not loading font ${name} because it doesn't have a web url.`);
    }
    
}

async function get_font_url_from_css(css_url) {
    try {
        const response = await fetch(css_url);
        const cssText = await response.text();

        const fontUrlMatch = cssText.match(/url\((https:\/\/[^)]+\.woff2?)\)/);

        if (fontUrlMatch[1]) {
            return(fontUrlMatch[1]);

        } else {
            log("WARN", "Font URL not found in the CSS file");
        }
    } catch (error) {
        log("WARN", "There was a problem finding the font url from the CSS")
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
    load_font(font_name, font_url)
});