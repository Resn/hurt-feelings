import { createApp, ref, onMounted } from 'vue/dist/vue.esm-bundler.js';
import useButton from "~/shared/Button/useButton.js";

// the selector in the DOM we want to attach this component to
const componentSelector = '[data-js-button]';

// attach to all existing dom elements, and pass through the current selector
export default function init(scope = document) {
  scope.querySelectorAll(componentSelector).forEach((el) => ButtonComponent(el, { el: el}));
}

export const ButtonComponent = (el) => createApp({
  name: 'ButtonComponent',
  setup() {

    const { attachEventsOnMounted, ...buttonProps } = useButton(ref(el), ref(true));
    onMounted(attachEventsOnMounted);

    return buttonProps;
  }
}).mount(el);
