// It starts at one... this feels wrong...
var text_items = new Array();
var link_items = new Array();
var currently_editing_icon;
var items_list;

function open_iconselector_foritem(event) {
	const item = event.target.closest(".link_item, .text_item");
	currently_editing_icon = item;
	show_iconselector();
}

function editor_create_json() {
	const card_json = {
		uuid: "unknown",
		name: "",
		author: "unknown",
		layout: "left",
		details: {
			primary: "",
			secondary: "",
		},
		information: {
			items: [],
		},
		colors: {
			background: "#ffffff",
			accent: "#000000",
			text: "#000000",
		},
		font_style: "Simple",
		version: 4,
	};

	card_json["name"] = document.querySelector(
		"#editor_header_name_text_cardname",
	).innerText;
	card_json["author"] = username;
	card_json["layout"] = layout;
	card_json["details"]["primary"] = document.querySelector(
		"#editor_main_settings_details_primary",
	).value;
	card_json["details"]["secondary"] = document.querySelector(
		"#editor_main_settings_details_secondary",
	).value;

	card_json["colors"]["background"] = document.querySelector(
		"#editor_main_settings_colors_background",
	).value;
	card_json["colors"]["accent"] = document.querySelector(
		"#editor_main_settings_colors_accent",
	).value;
	card_json["colors"]["text"] = document.querySelector(
		"#editor_main_settings_colors_text",
	).value;
	card_json["font_style"] = font_style;

	for (const item in items_list) {
		const item_uuid = items_list[item].id;
		const item_icon = items_list[item].icon;
		const item_text = items_list[item].text;
		const item_url = items_list[item].url;
		const item_url_enabled = items_list[item].url_enabled;
		const item_position = items_list[item].position;

		const item_json = {
			uuid: item_uuid,
			icon: item_icon,
			text: item_text,
			url: item_url,
			url_enabled: item_url_enabled,
			position: item_position,
		};

		card_json["information"]["items"].push(item_json);

		card_json["information"]["items"].sort((a, b) => a.position - b.position);
	}

	return card_json;
}

function editor_load_from_json(json) {
	// Sets up all the buttons based on the json

	json = JSON.parse(json);

	document.querySelector("#editor_header_name_text_cardname").innerText =
		json["name"];
	document.querySelector("#editor_main_settings_details_primary").value =
		json["details"]["primary"];
	document.querySelector("#editor_main_settings_details_secondary").value =
		json["details"]["secondary"];

	document.querySelector("#editor_main_settings_colors_background").value =
		json["colors"]["background"];
	document.querySelector("#editor_main_settings_colors_accent").value =
		json["colors"]["accent"];
	document.querySelector("#editor_main_settings_colors_text").value =
		json["colors"]["text"];
	font_style = json["font_style"];

	card_set_font(".card_card", font_style);
	window.dispatchEvent(
		new CustomEvent("sendLoadedFontFromJson", {
			detail: { font_style },
		}),
	);

	card_set_layout(".card_card", json["layout"]);
	layout = json["layout"];

	json["information"]["items"].sort((a, b) => a.position - b.position);

	for (const item in json["information"]["items"]) {
		const uuid = json["information"]["items"][item]["uuid"];
		const text = json["information"]["items"][item]["text"];
		const icon = json["information"]["items"][item]["icon"];
		const url = json["information"]["items"][item]["url"];
		const url_enabled = json["information"]["items"][item]["url_enabled"];
		const position = json["information"]["items"][item]["position"];

		window.dispatchEvent(
			new CustomEvent("createItem", {
				detail: { uuid, text, icon, url, url_enabled, position },
			}),
		);
	}
}

function status_saved() {
	document.querySelector("#editor_status").innerHTML =
		'<i class="ph-bold ph-check-circle"></i> Saved';
}

function status_saving() {
	document.querySelector("#editor_status").innerHTML =
		'<i class="ph-bold ph-spinner-gap"></i> Saving...';
}

function status_error() {
	document.querySelector("#editor_status").innerHTML =
		'<i class="ph-bold ph-warning"></i> Error';
}

window.addEventListener("itemData", (event) => {
	const { items } = event.detail;
	items_list = items;
});
