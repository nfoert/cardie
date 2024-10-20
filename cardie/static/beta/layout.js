import { store } from "./store.js";

export default {
  data() {
    return { store };
  },

  template: `<div class="editor_main_setting" id="editor_main_settings_layout">
    <p class="ui_text_subheader_left">
      <i class="ph-bold ph-layout"></i> Layout
    </p>
    <div class="ui_separator_horizontal"></div>
    <div id="editor_main_settings_layout_buttons">
      <button
        @click="store.changeLayout('left')"
        class="ui_button_icon"
        data-tippy-content="Left align"
      >
        <i class="ph-bold ph-align-left"></i>
      </button>
      <button
        @click="store.changeLayout('center')"
        class="ui_button_icon"
        data-tippy-content="Center align"
      >
        <i class="ph-bold ph-align-center-horizontal"></i>
      </button>
      <button
        @click="store.changeLayout('right')"
        class="ui_button_icon"
        data-tippy-content="Right align"
      >
        <i class="ph-bold ph-align-right"></i>
      </button>
    </div>
  </div>`,
}
