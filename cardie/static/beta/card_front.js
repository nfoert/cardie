import { store } from "./store.js";

export default {
	data() {
		return { store };
	},
	template: `<div
    class="card_card_front"
    :card-align="store.card.front.align"
    :style="{
      backgroundColor: store.card.colors.background,
    }"
  >
    <div class="card_top_text" :style="{
      fontFamily: store.card.styles.fontFamily,
      color: store.card.colors.text,
    }">
      <p class="card_top_text_username">{{ store.card.front.title }}</p>
      <p class="card_top_text_pronouns">{{ store.card.front.subTitle }}</p>
    </div>
  </div>`,
};
