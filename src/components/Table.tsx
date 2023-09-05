import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../stores/Storee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowUp,
  faArrowDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchEmployeeData,
  removeRow,
  setSearchKeyword,
  setSearchResult,
  setCurrentPage,
  setSortField,
  setSortDirection,
  sortTable,
  setStoreDelete,
} from "../stores/TableSlice";
import { addData, updateData } from "../stores/TableSlice";
import Pagination from "./Pagination";
import axios from "axios";
import { Dispatch } from "redux";
import DeleteModal from "./UI/Delete";
//import { useNavigate } from "react-router-dom";
library.add(faArrowUp, faArrowDown, faSearch);
type SortDirection = "asc" | "desc";
interface Employee {
  id: string;
  name: string;
  phone: string;
  street: string;
}
export const Tablee = () => {
  const table = useSelector((state: RootState) => state.table.data);
  const searchKeyword = useSelector(
    (state: RootState) => state.table.searchKeyword
  );
  const suggestions = useSelector(
    (state: RootState) => state.table.suggestions
  );
  const searchResult = useSelector(
    (state: RootState) => state.table.searchResult
  );
  const currentPage = useSelector(
    (state: RootState) => state.table.currentPage
  );
  const totalItems = useSelector((state: RootState) => state.table.totalItems);
  const itemsPerPage = 5; // Số mục trên mỗi trang
  const sortField = useSelector((state: RootState) => state.table.sortField);
  const sortDirection = useSelector(
    (state: RootState) => state.table.sortDirection
  );
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<any>>();
  //
  const handleAddData = (event: React.MouseEvent) => {
    event.preventDefault();

    navigate("/formtodo");
    // dispatch(addData(formData));
  };
  // console.log(typeof handleAddData);

  useEffect(() => {
    dispatch(fetchEmployeeData());
  }, [dispatch]);

  const handleRemoveRow = async (recordIdToDelete: string) => {
    setShowModal(true);
    dispatch(setStoreDelete(recordIdToDelete));
  };

  //tim kiem
  const handleSearch = (keyword: string) => {
    dispatch(setSearchKeyword(keyword));

    // Perform search logic here
    const filteredData = table.filter((row) =>
      row.name.toLowerCase().includes(keyword.toLowerCase())
    );
    dispatch(setSearchResult(filteredData));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    handleSearch(keyword);
  };
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  let dataToDisplay = [...table];

  if (searchKeyword !== "") {
    dataToDisplay = searchResult;
  }
  //phan trang
  // Tính toán chỉ mục bắt đầu và kết thúc của các mục trên trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Lấy danh sách các mục trên trang hiện tại
  const itemsOnPage = dataToDisplay.slice(startIndex, endIndex);

  const handleSortByField = (field: string) => {
    let direction: SortDirection = "asc";
    if (sortField === field && sortDirection === "asc") {
      direction = "desc";
    }
    dispatch(setSortField(field));
    dispatch(setSortDirection(direction));
    dispatch(sortTable());
  };
  // them sua
  const handleEditClick = (formData: Employee) => {
    navigate(`edit/${formData.id}`);
  };

  // const showModal
  // showModal={showModal}
  // onClose={handleDeleteCancel}
  // onDelete={handleDeleteConfirm}

  const handleDeleteCancel = () => {
    dispatch(setStoreDelete(undefined));
    setShowModal(false);
  };
  const recordIdToDelete = useSelector(
    (state: RootState) => state.table.deleteStore
  );
  const handleDeleteConfirm = async () => {
    await axios
      .delete(
        `https://6480307ff061e6ec4d48c34b.mockapi.io/api/v1/Employee/${recordIdToDelete}`
      )
      .then(() => {})
      .catch((e) => {});
    recordIdToDelete && dispatch(removeRow(recordIdToDelete));
    setShowModal(false);
  };
  return (
    <>
      <div className="">
        <div className="flex items-center justify-center mb-20">
          <div className="relative">
            {" "}
            <input
              className="pl-10 pr-3 py-2 w-96 border border-gray-700 rounded focus:border-blue-500 focus:outline-none"
              type="text"
              value={searchKeyword}
              onChange={handleInputChange}
              placeholder="Search"
            />
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FontAwesomeIcon icon="search" className="text-gray-700" />
            </span>
          </div>
        </div>

        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion}>{suggestion}</li>
          ))}
        </ul>

        <button className="ml-32 p-2 bg-blue-700 text-white rounded-lg my-2 mr-24">
          {" "}
          <Link to={"/formtodo"}>+ Add customer</Link>
        </button>

        <div className="overflow-hidden">
          <table className="min-w-max mx-auto ">
            <thead className="bg-green-300 border-b">
              <tr>
                <th
                  scope="col"
                  className="text-sm w-80 font-medium text-gray-900 px-6 py-4 text-left cursor-pointer"
                  onClick={() => handleSortByField("name")}
                >
                  Name
                  {/* Hiển thị biểu tượng sắp xếp tùy theo trường hợp */}
                  {sortField === "name" && (
                    <FontAwesomeIcon
                      icon={sortDirection === "asc" ? "arrow-up" : "arrow-down"}
                    />
                  )}
                </th>
                <th
                  scope="col"
                  className="text-sm w-80 font-medium text-gray-900 px-6 py-4 text-left cursor-pointer"
                  onClick={() => handleSortByField("phone")}
                >
                  Phone
                  {/* Hiển thị biểu tượng sắp xếp tùy theo trường hợp */}
                  {sortField === "phone" && (
                    <FontAwesomeIcon
                      icon={sortDirection === "asc" ? "arrow-up" : "arrow-down"}
                    />
                  )}
                </th>
                <th
                  scope="col"
                  className="text-sm w-80 font-medium text-gray-900 px-6 py-4 text-left cursor-pointer"
                  onClick={() => handleSortByField("street")}
                >
                  Street
                  {/* Hiển thị biểu tượng sắp xếp tùy theo trường hợp */}
                  {sortField === "street" && (
                    <FontAwesomeIcon
                      icon={sortDirection === "asc" ? "arrow-up" : "arrow-down"}
                    />
                  )}
                </th>
                <th className="text-sm w-80 font-medium text-gray-900 px-6 py-4 text-left cursor-pointer">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {itemsOnPage.length > 0 ? (
                itemsOnPage.map((row, index) => (
                  <tr
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-200"
                    }`}
                    key={row.id}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.street}
                    </td>
                    <td className="space-x-3">
                      <button onClick={() => handleRemoveRow(row.id || "")}>
                        Delete
                      </button>
                      <button
                        className="ml-4 mr-5"
                        onClick={() => handleEditClick(row as Employee)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No results found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="ml-5 mt-4 fixed bottom-10">
          {" "}
          Rows per page : {itemsOnPage?.length}
        </p>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
      <DeleteModal
        showModal={showModal}
        onClose={handleDeleteCancel}
        onDelete={handleDeleteConfirm}
      />
    </>
  );
};
