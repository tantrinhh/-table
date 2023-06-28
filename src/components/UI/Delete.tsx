import React from "react";
import "react-toastify/dist/ReactToastify.css";
type DeleteModalProps = {
  showModal: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  showModal,
  onClose,
  onDelete,
}) => {
  const handleDelete = () => {
    onDelete();
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Delete Confirmation</h2>
        <p className="mb-4">Are you sure you want to delete this record?</p>
        <div className="flex justify-end">
          <div>
            <button
              className="px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>

          <button
            className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
