import { createSignal, For, Match, Switch } from "solid-js";
import type { Component, ParentProps } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import cx from "clsx";
import Nav from "~/components/nav";
import { useActiveSectionId } from "~/components/nav-observer";

import styles from "./styles.module.css";

// interface Props extends PageRendererProps {
//   children: ReactNode;
//   data: Queries.ContentfulPerson;
// }

interface Props extends ParentProps {}

const items = [
  "home",
  "experience",
  "education",
  "skills",
  "projects",
  "interests",
  "download",
];

const Layout: Component<Props> = (props) => {
  const location = useLocation();

  const activeId = useActiveSectionId();

  const rootPath = `/`;

  const [open, setOpen] = createSignal(false);

  const handleToggle = () => setOpen((prevOpen) => !prevOpen);

  const handleClose = () => setOpen(false);

  const isIndexPage = () => location.pathname === rootPath;

  const renderNav = (
    <Switch>
      <Match when={isIndexPage()}>
        <div class="block w-full text-gray-400 md:ml-auto md:flex md:w-auto md:items-start lg:block lg:h-auto lg:items-center">
          <For each={items}>
            {(label) => (
              <button
                onClick={() => {
                  document.getElementById(label)?.scrollIntoView({
                    behavior: "smooth",
                  });

                  return handleClose();
                }}
                class={cx(
                  styles.navLink,
                  "group flex w-full items-center justify-start rounded py-2 uppercase hover:bg-gray-900 hover:text-white focus:outline-none lg:justify-center",
                  { "bg-blue-700 text-white": label === activeId() },
                )}
              >
                <span
                  class={cx(
                    styles.navSpan,
                    "px-px py-px group-focus:bg-yellow-500 group-focus:text-gray-900 lg:px-0.5",
                  )}
                >
                  {label}
                </span>
              </button>
            )}
          </For>
        </div>
      </Match>
      <Match when={!isIndexPage()}>
        <For each={items}>
          {(label) => (
            <A
              href={`/#${label}`}
              class={cx(
                styles.navLink,
                "group flex w-full items-center justify-start rounded py-2 uppercase hover:bg-gray-900 hover:text-white focus:outline-none lg:justify-center",
              )}
            >
              <span
                class={cx(
                  styles.navSpan,
                  "px-px py-px text-gray-400 group-focus:bg-yellow-500 group-focus:text-gray-900 lg:px-0.5",
                )}
              >
                {label}
              </span>
            </A>
          )}
        </For>
      </Match>
    </Switch>
  );

  return (
    <div class="flex w-full flex-col font-sans lg:flex-row">
      <header class="contents">
        <Nav open={open} onToggle={handleToggle} onClose={handleClose}>
          {renderNav}
        </Nav>
      </header>
      <div class="w-full">{props.children}</div>
    </div>
  );
};

export default Layout;
