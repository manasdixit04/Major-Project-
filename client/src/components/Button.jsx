import React from "react";
import { Loader2 } from "lucide-react";

function Button({
  children,
  type = "button",
  icon: Icon, // optional icon
  loading = false, // optional loader
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        flex items-center justify-center gap-2
        py-2 px-6 rounded-lg font-medium
        bg-blue-600 text-white
        shadow-md border border-blue-700
        hover:bg-blue-700 hover:shadow-lg 
        transition-all duration-300 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin h-5 w-5" />
      ) : (
        Icon && <Icon className="h-5 w-5 text-white" />
      )}

      {children}
    </button>
  );
}

export default Button;
