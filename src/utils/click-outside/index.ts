import { Accessor, onCleanup } from "solid-js";

const clickOutside = (el: HTMLElement, accessor: Accessor<any>) => {
  const onClick = (e: MouseEvent) =>
    !el.contains(e.target as Node) && accessor()?.();
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
};

export default clickOutside;
