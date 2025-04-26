"use client";
import { useState } from "react";
import {
  Edit,
  // Trash2,
  Plus,
} from "lucide-react";
import { Modal } from "../Modal";
import { ColumnDef } from "@/types/admin.types";

export type EditComponentProps<T> = {
  data?: T | undefined;
  onClose: () => void;
  refetch?: () => void;
};

export type DeleteComponentProps<T> = {
  data: T;
  onClose: () => void;
  refetch?: () => void;
};

export type CrudTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  title: string;
  EditComponent?: React.ComponentType<EditComponentProps<T>>;
  DeleteComponent?: React.ComponentType<DeleteComponentProps<T>>;
  loading?: boolean;
  emptyMessage?: string;
  modalSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "fullscreen";
};

export function CrudTable<T extends { id: string | number }>({
  data,
  columns,
  title,
  EditComponent,
  // DeleteComponent,
  loading = false,
  emptyMessage = "No data available. Click New Record to add your first entry.",
  modalSize = "fullscreen",
}: CrudTableProps<T>) {
  const [editItem, setEditItem] = useState<T | undefined>(undefined);
  // const [deleteItem, setDeleteItem] = useState<T | undefined>(undefined);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Handle edit action
  const handleEdit = (item: T) => {
    setEditItem(item);
  };

  // Handle create action
  const handleCreate = () => {
    setShowCreateModal(true);
  };

  // Handle delete action
  // const handleDelete = (item: T) => {
  //   setDeleteItem(item);
  // };

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-2 shrink-0 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-primary">{title}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {data.length} entries found
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-primary hover:bg-primary/80 text-white px-5 py-2.5 rounded-md transition-colors flex items-center gap-2 shadow-sm font-medium cursor-pointer"
        >
          <Plus size={18} />
          <span>New Record</span>
        </button>
      </div>

      {/* Toolbar with search */}
      {/* <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex-1 max-w-md relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={"TO_UPDATE"}
            onChange={() => {}}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div> */}

      {/* Table Container */}
      <div className="px-2 py-2 flex-grow overflow-auto">
        <div className="border border-gray-200 rounded-lg h-full flex flex-col overflow-hidden bg-white">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <div className="flex items-center">
              <div className="py-2 px-4 font-medium w-24 text-gray-700">ID</div>
              {columns.map((column) => (
                <div
                  key={String(column.accessorKey)}
                  className="py-2 px-4 font-medium uppercase text-xs tracking-wider flex-1 text-gray-700"
                >
                  {column.header}
                </div>
              ))}
              <div className="py-3.5 px-4 text-right uppercase text-xs tracking-wider font-medium w-24 text-gray-700">
                Actions
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="overflow-y-auto flex-grow min-h-0">
            {loading ? (
              <div className="flex items-center justify-center h-full p-8">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                  <div className="text-lg text-gray-500">Loading data...</div>
                </div>
              </div>
            ) : data.length === 0 ? (
              <div className="flex items-center justify-center h-full p-8">
                <div className="text-center">
                  <div className="text-5xl mb-4 text-gray-400">📊</div>
                  <div className="text-lg text-gray-500">{emptyMessage}</div>
                </div>
              </div>
            ) : (
              data.map((row, index) => (
                <div
                  key={String(row.id) || index}
                  className="flex items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="py-3.5 px-4 font-medium w-24 text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                      ...{row.id.toString().slice(-5)}
                    </span>
                  </div>
                  {columns.map((column) => (
                    <div
                      key={String(column.accessorKey)}
                      className="py-3.5 px-4 flex-1 overflow-hidden text-ellipsis text-gray-600"
                    >
                      {column.cell
                        ? column.cell(row[column.accessorKey], row)
                        : String(row[column.accessorKey] || "")}
                    </div>
                  ))}
                  <div className="py-3.5 px-4 w-24">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(row)}
                        className="p-1.5 text-gray-500 hover:text-primary transition-colors cursor-pointer bg-gray-100 hover:bg-gray-200 rounded"
                        aria-label="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      {/* <button
                        onClick={() => handleDelete(row)}
                        className="p-1.5 text-gray-500 hover:text-red-600 transition-colors cursor-pointer bg-gray-100 hover:bg-gray-200 rounded"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button> */}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {EditComponent && (
        <Modal
          isOpen={!!editItem}
          onClose={() => setEditItem(undefined)}
          title={`Edit ${title}`}
          size={modalSize}
          padding={false}
        >
          {editItem && (
            <EditComponent
              data={editItem}
              onClose={() => setEditItem(undefined)}
            />
          )}
        </Modal>
      )}

      {/* Create Modal */}
      {EditComponent && (
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title={`Create New ${title}`}
          size={modalSize}
          padding={false}
        >
          <EditComponent onClose={() => setShowCreateModal(false)} />
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {/* {DeleteComponent && deleteItem && (
        <Modal
          isOpen={!!deleteItem}
          onClose={() => setDeleteItem(undefined)}
          title={`Delete ${title}`}
          size="sm"
        >
          <DeleteComponent
            data={deleteItem}
            onClose={() => setDeleteItem(undefined)}
          />
        </Modal>
      )} */}
    </div>
  );
}
