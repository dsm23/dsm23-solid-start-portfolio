import { createSignal, onMount } from "solid-js";

const useMedia = (query: string) => {
  const match = () => globalThis?.matchMedia?.(query).matches;

  const [value, set] = createSignal(match());

  onMount(() => {
    const handler = () => set(match());
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  });

  return value;
};

export default useMedia;
