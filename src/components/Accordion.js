import { createApp, ref, onMounted } from 'vue/dist/vue.esm-bundler.js';
import useAccordion from "~/shared/Accordion/useAccordion.js";

// the selector in the DOM we want to attach this component to
const componentSelector = '[data-js-accordion]';

// attach to all existing dom elements, and pass through the current selector
export default function init(scope = document) {
  scope.querySelectorAll(componentSelector).forEach((el) => AccordionComponent(el, { el: el}));
}

export const AccordionComponent = (el) => createApp({
  name: 'AccordionComponent',
  setup() {

    const {attachEventsOnMounted, ...accordionProps } = useAccordion(ref(el), ref(true));
    onMounted(attachEventsOnMounted);

    return { accordionProps }

  }
}).mount(el);
