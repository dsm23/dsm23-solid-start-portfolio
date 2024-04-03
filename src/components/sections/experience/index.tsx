import { For, splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";
import Section from "~/components/section";
import { contentfulOptions, formatYears } from "~/utils";
import { documentToSolidComponents } from "~/utils/rich-text-solid-renderer";
import type { ExperienceCompany, Maybe } from "../../../../graphql-types";

import styles from "./styles.module.css";

interface Props extends JSX.HTMLAttributes<HTMLElement> {
  experience?: Maybe<ExperienceCompany[]>;
}

const Experience: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ["experience"]);

  return (
    <Section {...others}>
      <h2 class="text-5xl">Experience</h2>
      <For each={local.experience}>
        {({ companyName, city, description, endDate, startDate }) => (
          <div class={styles.container}>
            <h3 class={styles.company}>{companyName}</h3>
            <div class={styles.city}>{city}</div>
            <div class={styles.description}>
              {documentToSolidComponents(description?.json, contentfulOptions)}
            </div>

            <div class={styles.dates}>
              {formatYears(startDate as string, endDate as string)}
            </div>
          </div>
        )}
      </For>
    </Section>
  );
};

export default Experience;
