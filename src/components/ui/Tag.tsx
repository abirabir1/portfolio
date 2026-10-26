export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[11px] leading-none text-fg-muted">
      {children}
    </li>
  );
}

export function TagList({ tags, className = "" }: { tags: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </ul>
  );
}
