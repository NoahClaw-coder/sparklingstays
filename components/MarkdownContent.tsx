import React from 'react';

function parseInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-[#1c2333]">{part.slice(2, -2)}</strong>;
    }
    return part || null;
  }).filter((p) => p !== null && p !== '') as React.ReactNode[];
}

function parseBlock(block: string, index: number): React.ReactNode {
  const lines = block.trim().split('\n');
  if (!lines.length || !lines[0]) return null;
  const firstLine = lines[0].trim();

  // ## Heading
  if (firstLine.startsWith('## ')) {
    return (
      <h2 key={index} className="mt-8 mb-3 text-2xl font-semibold leading-tight text-[#1c2333] first:mt-0">
        {parseInline(firstLine.slice(3).trim())}
      </h2>
    );
  }

  // ### Heading — possibly followed by bullet items on subsequent lines
  if (firstLine.startsWith('### ')) {
    const heading = firstLine.slice(4).trim();
    const restLines = lines.slice(1);
    const listItems = restLines.filter(l => l.trim().startsWith('- '));
    const otherText = restLines
      .filter(l => !l.trim().startsWith('- ') && l.trim())
      .join(' ');

    return (
      <React.Fragment key={index}>
        <h3 className="mt-6 mb-2 text-[18px] font-semibold text-[#1c2333]">
          {parseInline(heading)}
        </h3>
        {listItems.length > 0 && (
          <ul className="mb-3 ml-5 list-disc space-y-1 text-[15px] leading-7 text-[#4c5565]">
            {listItems.map((l, j) => (
              <li key={j}>{parseInline(l.trim().slice(2))}</li>
            ))}
          </ul>
        )}
        {otherText && (
          <p className="mt-2 text-[16px] leading-8 text-[#4c5565]">{parseInline(otherText)}</p>
        )}
      </React.Fragment>
    );
  }

  // Pure list block (every non-empty line starts with `- `)
  const nonEmpty = lines.filter(l => l.trim());
  const listLines = lines.filter(l => l.trim().startsWith('- '));
  if (listLines.length > 0 && listLines.length === nonEmpty.length) {
    return (
      <ul key={index} className="mt-4 ml-5 list-disc space-y-1 text-[15px] leading-7 text-[#4c5565]">
        {listLines.map((l, j) => (
          <li key={j}>{parseInline(l.trim().slice(2))}</li>
        ))}
      </ul>
    );
  }

  // Regular paragraph
  return (
    <p key={index} className="mt-4 text-[16px] leading-8 text-[#4c5565] first:mt-0">
      {parseInline(block.trim())}
    </p>
  );
}

/** Strip markdown syntax for plain-text excerpts (e.g. blog listing previews). */
export function stripMarkdown(text: string): string {
  return text
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/^-\s+/gm, '')
    .replace(/\n+/g, ' ')
    .trim();
}

interface Props {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className }: Props) {
  const blocks = content.split(/\n\n+/);
  return (
    <div className={className}>
      {blocks.map((block, i) => parseBlock(block, i))}
    </div>
  );
}
