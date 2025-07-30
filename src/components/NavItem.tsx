"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type NavItemProps = {
  label: string;
  href: string;
  scroll?: boolean;
  isHome?: boolean;
};

export default function NavItem({ label, href }: NavItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  const baseClass = `${
    pathname === "/"
      ? "text-gray-50 hover:border-white/40"
      : "text-gray-400 hover:border-gray-300"
  } cursor-pointer border-b-2 border-transparent   transition duration-300 ease-in-out`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.split("#")[1];

      if (pathname === "/") {
        // Already on home, scroll directly
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to home, then scroll after hydration
        router.push(`/#${targetId}`);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={baseClass}>
      {label}
    </Link>
  );
}
