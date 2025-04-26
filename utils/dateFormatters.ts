import { format } from "date-fns";

export const formatDateToDdMmYyyy = (date: Date | undefined): string => {
  if (!date) return "";
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

export const formatDateToHhMm = (date: Date | undefined): string => {
  if (!date) return "";
  return format(date, "HH:mm");
};

export const formatDateToDdMm = (date: Date | undefined): string => {
  if (!date) return "";
  return format(date, "dd-MMM");
};

export const formatDateToDdMmYyyyHhMm = (date: Date | undefined): string => {
  if (!date) return "";
  return format(date, "dd-MMM-yyyy");
};
