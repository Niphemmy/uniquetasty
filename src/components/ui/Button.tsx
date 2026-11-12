import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "whatsapp" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const variants: Record<Variant, string> = {
  primary: "bg-red text-white hover:bg-brown",
  secondary: "bg-ink text-cream hover:bg-brown",
  whatsapp: "bg-green text-white hover:bg-[#2c4f20]",
  ghost: "bg-transparent text-ink underline underline-offset-4 hover:text-red",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: BaseProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href">) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
