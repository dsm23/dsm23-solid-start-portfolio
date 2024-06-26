import type { Component, JSX } from "solid-js";

type Props = JSX.HTMLAttributes<HTMLHeadingElement>;

const SectionHeader: Component<Props> = (props) => (
  <h2 class="text-6xl font-medium text-gray-900" {...props} />
);

export default SectionHeader;
