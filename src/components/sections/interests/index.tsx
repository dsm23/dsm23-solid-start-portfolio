import { Component, JSX, For, splitProps } from "solid-js";
import Section from "~/components/section";

interface Props extends JSX.HTMLAttributes<HTMLElement> {
  interests: any[];
}

const Interests: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ["interests"]);

  return (
    <Section {...others}>
      <h2 class="text-5xl">Interests</h2>
      <ul class="list-disc list-inside">
        <For each={local.interests}>
          {({ interest }) => <li class="ml-4">{interest}</li>}
        </For>
      </ul>
    </Section>
  );
};

export default Interests;
