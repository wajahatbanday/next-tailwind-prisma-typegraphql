"use client";
import { CrudTable } from "@/app/admin/components/CrudTable";
import { ColumnDef } from "@/types/admin.types";
import { useUsers } from "../../hooks/useUsers";
import { User } from "@/gql/graphql";
import { formatDateToDdMmYyyyHhMm } from "@/utils/dateFormatters";

export const UsersPage = () => {
  const { users, loading } = useUsers();

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Title",
      cell: (value, row) => <div className="font-medium">{row.name}</div>,
    },
    {
      accessorKey: "email",
      header: "Slug",
      cell: (value, row) => <div className="font-medium">{row.email}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: (value, row) => <div className="font-medium">{row.role}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: (value, row) => (
        <div className="font-medium">
          {formatDateToDdMmYyyyHhMm(row.createdAt)}
        </div>
      ),
    },
  ];

  return (
    <div className="h-full p-2">
      {/* @ts-expect-error Expect Error Due To Object Structure */}
      <CrudTable<User[]>
        data={users}
        columns={columns}
        title={"Users"}
        loading={loading}
        modalSize="md"
      />
    </div>
  );
};
