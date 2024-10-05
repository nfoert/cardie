// Thanks to https://stackoverflow.com/questions/260857/changing-website-favicon-dynamically

const favicon_light_url = window.__CONFIG__.favicon.light;
const favicon_dark_url = window.__CONFIG__.favicon.dark;

function createFavIconElement() {
	const link = document.createElement("link");
	link.rel = "icon";
	document.head.appendChild(link);
	return link;
}
/**
 *
 * @param {string} light
 * @param {string} dark
 */
function handle_favicon(light, dark) {
	/**
	 * @type {HTMLLinkElement}
	 */
	const iconElement =
		document.querySelector("link[rel~='icon']") ?? createFavIconElement();

	/**
	 * @param {boolean} isDark
	 * @returns {void}
	 * @description This function changes the favicon based on the color scheme
	 */
	function handleColorScheme(isDark) {
		iconElement.href = isDark ? light : dark;
	}

	/**
	 * @param {MediaQueryListEvent} event
	 * @returns {void}
	 * @description This function is called when the color scheme changes and passes the new color scheme in the event.matches property
	 */
	function colorSchemeListener(event) {
		handleColorScheme(event.matches);
	}

	const colorSchemaMediaQuery = window.matchMedia(
		"(prefers-color-scheme: dark)",
	);

	colorSchemaMediaQuery.addEventListener("change", colorSchemeListener);

	handleColorScheme(colorSchemaMediaQuery.matches);
}

handle_favicon(favicon_light_url, favicon_dark_url);
