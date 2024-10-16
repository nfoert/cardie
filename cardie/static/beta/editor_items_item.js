import { store } from "./store.js";

export default {
	data() {
		return { store, menuOpen: false };
	},
	methods: {
		changeType() {
			if (this.item.value.type === "text") {
				this.item.value.type = "url";
			} else {
				this.item.value.type = "text";
			}
		},
	},
	props: ["item"],
	template: `<div class="item" :uuid="item.id">
    <div class="item_item">
        <p class="ui_button_small" x-sort:handle="">
            <i class="ph-bold ph-dots-six-vertical"></i>
        </p>
        <input type="text" placeholder="Text" class="ui_input_generic text_item_text" v-model="item.value.text">
        <input v-if="item.value.type == 'url'" type="text" placeholder="URL" class="ui_input_generic text_item_text" v-model="item.value.url">
        <button class="ui_button_smallicon" @click="menuOpen = !menuOpen">
            <i class="ph-bold ph-list"></i>
        </button>
    </div>
    <div class="item_menu" v-show="menuOpen" >
        <button
          class="ui_button_small text_item_icon"
          @click="changeType()"
          v-if="item.value.type == 'text'"
        >
            <i class="ph-bold ph-link"></i> Add URL
        </button>
        <button
          class="ui_button_small text_item_icon"
          @click="changeType()"
          v-if="item.value.type == 'url'"
        >
            <i class="ph-bold ph-link"></i> Remove URL
        </button>
        <button class="ui_button_small text_item_icon" @click="openIconSelector(item)">
            <i class="ph-bold !!icon!! "></i> Change icon
        </button>
        <button class="ui_button_small text_item_delete" @click="store.deleteItem(item.id)">
            <i class="ph-bold ph-trash"></i> Delete item
        </button>
    </div>
</div>
`,
};
