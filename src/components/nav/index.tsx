import {
  Accessor,
  Component,
  createEffect,
  createResource,
  ParentProps,
} from "solid-js";
import { A } from "solid-start";
// import resolveConfig from "tailwindcss/resolveConfig";
// import { KeyValuePair } from "tailwindcss/types/config.js";
// @ts-ignore
// import tailwindConfig from "../../../tailwind.config.cjs";
import Hamburger from "../hamburger";
import { useMedia, useTween } from "~/hooks";
import { clickOutside, easing } from "~/utils";
import { getProfilePic } from "~/utils/api";

import styles from "./styles.module.css";

// HACK: solid directive
0 && clickOutside;

interface Props extends ParentProps {
  // data: any;
  open: Accessor<boolean>;
  onToggle: () => void;
  onClose: () => void;
}

// const fullConfig = resolveConfig(tailwindConfig);

const Nav: Component<Props> = (props) => {
  const [profilePic] = createResource(async () => {
    return await getProfilePic();
  });

  const [height, setHeight] = useTween(0, {
    easing: easing.inOutCirc,
    duration: 400,
  });

  let mobileContainerRef: HTMLDivElement | undefined;
  let mobileHeightRef: HTMLDivElement | undefined;

  // const isMobile = useMedia(
  //   `(max-width: ${
  //     (fullConfig.theme?.screens as KeyValuePair<string, string>)?.md as string
  //   })`
  // );

  const isMobile = useMedia(`(max-width: 768px)`);

  createEffect(() => {
    if (isMobile()) {
      if (props.open()) {
        setHeight(mobileHeightRef?.offsetHeight!);
      } else {
        setHeight(0);
      }
    }
  });

  return (
    <div class={styles.container} use:clickOutside={() => void props.onClose()}>
      <A
        href="/#home"
        class="inline-flex items-center shadow-sm outline-none border-2 border-transparent lg:mr-0 lg:mb-4 lg:rounded-full lg:border-8 lg:border-sky-700 focus:border-yellow-500"
      >
        <img
          src={profilePic()?.image?.url}
          class="aspect-square w-10 lg:w-48 rounded-full object-cover"
          alt={profilePic()?.image?.description}
        />

        <span class="hidden ml-4 print:inline md:inline lg:hidden text-xl text-white font-bold tracking-wide">
          David Murdoch
        </span>
        <span class="inline ml-4 print:hidden md:hidden text-xl text-white font-bold tracking-wide">
          DSM
        </span>
      </A>
      <div class={styles.icon}>
        <button
          aria-label="Open the navigation menu"
          onClick={props.onToggle}
          class="p-1 flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
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
