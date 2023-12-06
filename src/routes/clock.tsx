import { ClockFace, Main } from "~/components";
import StyledGoBack from "~/components/styled-go-back";

const Clock = () => (
  <Main class="px-6 py-8 w-full">
    <StyledGoBack class="mb-4" href="/#projects" />

    <h1>Clock</h1>
    <p>A SVG clock example cloned from svelte.dev</p>

    <div class="container mx-auto">
      <ClockFace />
    </div>
  </Main>
);

export default Clock;
