import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  to,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center transition-all duration-300 tracking-widest uppercase font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed rounded-sm active:scale-95";

  const variants = {
    primary:
      "bg-[#c9a36b] text-black border border-[#c9a36b] hover:bg-white hover:border-white hover:text-black",
    secondary:
      "bg-transparent text-white border border-white hover:bg-white hover:text-black",
    outline:
      "bg-transparent text-[#c9a36b] border border-[#c9a36b] hover:bg-[#c9a36b] hover:text-black",
    ghost: "text-[#c9a36b] hover:text-white bg-transparent",
  };

  const sizes = {
    sm: "px-6 py-2 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-base",
  };

  const classes = twMerge(clsx(baseStyles, variants[variant], sizes[size], className));

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
  
export default Button;
