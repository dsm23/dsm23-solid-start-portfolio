import { Main } from "~/components";
import StyledGoBack from "~/components/styled-go-back";

const Sverdle = () => {
  return (
    <Main class="w-full px-6 py-8">
      <StyledGoBack class="mb-4" href="/#projects" />

      <h1 class="text-4xl uppercase tracking-widest text-sky-600">Sverdle</h1>
    </Main>
  );
};

export default Sverdle;
