/**
 * кастомный компонент 
 */
"use client"; 

import React, { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  className = "",
  activeClassName = "",
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${className} ${isActive ? activeClassName : ""}`}
    >
      {children}
    </a>
  );
};
