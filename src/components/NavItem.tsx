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

  const baseClass = "text-white cursor-pointer hover:underline transition";

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
