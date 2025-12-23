import React from "react";

export type RichTextBlock = {
  children?: { text: string }[];
};

export const richTextToPlainText = (
  blocks?: RichTextBlock[] | null
): string => {
  if (!Array.isArray(blocks)) return "";

  return blocks
    .map(block =>
      block.children?.map(child => child.text).join("") ?? ""
    )
    .join("\n\n");
};



export const richTextToReact = (blocks?: any[]) => {
  if (!Array.isArray(blocks)) return null;

  return blocks.map((block, i) => {
    if (block.type !== "paragraph") return null;

    return (
      <p key={i} className="mb-4">
        {block.children?.map((child: any, j: number) => {
          let content = child.text || "";

          if (child.bold) {
            content = <strong key={j}>{content}</strong>;
          }

          return <React.Fragment key={j}>{content}</React.Fragment>;
        })}
      </p>
    );
  });
};
