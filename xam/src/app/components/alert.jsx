import React, { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

export default function Alert({
  type = "success",
  message = "Action completed successfully",
  dismiss,
}) {
  const [isFading, setIsFading] = useState(false);

  const typeStyles = {
    success: {
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      iconColor: "text-green-400",
      icon: <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />,
    },
    error: {
      bgColor: "bg-red-50",
      textColor: "text-red-800",
      iconColor: "text-red-400",
      icon: <ExclamationCircleIcon className="h-5 w-5" aria-hidden="true" />,
    },
    info: {
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
      iconColor: "text-blue-400",
      icon: <InformationCircleIcon className="h-5 w-5" aria-hidden="true" />,
    },
  };

  const { bgColor, textColor, iconColor, icon } =
    typeStyles[type] || typeStyles.success;

  useEffect(() => {
    // Start fade-out after 2.5 seconds
    const fadeTimeout = setTimeout(() => setIsFading(true), 2500);
    // Dismiss alert completely after 3 seconds
    const dismissTimeout = setTimeout(() => dismiss(), 3000);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(dismissTimeout);
    };
  }, [dismiss]);

  return (
    <div
      className={`rounded-md p-4 transition-all duration-500 ${bgColor} ${
        isFading ? "fade-out" : ""
      }`}
    >
      <div className="flex">
        <div className={`flex-shrink-0 ${iconColor}`}>{icon}</div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={dismiss}
              className={`inline-flex rounded-md p-1.5 ${bgColor} ${textColor} hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2`}
              aria-label="Dismiss alert"
            >
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
