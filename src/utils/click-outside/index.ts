import { onCleanup } from "solid-js";
import type { Accessor } from "solid-js";

const clickOutside = (el: HTMLElement, accessor: Accessor<() => unknown>) => {
  const onClick = (e: MouseEvent) =>
    !el.contains(e.target as Node) && accessor()?.();
  document.body.addEventListener("click", onClick);

  onCleanup(() => {
    document.body.removeEventListener("click", onClick);
  });
};

export default clickOutside;
