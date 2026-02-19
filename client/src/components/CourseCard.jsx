import React, { useEffect, useState } from "react";
import { Pencil, Trash2, User2, BookOpen } from "lucide-react";

function CourseCard({
  title,
  description,
  createdBy,
  onPreview,
  image,
  progress,
  btnEdit,
  btnDelete,
  onEdit,
  onDelete,
}) {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.user?.role) {
          setUserRole(user.user.role);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <div
      className="
       w-[300px] m-4 p-4 rounded-xl bg-white shadow-md border border-gray-200
       hover:shadow-xl hover:-translate-y-1 hover:border-blue-400
       transition-all duration-300 overflow-hidden cursor-pointer
      "
      onClick={onPreview}
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-lg"
        />
      )}

      <div className="mt-4">
        <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
          <BookOpen className="text-blue-600" />
          {title}
        </h2>

        <p className="text-gray-600 mt-1 text-sm leading-snug">{description}</p>

        <p className="text-gray-500 flex items-center gap-1 mt-1 text-sm">
          <User2 className="h-4 w-4 text-blue-500" />
          Created by: <span className="font-medium text-gray-700">{createdBy}</span>
        </p>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-700 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Admin Buttons */}
        {userRole === "Admin" && (
          <div className="flex gap-2 mt-4">
            <button
              className="
                flex items-center gap-1 px-3 py-1.5 text-sm
                bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg
                shadow-sm hover:shadow-md transition-all duration-300 active:scale-95
              "
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
            >
              <Pencil className="h-4 w-4" />
              {btnEdit}
            </button>

            <button
              className="
                flex items-center gap-1 px-3 py-1.5 text-sm
                bg-red-500 hover:bg-red-600 text-white rounded-lg
                shadow-sm hover:shadow-md transition-all duration-300 active:scale-95
              "
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
            >
              <Trash2 className="h-4 w-4" />
              {btnDelete}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;





