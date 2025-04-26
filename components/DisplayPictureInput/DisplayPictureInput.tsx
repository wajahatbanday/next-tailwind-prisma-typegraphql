"use client";
import React, { ChangeEvent, useRef } from "react";
import { useField } from "formik";
import { useUploadFile } from "@/hooks/useUploadFile";
import { Icon } from "@/components";

export type DisplayPictureInputProps = {
  name: string;
  className?: string;
};

export const DisplayPictureInput: React.FC<DisplayPictureInputProps> = ({
  name,
  className = "w-[100px] h-[100px]",
}) => {
  const [field, meta, helpers] = useField(name);
  const hiddenFileInputRef = useRef<HTMLInputElement>(null);
  const { upload, isLoading } = useUploadFile();

  const handleUploadButtonClick = () => {
    hiddenFileInputRef.current?.click();
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    if (file) {
      const uploadedUrl = await upload(file);
      if (uploadedUrl) {
        helpers.setValue(uploadedUrl);
      }
    }
  };

  const isError = meta.error && meta.touched;

  return (
    <>
      <div
        className={`${className} rounded-full cursor-pointer flex justify-center items-center relative`}
      >
        <div
          className="absolute bottom-2 right-2 z-10 bg-primary rounded-full p-[5px] cursor-pointer"
          onClick={handleUploadButtonClick}
        >
          <Icon name={"edit"} size={14} color="white" />
        </div>
        {isLoading && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary to-white animate-spin" />
        )}
        {isError && (
          <div className="absolute inset-0 rounded-full bg-red-500" />
        )}
        <div className="w-[93%] h-[93%] rounded-full bg-white absolute flex justify-center items-center">
          {field.value ? (
            <div
              className="w-full h-full rounded-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${field.value})`,
              }}
            />
          ) : (
            <Icon
              name={"user"}
              width={"100%"}
              height={"100%"}
              strokeWidth={0.5}
            />
          )}
        </div>
      </div>
      <input
        ref={hiddenFileInputRef}
        name={name}
        onChange={onChange}
        type="file"
        style={{ cursor: "pointer", display: "none", width: "100%" }}
      />
    </>
  );
};
