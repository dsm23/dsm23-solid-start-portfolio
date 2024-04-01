import { ClockFace, Main } from "~/components";
import StyledGoBack from "~/components/styled-go-back";

const Clock = () => (
  <Main class="w-full px-6 py-8">
    <StyledGoBack class="mb-4" href="/#projects" />

    <h1>Clock</h1>
    <p>A SVG clock example cloned from svelte.dev</p>

    <div class="container mx-auto">
      <ClockFace />
    </div>
  </Main>
);

export default Clock;
