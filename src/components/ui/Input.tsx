import { cn } from "@/lib/utils";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  id: string;
  children?: ReactNode;
};

export function Field({ label, hint, error, id, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-inkSoft">{hint}</p>
      )}
      {error && <p className="text-xs text-red font-semibold">{error}</p>}
    </div>
  );
}

export const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(function Input({ className, ...rest }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "rounded-lg border border-ink/15 bg-cream px-3 py-2.5 text-sm text-ink",
        "focus:outline-none focus:ring-2 focus:ring-red/50",
        className
      )}
      {...rest}
    />
  );
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<"textarea">
>(function Textarea({ className, ...rest }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "rounded-lg border border-ink/15 bg-cream px-3 py-2.5 text-sm text-ink",
        "focus:outline-none focus:ring-2 focus:ring-red/50 min-h-24",
        className
      )}
      {...rest}
    />
  );
});

export const Select = forwardRef<
  HTMLSelectElement,
  ComponentPropsWithoutRef<"select">
>(function Select({ className, children, ...rest }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        "rounded-lg border border-ink/15 bg-cream px-3 py-2.5 text-sm text-ink",
        "focus:outline-none focus:ring-2 focus:ring-red/50",
        className
      )}
      {...rest}
    >
      {children}
    </select>
  );
});
