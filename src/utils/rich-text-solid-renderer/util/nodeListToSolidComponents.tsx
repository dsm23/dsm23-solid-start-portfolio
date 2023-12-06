import { JSX } from "solid-js";
import { helpers, Mark } from "@contentful/rich-text-types";
import { CommonNode, Options } from "..";
import { appendKeyToValidElement } from "./appendKeyToValidElement";

export function nodeListToSolidComponents(
  nodes: CommonNode[],
  options: Options
): JSX.Element {
  return nodes.map((node: CommonNode, index: number): JSX.Element => {
    return appendKeyToValidElement(nodeToSolidComponent(node, options), index);
  });
}

export function nodeToSolidComponent(
  node: CommonNode,
  options: Options
): JSX.Element {
  const { renderNode, renderMark, renderText } = options;
  if (helpers.isText(node)) {
    return node.marks.reduce(
      (value: JSX.Element, mark: Mark): JSX.Element => {
        if (!renderMark[mark.type]) {
          return value;
        }
        return renderMark[mark.type](value);
      },
      renderText ? renderText(node.value) : node.value
    );
  } else {
    const children: JSX.Element = nodeListToSolidComponents(
      node.content,
      options
    );
    if (!node.nodeType || !renderNode[node.nodeType]) {
      return <>{children}</>;
    }
    return renderNode[node.nodeType](node, children);
  }
}
