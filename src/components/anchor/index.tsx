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

const defaultElement = "a";

export const Anchor: <E extends ElementType = typeof defaultElement>(
  props: Props<E>
) => JSX.Element | null = (props) => {
  const [local, others] = splitProps(props, ["as", "class", "ref"]);

  return (
    <Dynamic
      {...others}
      component={local.as || defaultElement}
      class={cx(
        "-mx-1 px-1 text-sky-900 outline-none hover:underline focus:rounded focus:bg-yellow-500 dark:text-sky-300 print:underline",
        local.class
      )}
      ref={local.ref}
    />
  );
};

export default Anchor;
