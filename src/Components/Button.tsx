import type { ReactElement } from "react";
import { motion } from "framer-motion";

interface Buttonprops {
  variant: "Primary" | "Secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loding?: boolean;
}

const variantClasses = {
  Primary: "bg-purple-600 text-white hover:bg-purple-500",
  Secondary: "bg-purple-200 text-purple-600 hover:opacity-80",
};

const defaultStyles =
  "px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-2 border-gray-900 shadow-md";

export function Button({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  loding,
}: Buttonprops) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={
        variantClasses[variant] +
        " " +
        defaultStyles +
        `${fullWidth ? " w-full" : ""} ${
          loding ? " opacity-60 cursor-not-allowed" : ""
        }`
      }
      disabled={loding}
    >
      {loding ? (
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Loading...
        </div>
      ) : (
        <>
          {startIcon && <div className="pr-1">{startIcon}</div>}
          {text}
        </>
      )}
    </motion.button>
  );
}
