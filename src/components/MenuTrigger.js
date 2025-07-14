import { createApp, ref, onMounted } from 'vue/dist/vue.esm-bundler.js';
import useMenuTrigger from "~/shared/MenuTrigger/useMenuTrigger.js";

// the selector in the DOM we want to attach this component to
const componentSelector = '[data-menu-trigger]';

// attach to all existing dom elements, and pass through the current selector
export default function init(scope = document) {
  scope.querySelectorAll(componentSelector).forEach((el) => MenuTriggerComponent(el, { el: el}));
}

export const MenuTriggerComponent = (el) => createApp({
  name: 'MenuTriggerComponent',
  template: false,
  setup() {

    const { attachEventsOnMounted, ...buttonProps } = useMenuTrigger(ref(el), ref(true));
    onMounted(attachEventsOnMounted);

    return { buttonProps }
  },
  render() { return null; }
}).mount(el);
