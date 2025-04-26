"use client";

import { useField } from "formik";

type ToggleButtonProps = {
  label: string;
  labelColor?: string;
  className?: string;
  name: string;
};

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  labelColor,
  className,
  name,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleToggle = () => {
    helpers.setValue(!field.value);
  };

  const isTrue = field.value;

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
      <div
        className={`w-[80px] h-[35px] ${
          isTrue ? "bg-success" : "bg-error"
        } rounded-full relative flex items-center transition-colors duration-300 ease-in-out`}
      >
        <div
          className={`w-[28px] h-[28px] bg-white rounded-full flex items-center absolute justify-center transition-all duration-300 ease-in-out cursor-pointer ${
            isTrue ? "translate-x-[48px]" : "translate-x-[4px]"
          }`}
          onClick={handleToggle}
        >
          <div
            className={`w-[30%] h-[30%] ${
              isTrue ? "bg-success" : "bg-error"
            } rounded-full transition-colors duration-300 ease-in-out`}
          />
        </div>
      </div>
    </div>
  );
};
