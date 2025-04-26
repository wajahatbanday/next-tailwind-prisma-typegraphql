"use client";
import React from "react";
import { useField } from "formik";

interface InputBoxProps {
  label: string;
  name: string;
  placeholder: string;
  className?: string;
  type?: string;
  labelColor?: string;
  inputClasses?: string;
}

export const InputBox: React.FC<InputBoxProps> = ({
  label,
  name,
  placeholder,
  className = "w-full",
  type = "text",
  labelColor = "text-white",
  inputClasses = "",
}) => {
  const [field, meta] = useField(name);

  return (
    <div className={`${className} flex flex-col gap-1`}>
      <div className="flex flex-row justify-between items-center px-2">
        <h1 className={`block text-sm font-montserratRegular ${labelColor}`}>
          {label}
        </h1>
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-sm ml-2">{meta.error}</div>
        ) : null}
      </div>
      <input
        {...field}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className={`${inputClasses} w-full h-[40px] px-3 py-2 font-poppinsRegular placeholder:text-xs placeholder:text-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 ${
          meta.touched && meta.error ? "border-red-500" : ""
        }`}
      />
    </div>
  );
};
