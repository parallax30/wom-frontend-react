export type RichTextBlock = {
  children?: { text: string }[];
};

export const richTextToPlainText = (
  blocks: RichTextBlock[] = []
): string =>
  blocks
    .map(block =>
      block.children?.map(child => child.text).join("") ?? ""
    )
    .join("\n\n");
