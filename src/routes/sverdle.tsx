import Main from "~/components/main";
import StyledGoBack from "~/components/styled-go-back";

const Sverdle = () => {
  return (
    <Main class="w-full py-8 px-6">
      <StyledGoBack class="mb-4" href="/#projects" />

      <h1 class="text-4xl uppercase tracking-widest text-sky-600">Sverdle</h1>
    </Main>
  );
};

export default Sverdle;
