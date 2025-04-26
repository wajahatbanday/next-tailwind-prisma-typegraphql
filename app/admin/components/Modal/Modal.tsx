"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "fullscreen";
  padding?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  padding = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Don't close if clicking on CKEditor UI elements
      const target = e.target as HTMLElement;

      // Check if the click is on a CKEditor UI element
      const isCKEditorElement =
        target.closest(".ck") || // Any CKEditor element
        target.closest(".ck-balloon-panel") || // Dropdowns and dialogs
        target.closest(".ck-body-wrapper"); // Additional CKEditor UI containers

      if (isCKEditorElement) {
        return; // Don't close the modal if clicking on CKEditor UI
      }

      if (modalRef.current && !modalRef.current.contains(target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full mx-4",
    fullscreen: "max-w-[95vw] w-[95vw] h-[90vh] mx-auto",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
      <div
        ref={modalRef}
        className={`${
          sizeClasses[size]
        } w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-50 animate-in fade-in-50 zoom-in-95 duration-200 ${
          size === "fullscreen" ? "flex flex-col" : ""
        }`}
      >
        {title && (
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div
          className={`${padding ? "p-6" : "p-0"} ${
            size === "fullscreen"
              ? "flex-1 overflow-auto"
              : "max-h-[calc(90vh-4rem)] overflow-y-auto"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
