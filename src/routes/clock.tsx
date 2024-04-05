import Anchor from "~/components/anchor";
import ClockFace from "~/components/clock";
import Main from "~/components/main";
import StyledGoBack from "~/components/styled-go-back";

const Clock = () => (
  <Main class="w-full py-8 px-6">
    <StyledGoBack class="mb-4" href="/#projects" />

    <h1 class="text-4xl uppercase tracking-widest text-sky-600">Clock</h1>
    <p>
      A SVG clock example cloned from{" "}
      <Anchor href="https://svelte.dev/examples/clock">svelte.dev</Anchor>
    </p>

    <div class="container mx-auto">
      <ClockFace />
    </div>
  </Main>
);

export default Clock;
