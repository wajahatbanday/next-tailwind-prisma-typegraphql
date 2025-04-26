export type ColumnDef<T> = {
  header: string;
  accessorKey: keyof T;
  cell?: (value: unknown, row: T) => React.ReactNode;
};

export type TEditComponent<T> = {
  data: T | undefined;
  onClose: () => void;
  refetch: () => void;
};
