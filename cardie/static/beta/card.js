import { store } from "./store.js";

export default {
	data() {
		return { store, flipped: false };
	},
  methods: {
    flip() {
      this.flipped = !this.flipped;
    },
  },
	template: `<div
    @click="flip()"
    class="card_card"
    :style="store.computedStyles"
    :class="{card_flipped: this.flipped}"
  >
    <cardie-card-front />
    <cardie-card-back />
  </div>`,
};
