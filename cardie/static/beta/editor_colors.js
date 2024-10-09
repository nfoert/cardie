import { store } from "./store.js";

export default {
  data() {
    return { store };
  },
  template: `<div class="editor_main_setting" id="editor_main_settings_colors">
                <p class="ui_text_subheader_left">
                    <i class="ph-bold ph-palette"></i> Colors
                </p>
                <div class="ui_separator_horizontal"></div>
                <p class="ui_text_description">Background color</p>
                <input type="color" class="ui_input_generic" id="editor_main_settings_colors_background" data-tippy-content="Change the background color on your card" v-model="store.card.colors.background">
                <p class="ui_text_description">Accent color</p>
                <input type="color" class="ui_input_generic" id="editor_main_settings_colors_accent" data-tippy-content="Change the accent color on your card, this is used for the colors of the icons" v-model="store.card.colors.accent">
                <p class="ui_text_description">Text color</p>
                <input type="color" class="ui_input_generic" id="editor_main_settings_colors_text" data-tippy-content="Change the text color on your card" v-model="store.card.colors.text">
            </div>`
}
