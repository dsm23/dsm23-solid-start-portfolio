// https://codesandbox.io/s/x32155kw4q
import { createSignal } from "solid-js";
import type { Accessor } from "solid-js";
import { easing as timing } from "~/utils/ts-easing";

const useTween = (
  initial: number,
  { easing = timing.inOutQuad, duration = 250 } = {},
): [Accessor<number>, (to: number) => void] => {
  let raf: number | null = null;
  const [state, setState] = createSignal(initial);

  const setTween = (to: number) => {
    if (raf) cancelAnimationFrame(raf);

    let t0: number;
    function animate(t: number) {
      t0 = t0 || t;
      const delta = (t - t0) / duration,
        progress = Math.min(1, delta);

      setState((state) => state + (to - state) * easing(progress));

      if (progress < 1) raf = requestAnimationFrame(animate);
      else raf = null;
    }

    raf = requestAnimationFrame(animate);
  };

  return [state, setTween];
};

export default useTween;
