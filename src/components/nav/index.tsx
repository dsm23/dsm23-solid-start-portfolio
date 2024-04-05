import { createResource, Show } from "solid-js";
import type { Accessor, Component, ParentProps } from "solid-js";
import { A } from "@solidjs/router";
import Hamburger from "~/components/hamburger";
import { getProfilePic } from "~/utils/api";
import clickOutside from "~/utils/click-outside";

import styles from "./styles.module.css";
import { Transition } from "terracotta";

0 && clickOutside;

interface Props extends ParentProps {
  // data: any;
  open: Accessor<boolean>;
  onToggle: () => void;
  onClose: () => void;
}

const Nav: Component<Props> = (props) => {
  const [profilePic] = createResource(async () => {
    "use server";

    return await getProfilePic();
  });

  return (
    <div
      class={styles.container}
      use:clickOutside={() => {
        props.onClose();
      }}
    >
      <A
        href="/#home"
        class="inline-flex items-center border-2 border-transparent shadow-sm outline-none focus:border-yellow-500 lg:mr-0 lg:mb-4 lg:rounded-full lg:border-8 lg:border-sky-700"
      >
        <Show when={profilePic()}>
          <picture>
            <source srcset={profilePic()?.image?.srcset as string} />
            <img
              src={profilePic()?.image?.src as string}
              class="aspect-square w-10 rounded-full object-cover lg:w-48"
              alt={profilePic()?.image?.description as string}
            />
          </picture>
        </Show>

        <span class="ml-4 hidden text-xl font-bold tracking-wide text-white md:inline lg:hidden print:inline">
          David Murdoch
        </span>
        <span class="ml-4 inline text-xl font-bold tracking-wide text-white md:hidden print:hidden">
          DSM
        </span>
      </A>
      <div class={styles.icon}>
        <button
          aria-label="Open the navigation menu"
          onClick={props.onToggle}
          class="flex items-center justify-center rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none"
          aria-controls="primary-navigation"
          aria-expanded={props.open()}
        >
          <Hamburger class="h-6 w-6" open={props.open()} />
        </button>
      </div>

      <nav aria-label="Primary" class={styles.sections}>
        <Transition
          show={props.open()}
          class="grid md:hidden"
          enter="transition-[grid-template-rows] motion-reduce:transition-none duration-150"
          enterFrom="grid-rows-[0fr]"
          enterTo="grid-rows-[1fr]"
          leave="transition-[grid-template-rows] motion-reduce:transition-none duration-150"
          leaveFrom="grid-rows-[1fr]"
          leaveTo="grid-rows-[0fr]"
        >
          <div id="primary-navigation" class="overflow-hidden">
            <div class="mt-2">{props.children}</div>
          </div>
        </Transition>
        <div class="hidden md:block">{props.children}</div>
      </nav>
    </div>
  );
};

export default Nav;
