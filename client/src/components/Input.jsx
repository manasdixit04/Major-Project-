import React, { forwardRef } from "react";
import { motion } from "framer-motion";

const Input = forwardRef(function Input(
  {
    label,
    icon,
    type = "text",
    className = "",
    labelClassName = "",
    ...props
  },
  ref
) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {label && (
        <label
          className={`inline-block mb-1 pl-1 font-semibold font-serif text-md text-blue-800 ${labelClassName}`}
        >
          {label}
        </label>
      )}

      <div
        className="
          flex items-center gap-3
          bg-white border border-gray-300 rounded-2xl px-3 py-2
          shadow-sm transition-all duration-300
          hover:shadow-lg hover:-translate-y-[2px]
          focus-within:ring-2 focus-within:ring-blue-400
        "
      >
        {icon && (
          <span className="text-blue-600 flex items-center justify-center">
            {icon}
          </span>
        )}

        <input
          type={type}
          ref={ref}
          {...props}
          className={`
            w-full bg-transparent outline-none text-gray-800 placeholder-gray-400
            focus:bg-gray-50 transition-all duration-200
            ${className}
          `}
        />
      </div>
    </motion.div>
  );
});

export default Input;
