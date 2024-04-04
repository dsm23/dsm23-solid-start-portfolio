import { For, splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";
import Section from "~/components/section";
import cn from "~/utils/class-names";
import contentfulOptions from "~/utils/content-options";
import formatYears from "~/utils/format-years";
import { documentToSolidComponents } from "~/utils/rich-text-solid-renderer";
import type { EducationSchool, Maybe } from "../../../../graphql-types";

import styles from "./styles.module.css";

interface Props extends JSX.HTMLAttributes<HTMLElement> {
  education?: Maybe<EducationSchool[]>;
}

const Education: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ["education"]);

  return (
    <Section {...others}>
      <h2 class="text-5xl">Education</h2>
      <For each={local.education}>
        {({ schoolName, description, endDate, startDate }) => (
          <div class={styles.container}>
            <h3 class={styles.school}>{schoolName}</h3>
            {description && (
              <div class={styles.description}>
                {documentToSolidComponents(
                  description?.json,
                  contentfulOptions,
                )}
              </div>
            )}

            <div class={cn(styles.dates, "text-sky-900 dark:text-sky-300")}>
              {formatYears(startDate as string, endDate as string)}
            </div>
          </div>
        )}
      </For>
    </Section>
  );
};

export default Education;
