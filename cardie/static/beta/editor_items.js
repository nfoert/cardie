import { store } from "./store.js";

export default {
	data() {
		return { store };
	},
	template: `
  <div class="editor_main_setting" id="editor_main_settings_items" x-data="textItemsComponent()" x-init="init()" @end="updatePositions">
    <p class="ui_text_subheader_left">
        <i class="ph-bold ph-list-bullets"></i> Items
    </p>
    <div class="ui_separator_horizontal"></div>
    <div id="editor_main_settings_items_items">
      <cardie-editor-items-item :item="item" v-for="item in store.card.items"></cardie-editor-items-item>
    </div>
    <button @click="store.addItem()" id="editor_main_settings_information_text_add" class="ui_button_small">
        <i class="ph-bold ph-plus-circle"></i> Add item
    </button>
</div>
`,
};
