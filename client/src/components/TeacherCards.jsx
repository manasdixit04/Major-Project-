import React from "react";
import { BarChart3, Users } from "lucide-react";

function TeacherCards({ title, count, image, className = " ", ...props }) {
  return (
    <div className="w-full">
      <div
        className="
                    p-4  rounded-xl bg-white shadow-md hover:shadow-lg  hover:-translate-y-1 
                    transition-all duration-300 cursor-pointer hover:shadow-blue-300"
      >
        <div className="flex justify-between items-center">
          <p
            className={`text-2xl font-serif text-blue-900 flex items-center gap-2 ${className}`}
            {...props}
          >
            <Users className="h-6 w-6 text-blue-600" />
            {title}
          </p>
        </div>

        <div className="flex flex-row justify-between items-center">
         
          <p
            className={`
                        text-4xl font-bold ml-10 mt-3 text-blue-700 tracking-wide
                        ${className}
                    `}
            {...props}
          >
            {count}
          </p>

           {image && (
            <img
              src={image}
              alt="icon"
              className={`h-16 rounded-lg hover:scale-110 transition-transform duration-300 ${className}`}
              {...props}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherCards;
