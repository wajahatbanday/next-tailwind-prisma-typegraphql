import { Dispatch, SetStateAction } from "react";

export type LabelValue<T> = {
  label: string;
  value: T;
};

export type TSetterFunction<T> = Dispatch<SetStateAction<T>>;
