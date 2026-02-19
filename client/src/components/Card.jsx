import React from 'react'
import { Sparkles } from "lucide-react"; // example icon if needed

function Card({
    image,
    title,
    subtitle,
    className = '',
    subtitleClassName,
    icon,              // added icon support (does not break logic)
    ...props
}) {
    return (

        <div
            className={`
                w-64 flex flex-col items-center m-2 p-6 gap-4 rounded-2xl
                bg-white shadow-md shadow-blue-100 border border-gray-200
                transition-all duration-300 cursor-pointer

                hover:shadow-xl hover:shadow-blue-300
                hover:-translate-y-1 hover:scale-[1.03]
                hover:bg-blue-50/40

                backdrop-blur-sm
                ${className}
            `}
            {...props}
        >

            {/* Icon + Image Wrapper */}
            <div className="relative flex items-center justify-center">
                {icon && (
                    <div className="absolute -top-2 -left-2 p-2 bg-blue-100 rounded-full shadow-md">
                        {icon}
                    </div>
                )}

                <img
                    src={image}
                    alt='icon'
                    className="h-20 transition-transform duration-300 hover:scale-110"
                />
            </div>

            {/* Title */}
            <p
                className="
                    text-lg font-semibold text-center font-serif
                    text-blue-800 tracking-wide
                    hover:text-blue-600 transition-colors
                "
            >
                {title}
            </p>

            {/* Subtitle */}
            <span
                className={`
                    text-sm text-gray-600
                    transition-all duration-300
                    ${subtitleClassName}
                `}
            >
                {subtitle}
            </span>
        </div>

    )
}

export default Card
