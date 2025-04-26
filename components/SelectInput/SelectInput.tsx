"use client";
import React from "react";
import { useField } from "formik";
import AsyncSelect from "react-select/async";
import { MultiValue, SingleValue, StylesConfig } from "react-select";
import { LabelValue } from "@/types/general.types";

type SelectInputProps<T> = {
  name: string;
  placeholder: string;
  label: string;
  labelColor?: string;
  options: LabelValue<T>[];
  className?: string;
  isMulti?: boolean;
  zIndex?: number;
};

export const SelectInput = <T,>(
  props: SelectInputProps<T>
): React.ReactElement => {
  const {
    label,
    labelColor = "text-white",
    name,
    options,
    placeholder,
    className = "w-full",
    isMulti = false,
    zIndex = 1,
  } = props;

  const [field, meta, helpers] = useField(name);

  const handleChange = (
    option: MultiValue<LabelValue<T>> | SingleValue<LabelValue<T>>
  ) => {
    helpers.setValue(option);
  };

  const styles: StylesConfig<LabelValue<T>, boolean> = {
    container: (state) => ({
      // ...provided,
      borderColor: state.isFocused ? "#06ba00" : "#fff",
      width: "100%",
      zIndex,
    }),
    control: (provided) => ({
      ...provided,
      display: "flex",
      minHeight: 40,
      borderRadius: 6,
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: 12,
      fontFamily: "PoppinsRegular",
      color: "#9CA3AF",
    }),
  };

  const loadOptions = async (inputValue: string): Promise<LabelValue<T>[]> => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  return (
    <div className={`${className} flex flex-col gap-1`}>
      <div className="flex flex-row justify-between items-center px-2">
        <h1 className={`block text-sm font-poppinsRegular ${labelColor}`}>
          {label}
        </h1>
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-sm ml-2">{meta.error}</div>
        ) : null}
      </div>
      <AsyncSelect<LabelValue<T>, boolean>
        isMulti={isMulti}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        loadOptions={loadOptions}
        cacheOptions
        defaultOptions={options}
        styles={styles}
        defaultValue={field.value}
      />
    </div>
  );
};
