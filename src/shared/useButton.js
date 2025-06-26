import { ref, onMounted, nextTick, watchEffect, onBeforeUnmount  } from 'vue';

export default function useButton(button, isReady) {
  let ripple = null;
  let buttonEl = null;

  const hasMounted = ref(false);
  const eventsAttached = ref(false);

  const removeListeners = ref(null);

  function handleMouseIn(e) {
    buttonEl = e.target;
    handleRemoveRipple();

    let x = e.offsetX;
    let y = e.offsetY;
    ripple = document.createElement("div");
    ripple.classList.add("button__ripple");
    ripple.classList.add("button__ripple--in");

    buttonEl.appendChild(ripple);
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
  }

  function handleRemoveRipple() {
    if (ripple && buttonEl.contains(ripple)) {
      buttonEl.removeChild(ripple);
    }
  }

  function handleMouseOut(e) {
    buttonEl = e.target;

    if (!ripple || !buttonEl.contains(ripple)) {
      return;
    }

    let x = e.offsetX;
    let y = e.offsetY;
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    ripple.classList.remove("button__ripple--in");
    ripple.classList.add("button__ripple--out");
    ripple.addEventListener("animationend", () => {
      handleRemoveRipple();
    });
  }

  const attachEvents = () => {
    if (!button.value || !(button.value instanceof Node)) {
      return;
    }

    buttonEl = button.value;

    buttonEl.addEventListener("mouseover", handleMouseIn);
    buttonEl.addEventListener("mouseleave", handleMouseOut);

    removeListeners.value = () => {
      buttonEl.removeEventListener("mouseover", handleMouseIn);
      buttonEl.removeEventListener("mouseleave", handleMouseOut);
    }

    eventsAttached.value = true;
  }

  const attachEventsOnMounted = () => {
    nextTick().then(() => {
      hasMounted.value = true;
      if(isReady.value && button.value && !eventsAttached.value) {
        attachEvents();
      }
    });
  };

  onBeforeUnmount(() => {
    if (removeListeners.value) removeListeners.value();
  });

  watchEffect(() => {
    if (button.value && isReady.value && hasMounted.value && !eventsAttached.value) {
      if (removeListeners.value) removeListeners.value();

      attachEvents();
    }
  });

  return {
    button,
    buttonEl,
    ripple,
    handleMouseIn,
    handleMouseOut,
    attachEventsOnMounted
  };
}
