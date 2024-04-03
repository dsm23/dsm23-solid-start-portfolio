import { For } from "solid-js";
import { createAsync, cache, useParams } from "@solidjs/router";
import type { RouteDefinition, Params } from "@solidjs/router";
import Main from "~/components/main";
import { EmptyStar, FilledStar } from "~/components/svgs";
import StyledGoBack from "~/components/styled-go-back";
import { contentfulOptions } from "~/utils";
import { getSkillBySlug } from "~/utils/api";
import { documentToSolidComponents } from "~/utils/rich-text-solid-renderer";
import type { SkillContent } from "../../../graphql-types";

const getSkill = cache(async (params: Params) => {
  "use server";

  return await getSkillBySlug(params.skill);
}, "skills");

export const route = {
  load: async ({ params }) => await getSkill(params),
} satisfies RouteDefinition;

const Skill = () => {
  const params = useParams();
  const skill = createAsync(async () => await getSkill(params));

  const skillName = () => skill()?.skillName as string;
  const content = () => skill()?.content as SkillContent;
  const rating = () => skill()?.rating as number;

  return (
    <Main class="w-full px-6 py-8">
      <StyledGoBack class="mb-4" href="/#skills" />

      <h1 class="text-4xl text-sky-700">{skillName()}</h1>
      <div class="mb-4">
        {documentToSolidComponents(content()?.json, contentfulOptions)}
      </div>

      <div class="flex">
        <h2 class="tracking-widest text-sky-600">PROFICIENCY:</h2>

        <For each={Array.from({ length: rating() })}>
          {() => <FilledStar class="h-6 w-6" />}
        </For>

        <For each={Array.from({ length: 5 - rating() })}>
          {() => <EmptyStar class="h-6 w-6" />}
        </For>
      </div>
    </Main>
  );
};

export default Skill;
