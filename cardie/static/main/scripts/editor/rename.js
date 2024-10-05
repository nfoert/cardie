const editor_rename = get_or_throw("#editor_rename");
const editor_rename_input = get_or_throw("#editor_rename_input");

function show_rename() {
	show_background_blur();
	editor_rename.style.display = "flex";
	editor_rename.classList.remove("hide-rename");
	editor_rename.classList.add("show-rename");
}

function hide_rename() {
	editor_rename.classList.add("hide-rename");

	setTimeout(() => {
		editor_rename.classList.remove("show-rename");
		editor_rename.style.display = "none";

		hide_background_blur();
	}, 500);
}

function rename_card() {
	const card_name = editor_rename_input.value;
	const card_name_element = get_or_throw("#editor_header_name_text_cardname");

	card_name_element.innerText = card_name;
	hide_rename();
}

get_or_throw("#editor_rename_top_close").addEventListener("click", hide_rename);
get_or_throw("#editor_rename_submit").addEventListener("click", rename_card);
get_or_throw("#editor_header_name_button").addEventListener(
	"click",
	show_rename,
);
