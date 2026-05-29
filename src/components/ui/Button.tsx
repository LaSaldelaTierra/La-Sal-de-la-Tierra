import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  external?: boolean;
  "aria-label"?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-earth text-cream hover:bg-earth-dark shadow-sm hover:shadow-md",
  secondary:
    "bg-warm-beige text-earth hover:bg-sand border border-sand/50",
  outline:
    "border border-earth/30 text-earth hover:bg-earth hover:text-cream",
  ghost: "text-earth hover:bg-warm-beige/60",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-5 py-2 text-sm",
  md: "min-h-11 px-7 py-3 text-sm",
  lg: "min-h-12 w-full px-9 py-3.5 text-base sm:w-auto sm:py-4",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide transition-all duration-300 ease-out rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive disabled:opacity-50 disabled:pointer-events-none";

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href) {
    const { href, external, ...linkRest } = rest;
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...linkRest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick, disabled, ...buttonRest } = rest as ButtonAsButton;
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...buttonRest}
    >
      {children}
    </button>
  );
}
