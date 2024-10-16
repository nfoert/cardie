import { store } from "./store.js";

export default {
	data() {
		return { store };
	},
	template: `<div
    class="card_card_back"
    :style="{
      backgroundColor: store.card.colors.background,
    }"
    >
    </div>`,
};
