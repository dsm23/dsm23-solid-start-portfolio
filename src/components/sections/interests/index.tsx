import { For, splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";
import Section from "~/components/section";
import type {
  Interests as TypeInterests,
  Maybe,
} from "../../../../graphql-types";

interface Props extends JSX.HTMLAttributes<HTMLElement> {
  interests?: Maybe<TypeInterests[]>;
}

const Interests: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ["interests"]);

  return (
    <Section {...others}>
      <h2 class="text-5xl">Interests</h2>
      <ul class="list-inside list-disc">
        <For each={local.interests}>
          {({ interest }) => <li class="ml-4">{interest}</li>}
        </For>
      </ul>
    </Section>
  );
};

export default Interests;
