import { Options } from "../rich-text-solid-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import Anchor from "~/components/anchor";

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => (
      <span class="font-bold text-gray-900 dark:text-white">{text}</span>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p class="mt-2 text-gray-900 dark:text-white">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul class="my-2 list-outside list-disc">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => <li class="ml-8">{children}</li>,
    // [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
    //   <Image
    //     class="text-center shadow-lg mx-auto max-w-screen-md"
    //     contentfulId={node?.data?.target?.sys?.contentful_id}
    //   />
    // ),
    [INLINES.HYPERLINK]: (node, children) => (
      <Anchor href={node.data.uri} class="italic">
        {children}
      </Anchor>
    ),
  },
  // renderText: text => text.replace('!', '?'),
};

export default options;
