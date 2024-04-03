import { createResource, splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {
  src: string;
}

const fetchSvg = async (url: string) => {
  const res = await fetch(url, {
    headers: new Headers({
      Accept: "image/svg+xml",
    }),
  });

  return await res.text();
};

const SVGLoader: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ["src"]);

  const [icon] = createResource(local.src, fetchSvg);

  return <div {...others} innerHTML={icon()} />;
};

export default SVGLoader;
