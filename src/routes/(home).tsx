import { createResource } from "solid-js";
import { useRouteData } from "solid-start";
import {
  Divisor,
  Download,
  Education,
  Experience,
  Home,
  Interests,
  Main,
  Projects,
  Skills,
} from "~/components";
import { getHomePageQuery } from "~/utils/api";

export const routeData = () => {
  const [dataSet] = createResource(async () => {
    return await getHomePageQuery();
  });

  return dataSet;
};

const HomePage = () => {
  const dataSet = useRouteData<typeof routeData>();

  const person = () => dataSet()?.person;
  const education = () => dataSet()?.education;
  const experience = () => dataSet()?.experience;
  const skills = () => dataSet()?.skills;
  const interests = () => dataSet()?.interests;

  return (
    <Main>
      <h1 class="sr-only">David Murdoch's Portfolio</h1>

      <Home id="home" author={person()} />
      <Divisor />

      <Experience id="experience" experience={experience()} />
      <Divisor />

      <Education id="education" education={education()} />
      <Divisor />

      <Skills id="skills" skills={skills()} />
      <Divisor />
      <Projects id="projects" />
      <Divisor />
      <Interests id="interests" interests={interests()} />

      <Divisor />
      <Download id="download" />
    </Main>
  );
};

export default HomePage;
