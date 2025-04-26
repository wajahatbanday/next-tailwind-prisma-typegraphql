"use client";
import React, { ChangeEvent, useRef } from "react";
import { useField } from "formik";
import { Icon } from "../Icon";
import { useUploadFile } from "@/hooks/useUploadFile";
import { Loading } from "../Loading";

export type FileInputBoxProps = {
  label: string;
  labelColor?: string;
  name: string;
  containerClasses?: string;
};

export const FileInputBox: React.FC<FileInputBoxProps> = ({
  name,
  label,
  labelColor = "text-white",
  containerClasses = "w-full",
}) => {
  const [field, meta, helpers] = useField(name);
  const { upload, isLoading } = useUploadFile();
  const hiddenFileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadButtonClick = (): void => {
    hiddenFileInputRef.current?.click();
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    if (!file) return;
    try {
      const uploadedUrl = await upload(file);
      if (uploadedUrl) {
        helpers.setValue(uploadedUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const viewFile = () => {
    if (field.value) {
      window.open(field.value, "_blank");
    }
  };

  const deleteFile = () => {
    helpers.setValue("");
  };

  return (
    <div className={`${containerClasses} flex flex-col gap-1`}>
      <div className="flex flex-row justify-between items-center px-2">
        <h1 className={`block text-sm font-montserratRegular ${labelColor}`}>
          {label}
        </h1>
      </div>

      <div className="rounded-md w-full h-[200px] flex justify-center items-center gap-3 bg-white">
        {field.value ? (
          <div className="w-full h-full flex flex-row p-1 gap-2">
            <div
              className="bg-center bg-cover rounded-sm w-[80%] h-full"
              style={{
                backgroundImage: `url(${field.value})`,
              }}
            ></div>
            <div className="h-full w-[20%] flex flex-col justify-center items-center gap-4">
              <Icon
                name="view"
                size={32}
                className="text-primary cursor-pointer"
                onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                  e.stopPropagation();
                  viewFile();
                }}
              />
              <Icon
                name="edit"
                size={32}
                className="text-primary cursor-pointer"
                onClick={handleUploadButtonClick}
              />
              <Icon
                name="trash"
                size={32}
                className="text-primary cursor-pointer"
                onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                  e.stopPropagation();
                  deleteFile();
                }}
              />
            </div>
          </div>
        ) : (
          <div className=" p-1 flex flex-col gap-2 items-center">
            {isLoading ? (
              <>
                <Loading className="text-primary" size={44} />
                <span className="text-lg font-montserratRegular">
                  Uploading...
                </span>
              </>
            ) : (
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={handleUploadButtonClick}
              >
                <Icon name="upload" size="44" className="text-primary" />
                <span className={"text-lg text-gray-500"}>Upload</span>
              </div>
            )}
            {meta.error && (
              <span className="text-red-500 text-sm">{meta.error}</span>
            )}
          </div>
        )}
      </div>
      <input
        ref={hiddenFileInputRef}
        name={name}
        onChange={onChange}
        type="file"
        style={{ cursor: "pointer", display: "none", width: "100%" }}
      />
    </div>
  );
};
