import { splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";
import Anchor from "~/components/anchor";
import Section from "~/components/section";
import SectionHeader from "~/components/section-header";
import { ArrowTopRightOnSquare, CodeSandbox, GitHub } from "~/components/svgs";
import type { Maybe, Person } from "../../../../graphql-types";

interface Props extends JSX.HTMLAttributes<HTMLElement> {
  author?: Maybe<Person>;
}

const Home: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ["author"]);

  const firstName = () => local.author?.firstName;
  const lastName = () => local.author?.lastName;
  const email = () => local.author?.email;
  const phone = () => local.author?.phone;
  const codesandbox = () => local.author?.codesandbox as string;
  const github = () => local.author?.github as string;
  const shortBio = () => local.author?.shortBio;

  return (
    <Section {...others}>
      <SectionHeader>
        <span class="text-gray-900 dark:text-white">{firstName()}</span>{" "}
        <span class="text-sky-900 dark:text-sky-300">{lastName()}</span>
      </SectionHeader>
      <address>
        London-based · {phone()} ·{" "}
        <Anchor href={`mailto:${email()}`}>{email()}</Anchor>
      </address>
      <p class="mt-4 text-gray-900 dark:text-white">{shortBio()}</p>
      <div class="relative mt-4 flex gap-x-4">
        <a
          href={github()}
          aria-label="GitHub"
          class="flex transform items-center justify-center rounded-full bg-gray-900 p-2 transition duration-500 ease-in-out hover:scale-125 hover:bg-sky-900"
          rel="noopener noreferrer"
          target="_blank"
        >
          <GitHub class="h-6 w-6 text-white" />
        </a>
        <a
          href={codesandbox()}
          aria-label="CodeSandbox"
          class="flex transform items-center justify-center rounded-full bg-gray-900 p-2 transition duration-500 ease-in-out hover:scale-125 hover:bg-sky-900"
          rel="noopener noreferrer"
          target="_blank"
        >
          <CodeSandbox class="h-6 w-6 text-white" />
        </a>

        <a
          href="https://react-david-murdoch-portfolio.netlify.com/"
          class="flex transform items-center justify-center gap-x-2 rounded-full bg-gray-900 p-2 px-4 text-white transition duration-500 ease-in-out hover:scale-110 hover:bg-sky-900"
          rel="noopener noreferrer"
          target="_blank"
        >
          React Gatsby portfolio
          <ArrowTopRightOnSquare class="h-4 w-4" />
        </a>
      </div>
    </Section>
  );
};

export default Home;
