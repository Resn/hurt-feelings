import Raf from "~/_internals/helpers/Raf";
import { loadComponents } from "~/components/index";

document.addEventListener("readystatechange", () => {
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    loadComponents();
    Raf.start();
    console.log("Main loaded, Raf started");
  }
});
