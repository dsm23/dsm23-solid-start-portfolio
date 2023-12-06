import { Component, JSX, For } from "solid-js";
import { A } from "solid-start";
import { Anchor, Section } from "~/components";

import { Help, NavRight } from "~/components/svgs";
import { internal } from "~/utils";

import styles from "./styles.module.css";

interface Project {
  title: string;
  to: string;
  description: string;
}

const projects: Project[] = [
  {
    title: "This portfolio",
    to: "https://github.com/dsm23/dsm23-gatsby-portfolio",
    description: "The GitHub link to the source code of this portfolio",
  },
  {
    title: "IMH website",
    to: "https://nextjs-imh.vercel.app/",
    description:
      "A website for my parent's company. Built with Tailwind and Next.js and uses Contentful as a CMS",
  },
  {
    title: "Noughts and Crosses",
    to: "/noughts-and-crosses",
    description:
      "The tutorial example from the reactjs.org docs in tailwindcss stylings with TypeScript typings",
  },
  {
    title: "FizzBuzz",
    to: "/fizz-buzz",
    description:
      'Numbers 1 to 100 where any number divisible by three is replaced with the word "fizz", and any number divisible by five is replaced with the word "buzz"',
  },

  {
    title: "Clock",
    to: "/clock",
    description: "A SVG clock example cloned from svelte.dev",
  },
  {
    title: "Totally not XSS vulnerable",
    to: "https://totally-not-xss-vulnerable.netlify.app/",
    description:
      "An example of a XSS vulnerable site. A list of usernames and passwords are stored in IndexedDB and an example username in the form that can be used to print the list in a table",
  },
  {
    title: "Layout Proposal for Twitch Streamer I watch",
    to: "https://layout-proposal-for-austin.netlify.app/",
    description:
      "AustinShow uses a video call app to do a battle royale style show. During the elimination stage he introduces a bottom three stage that can sometimes be hard to follow",
  },
  {
    title: "D3.js pie chart",
    to: "/pie-chart",
    description: "Pie chart in svg using D3.js",
  },
  {
    title: "Todomvc with redux toolkit",
    to: "https://todomvc-redux-toolkit.netlify.app/",
    description:
      "The redux Todomvc example is quite old and states that it no longer uses recommended patterns. An example that converts to redux toolkit and uses open-props for styles",
  },
  {
    title: "Simple form",
    to: "/simple-form",
    description: "A simple form example using tanstack form",
  },
];

const Projects: Component<JSX.HTMLAttributes<HTMLElement>> = (props) => (
  <Section {...props}>
    <h2 class="text-5xl">Projects</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
      <For each={projects}>
        {({ title, to, description }) => (
          <div>
            <div class={styles.imgContainer}>
              <Help class="absolute h-full w-full rounded-lg object-cover shadow-md" />
            </div>
            <div class="isolate -mt-16 px-4 print:mt-0">
              <div class="rounded-lg bg-white p-6 shadow-lg">
                <div class="flex items-baseline">
                  <div class="text-xs font-semibold uppercase tracking-wide text-gray-600">
                    {internal(to) ? "internal" : "external"}
                  </div>
                </div>
                <Anchor as={A} href={to} class="mt-2 flex items-center gap-x-2">
                  <NavRight class="h-6 w-6" />
                  <h3 class="truncate text-lg font-semibold leading-tight">
                    {title}
                  </h3>
                </Anchor>
                <div class="mt-3">
                  <p class="text-sm text-gray-900">{description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </For>
    </div>
  </Section>
);

export default Projects;
