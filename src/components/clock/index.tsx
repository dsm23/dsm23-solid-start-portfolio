import { createSignal, For, onMount } from "solid-js";
import Marker from "./marker";

import styles from "./styles.module.css";

const Clock = () => {
  const [time, setTime] = createSignal(new Date());

  onMount(() => {
    const interval = setInterval(() => void setTime(new Date()), 1000);
    return () => void clearInterval(interval);
  });

  const hours = () => time().getHours();
  const minutes = () => time().getMinutes();
  const seconds = () => time().getSeconds();

  return (
    <svg viewBox="-50 -50 100 100" class={styles.svg}>
      <circle class={styles.clockFace} r="48" />

      <For
        each={
          Array.from({ length: 60 }, (_, i) => [i % 5 === 0, i]) as [
            boolean,
            number
          ][]
        }
      >
        {([isMajor, radial]) => <Marker isMajor={isMajor} radial={radial} />}
      </For>

      <line
        id="hour"
        class={styles.hour}
        y1="2"
        y2="-20"
        transform={`rotate(${30 * hours() + minutes() / 2})`}
      />

      <line
        id="minute"
        class={styles.minute}
        y1="4"
        y2="-30"
        transform={`rotate(${6 * minutes() + seconds() / 10})`}
      />

      <g id="second" transform={`rotate(${6 * seconds()})`}>
        <line class="text-red-700" y1="10" y2="-38" stroke="currentColor" />
        <line
          class="text-red-700"
          y1="10"
          y2="2"
          stroke="currentColor"
          stroke-width="3"
        />
      </g>
    </svg>
  );
};

export default Clock;
