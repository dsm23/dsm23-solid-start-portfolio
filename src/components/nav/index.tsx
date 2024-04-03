import { createEffect, createResource, Show } from "solid-js";
import type { Accessor, Component, ParentProps } from "solid-js";
import { A } from "@solidjs/router";

import Hamburger from "../hamburger";
import { useMedia, useTween } from "~/hooks";
import { clickOutside, easing } from "~/utils";
import { getProfilePic } from "~/utils/api";

import styles from "./styles.module.css";

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

  const [height, setHeight] = useTween(0, {
    easing: easing.inOutCirc,
    duration: 400,
  });

  let mobileContainerRef: HTMLDivElement | undefined;
  let mobileHeightRef: HTMLDivElement | undefined;

  const isMobile = useMedia(`(max-width: 768px)`);

  createEffect(() => {
    if (isMobile()) {
      if (props.open() && mobileHeightRef) {
        setHeight(mobileHeightRef?.offsetHeight);
      } else {
        setHeight(0);
      }
    }
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
        class="inline-flex items-center border-2 border-transparent shadow-sm outline-none focus:border-yellow-500 lg:mb-4 lg:mr-0 lg:rounded-full lg:border-8 lg:border-sky-700"
      >
        <Show when={profilePic()}>
          <img
            src={profilePic()?.image?.url as string}
            class="aspect-square w-10 rounded-full object-cover lg:w-48"
            alt={profilePic()?.image?.description as string}
          />
        </Show>

        <span class="ml-4 hidden text-xl font-bold tracking-wide text-white print:inline md:inline lg:hidden">
          David Murdoch
        </span>
        <span class="ml-4 inline text-xl font-bold tracking-wide text-white print:hidden md:hidden">
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
        <div
          class="h-0 overflow-hidden md:contents"
          ref={mobileContainerRef}
          style={{
            height: `${height()}px`,
          }}
        >
          <div class="pt-2 md:contents" ref={mobileHeightRef}>
            {props.children}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
