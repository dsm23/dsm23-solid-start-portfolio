import { For, splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";
import { A } from "@solidjs/router";
import cx from "clsx";
import Section from "~/components/section";
import SVGLoader from "./SVGLoader";
import Tooltip from "~/components/tooltip";
import type { Skill } from "../../../../graphql-types";

import styles from "./styles.module.css";

interface Props extends JSX.HTMLAttributes<HTMLElement> {
  skills: Skill[];
}

const Skills: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ["skills"]);

  return (
    <Section {...others}>
      <h2 class="text-5xl">Skills</h2>
      <div class="flex flex-wrap items-baseline">
        <For each={local.skills}>
          {(item) => (
            <A href={`/skill/${item.slug}`} class="group">
              <span class="sr-only">{item.skillName}</span>

              <SVGLoader
                class={cx(
                  styles.iconWrapper,
                  "h-16 w-16 text-gray-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400",
                )}
                src={item.icon!.url as string}
              />

              <Tooltip>{item.skillName}</Tooltip>
            </A>
          )}
        </For>
      </div>
    </Section>
  );
};

export default Skills;
