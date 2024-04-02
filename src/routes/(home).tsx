import { cache, createAsync } from "@solidjs/router";
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

const getPage = cache(async () => {
  "use server";

  return await getHomePageQuery();
}, "home");

export const route = {
  load: async () => await getPage(),
};

const HomePage = () => {
  const dataSet = createAsync(async () => await getPage());

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
