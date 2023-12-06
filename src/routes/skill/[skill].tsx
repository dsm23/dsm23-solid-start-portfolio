import { createResource, For } from "solid-js";
import { RouteDataArgs, createRouteData, useRouteData } from "solid-start";
import Main from "~/components/main";
import { EmptyStar, FilledStar } from "~/components/svgs";
import StyledGoBack from "~/components/styled-go-back";
import { contentfulOptions } from "~/utils";
import { getSkillBySlug } from "~/utils/api";
import { documentToSolidComponents } from "~/utils/rich-text-solid-renderer";

export const routeData = ({ params }: RouteDataArgs) => {
  // const [skill] = createResource(async () => {
  //   return await getSkillBySlug(params.skill);
  // });

  // return skill;

  return createRouteData(async () => {
    return await getSkillBySlug(params.skill);
  });
};

const Skill = () => {
  const skill = useRouteData<typeof routeData>();

  const skillName = () => skill()?.skillName;
  const content = () => skill()?.content;
  const rating = () => skill()?.rating;

  return (
    <Main class="px-6 py-8 w-full">
      <StyledGoBack class="mb-4" href="/#skills" />

      <h1 class="text-4xl text-sky-700">{skillName()}</h1>
      <div class="mb-4">
        {documentToSolidComponents(content()?.json, contentfulOptions)}
      </div>

      <div class="flex">
        <h2 class="text-sky-600 tracking-widest">PROFICIENCY:</h2>

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
