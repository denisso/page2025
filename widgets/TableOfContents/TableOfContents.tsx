import React from "react";
import type { NodeHeader, RootHeader } from "@/shared/lib/markdown";

const UL = ({ children }: { children: React.ReactNode }) => {
  return <ul>{children}</ul>;
};

const LI = ({
  children,
  title,
  id,
}: {
  children: React.ReactNode;
  title: string;
  id: string;
}) => {
  return (
    <li>
      <div>
        <a href={"#" + id}>{title}</a>
      </div>
      <div>{children}</div>
    </li>
  );
};

function createTableOfContents(headers: NodeHeader) {
  const childrenUL: React.ReactNode[] = [];
  for (const child of headers.children) {
    const children = createTableOfContents(child);
    const li = (
      <LI key={child.id} title={child.title} id={child.id}>
        {children}
      </LI>
    );
    childrenUL.push(li);
  }
  const node = <UL>{childrenUL}</UL>;
  return node;
}

type TOCProps = {
  headers: RootHeader;
};

export const TableOfContents = ({ headers }: TOCProps) => {
  return <>{createTableOfContents(headers as NodeHeader)}</>;
};
