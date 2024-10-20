import { store } from "./store.js";

export default {
  data() {
    return { store };
  },
  template: `<div class="editor_main_setting" id="editor_main_settings_details">
    <p class="ui_text_subheader_left">
      <i class="ph-bold ph-text-aa"></i> Details
    </p>
    <div class="ui_separator_horizontal"></div>
    <input
      v-model="store.card.front.title"
      type="text"
      class="ui_input_generic"
      placeholder="Primary text"
      data-tippy-content="Perfect for your name or username"
    >
    <input
      v-model="store.card.front.subTitle"
      type="text"
      class="ui_input_generic"
      placeholder="Secondary text"
      data-tippy-content="Perfect for your job title or pronouns"
    >
  </div>`
}
