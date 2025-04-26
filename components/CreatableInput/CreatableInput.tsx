"use client";
import React from "react";
import { useField } from "formik";
import Creatable from "react-select/creatable";
import { MultiValue, StylesConfig } from "react-select";
import { LabelValue } from "@/types/general.types";

type CreatableInputProps = {
  name: string;
  placeholder: string;
  label: string;
  labelColor?: string;
  className?: string;
  zIndex?: number;
};

export const CreatableInput: React.FC<CreatableInputProps> = ({
  label,
  labelColor = "text-white",
  name,
  placeholder,
  className = "",
  zIndex = 1,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (newValue: MultiValue<LabelValue<string>>) => {
    helpers.setValue(newValue || []);
  };

  const styles: StylesConfig<LabelValue<string>, true> = {
    container: (state) => ({
      width: "100%",
      zIndex,
      borderColor: state.isFocused ? "#06ba00" : "#fff",
    }),
    control: (provided) => ({
      ...provided,
      display: "flex",
      minHeight: 40,
      borderRadius: 6,
      border:
        meta.touched && meta.error ? "1px solid #EF4444" : provided.border,
      "&:hover": {
        border:
          meta.touched && meta.error ? "1px solid #EF4444" : provided.border,
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: 12,
      fontFamily: "PoppinsRegular",
      color: "#9CA3AF",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#2563EB"
        : state.isFocused
        ? "#DBEAFE"
        : "white",
      color: state.isSelected ? "white" : "#374151",
      cursor: "pointer",
      "&:active": {
        backgroundColor: state.isSelected ? "#2563EB" : "#DBEAFE",
      },
    }),
  };

  const formatCreateLabel = (inputValue: string) => `Add "${inputValue}"`;

  const handleCreate = (inputValue: string) => {
    const newOption = { label: inputValue, value: inputValue };
    const currentValue = field.value || [];
    helpers.setValue([...currentValue, newOption]);
  };

  return (
    <div className={`${className} flex flex-col gap-1`}>
      <div className="flex flex-row justify-between items-center px-2">
        <h1 className={`block text-sm ${labelColor} font-montserratRegular`}>
          {label}
        </h1>
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-sm ml-2">{meta.error}</div>
        ) : null}
      </div>
      <Creatable<LabelValue<string>, true>
        isMulti={true}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        styles={styles}
        value={field.value || []}
        formatCreateLabel={formatCreateLabel}
        onCreateOption={handleCreate}
        noOptionsMessage={() => "Type to add new options.."}
        classNamePrefix="react-select"
        isClearable
        options={[]}
      />
    </div>
  );
};
