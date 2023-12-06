import { ComponentProps, Component, JSX, Ref, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import cx from "clsx";

type ElementType<P = any> =
  | {
      [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K]
        ? K
        : never;
    }[keyof JSX.IntrinsicElements]
  | Component<P>;

type PlymorphicProps<E extends ElementType = ElementType> = {
  as?: E;
  class?: string;
  ref?: Ref<E>;
};

type Props<E extends ElementType> = PlymorphicProps<E> &
  Omit<ComponentProps<E>, keyof PlymorphicProps>;

const defaultElement = "main";

const Main: <E extends ElementType = typeof defaultElement>(
  props: Props<E>
) => JSX.Element | null = (props) => {
  const [local, others] = splitProps(props, ["as", "class", "ref"]);

  return (
    <Dynamic
      {...others}
      component={local.as || defaultElement}
      class={cx("mt-20 dark:text-white lg:mt-0", local.class)}
      ref={local.ref}
    />
  );
};

export default Main;
