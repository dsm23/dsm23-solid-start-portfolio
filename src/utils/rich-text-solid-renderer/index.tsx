import type { JSX } from "solid-js";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import type {
  Block,
  Document,
  Inline,
  Text,
} from "@contentful/rich-text-types";
import { nodeToSolidComponent } from "./util/nodeListToSolidComponents";

const MARKS = {
  BOLD: "bold",
  ITALIC: "italic",
  UNDERLINE: "underline",
  CODE: "code",
  SUPERSCRIPT: "superscript",
  SUBSCRIPT: "subscript",
} as const;

const defaultNodeRenderers: RenderNode = {
  [BLOCKS.DOCUMENT]: (_, children) => children,
  [BLOCKS.PARAGRAPH]: (_, children) => <p>{children}</p>,
  [BLOCKS.HEADING_1]: (_, children) => <h1>{children}</h1>,
  [BLOCKS.HEADING_2]: (_, children) => <h2>{children}</h2>,
  [BLOCKS.HEADING_3]: (_, children) => <h3>{children}</h3>,
  [BLOCKS.HEADING_4]: (_, children) => <h4>{children}</h4>,
  [BLOCKS.HEADING_5]: (_, children) => <h5>{children}</h5>,
  [BLOCKS.HEADING_6]: (_, children) => <h6>{children}</h6>,
  [BLOCKS.EMBEDDED_ENTRY]: (_, children) => <div>{children}</div>,
  [BLOCKS.EMBEDDED_RESOURCE]: (_, children) => <div>{children}</div>,
  [BLOCKS.UL_LIST]: (_, children) => <ul>{children}</ul>,
  [BLOCKS.OL_LIST]: (_, children) => <ol>{children}</ol>,
  [BLOCKS.LIST_ITEM]: (_, children) => <li>{children}</li>,
  [BLOCKS.QUOTE]: (_, children) => <blockquote>{children}</blockquote>,
  [BLOCKS.HR]: () => <hr />,
  [BLOCKS.TABLE]: (_, children) => (
    <table>
      <tbody>{children}</tbody>
    </table>
  ),
  [BLOCKS.TABLE_ROW]: (_, children) => <tr>{children}</tr>,
  [BLOCKS.TABLE_HEADER_CELL]: (_, children) => <th>{children}</th>,
  [BLOCKS.TABLE_CELL]: (_, children) => <td>{children}</td>,
  [INLINES.ASSET_HYPERLINK]: (node) =>
    defaultInline(INLINES.ASSET_HYPERLINK, node as Inline),
  [INLINES.ENTRY_HYPERLINK]: (node) =>
    defaultInline(INLINES.ENTRY_HYPERLINK, node as Inline),
  [INLINES.RESOURCE_HYPERLINK]: (node) =>
    defaultInlineResource(INLINES.RESOURCE_HYPERLINK, node as Inline),
  [INLINES.EMBEDDED_ENTRY]: (node) =>
    defaultInline(INLINES.EMBEDDED_ENTRY, node as Inline),
  [INLINES.EMBEDDED_RESOURCE]: (node) =>
    defaultInlineResource(INLINES.EMBEDDED_RESOURCE, node as Inline),
  [INLINES.HYPERLINK]: (node, children) => (
    <a href={node.data.uri}>{children}</a>
  ),
};

const defaultMarkRenderers: RenderMark = {
  [MARKS.BOLD]: (text) => <b>{text}</b>,
  [MARKS.ITALIC]: (text) => <i>{text}</i>,
  [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
  [MARKS.CODE]: (text) => <code>{text}</code>,
  [MARKS.SUPERSCRIPT]: (text) => <sup>{text}</sup>,
  [MARKS.SUBSCRIPT]: (text) => <sub>{text}</sub>,
};

function defaultInline(_: string, node: Inline): JSX.Element {
  return (
    <span>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      type: {node.nodeType} id: {node.data.target.sys.id}
    </span>
  );
}

function defaultInlineResource(_: string, node: Inline) {
  return (
    <span>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      type: {node.nodeType} urn: {node.data.target.sys.urn}
    </span>
  );
}

export type CommonNode = Text | Block | Inline;

export interface NodeRenderer {
  (node: Block | Inline, children: JSX.Element): JSX.Element;
}

export interface RenderNode {
  [k: string]: NodeRenderer;
}

export interface RenderMark {
  [k: string]: (text: JSX.Element) => JSX.Element;
}

export interface RenderText {
  (text: string): JSX.Element;
}

export interface Options {
  /**
   * Node renderers
   */
  renderNode?: RenderNode;
  /**
   * Mark renderers
   */
  renderMark?: RenderMark;
  /**
   * Text renderer
   */
  renderText?: RenderText;
  /**
   * Keep line breaks and multiple spaces
   */
  preserveWhitespace?: boolean;
}

/**
 * Serialize a Contentful Rich Text `document` to React tree
 */
export function documentToSolidComponents(
  richTextDocument: Document,
  options: Options = {},
): JSX.Element {
  if (!richTextDocument) {
    return null;
  }

  return nodeToSolidComponent(richTextDocument, {
    renderNode: {
      ...defaultNodeRenderers,
      ...options.renderNode,
    },
    renderMark: {
      ...defaultMarkRenderers,
      ...options.renderMark,
    },
    renderText: options.renderText,
    preserveWhitespace: options.preserveWhitespace,
  });
}
