"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type NavItemProps =
  | {
      label: string;
      href: string;
      scroll?: boolean;
      isHome?: false;
    }
  | {
      label: string;
      isHome: true;
    };

export default function NavItem(props: NavItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  const baseClass = `${
    pathname === "/" ? "text-gray-50" : "text-gray-400"
  } cursor-pointer border-b-2 border-transparent hover:border-gray-300 transition`;

  if (props.isHome) {
    const handleClick = () => {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
    };

    return (
      <button className={baseClass} onClick={handleClick}>
        {props.label}
      </button>
    );
  }

  return (
    <Link href={props.href} scroll={props.scroll ?? true} className={baseClass}>
      {props.label}
    </Link>
  );
}
