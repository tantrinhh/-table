// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import {
//   faArrowUp,
//   faArrowDown,
//   faSearch,
// } from "@fortawesome/free-solid-svg-icons";
// import DeleteModal from "./UI/Delete";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { Employee, Todo, initData } from "../stores/emplyeeSlice";

// library.add(faArrowUp, faArrowDown, faSearch);

// export const TableExample: React.FC = () => {
//   const dispatch = useDispatch();
//   const [data, setData] = useState<Employee[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   // sort
//   const [sortDirection, setSortDirection] = useState("asc");
//   const [sortBy, setSortBy] = useState("");
//   // tim kiem
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [suggestions, setSuggestions] = useState<string[]>([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [searchResult, setSearchResult] = useState<Employee[]>([]);
//   // phan trang
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const totalPages = Math.ceil(searchResult.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const dataStore: Todo = useSelector((state: { Todo: Todo }) => state.Todo);
//   const currentItems = dataStore.data.slice(indexOfFirstItem, indexOfLastItem);
//   const [recordIdToDelete, setRecordIdToDelete] = useState<number | null>(null);

//   const fetchData = useCallback(() => {
//     axios
//       .get("https://6480307ff061e6ec4d48c34b.mockapi.io/api/v1/Employee")
//       .then((response) => {
//         // setData(response.data);

//         dispatch(initData({ newData: response.data }));
//         setSearchResult(response.data); // Tìm kiếm và hiển thị dữ liệu mặc định
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//     //handleSearch();
//   }, [dispatch]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const handleSearchInputChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const value = event.target.value;
//     setSearchKeyword(value);

//     // Tạo danh sách gợi ý từ dữ liệu hiện tại
//     const currentData = currentItems.map((record) =>
//       record?.name?.toLowerCase()
//     );
//     const filteredSuggestions = currentData.filter((name) =>
//       name?.startsWith(value.toLowerCase())
//     );

//     filteredSuggestions && setSuggestions(filteredSuggestions as string[]);
//     setShowSuggestions(value.length > 0); // Hiển thị gợi ý nếu có từ khóa
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter") {
//       event.preventDefault(); // Ngăn chặn hành động mặc định khi nhấn Enter
//     }
//     handleSearch();
//   };

//   const handleSearch = () => {
//     if (currentItems.length > 0) {
//       const filteredData = currentItems.filter((record) =>
//         record?.name?.toLowerCase().includes(searchKeyword.toLowerCase())
//       );
//       // setSearchResult(filteredData);
//     }
//   };

//   const handleSort = (accessor: keyof Employee) => {
//     const sortByString = accessor.toString();

//     if (sortBy === sortByString) {
//       // Đảo chiều sắp xếp nếu cùng cột
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       // Sắp xếp theo cột mới
//       setSortBy(sortByString);
//       setSortDirection("asc");
//     }
//     handleSearch();
//   };
//   useEffect(() => {
//     if (sortBy) {
//       const sortedData = [...currentItems].sort((a, b) => {
//         const valueA = a[sortBy];
//         const valueB = b[sortBy];

//         if (valueA < valueB) {
//           return sortDirection === "asc" ? -1 : 1;
//         } else if (valueA > valueB) {
//           return sortDirection === "asc" ? 1 : -1;
//         } else {
//           return 0;
//         }
//       });

//       // setData(sortedData);
//     }
//   }, [sortBy, sortDirection, currentItems]);

//   const handleCreateClick = () => {
//     navigate("/formtodo");
//   };
//   const handleDeleteClick = (id: number) => {
//     setRecordIdToDelete(id);
//     setShowModal(true);
//   };

//   const handleDeleteConfirm = () => {
//     axios
//       .delete(
//         `https://6480307ff061e6ec4d48c34b.mockapi.io/api/v1/Employee/${recordIdToDelete}`
//       )
//       .then((data) => {
//         console.log(data);
//         fetchData();
//         toast.success("Bạn đã xóa thành công!", {
//           autoClose: 1000,
//         });
//       })
//       .catch((error) => {
//         toast.error("Bạn xóa thất bại!", {
//           autoClose: 3000,
//         });
//         console.log(error);
//       });
//     setShowModal(false);
//   };

//   const handleDeleteCancel = () => {
//     setShowModal(false);
//   };
//   const navigate = useNavigate();

//   const handleEditClick = (employee: Employee) => {
//     console.log(employee);
//     navigate(`edit/${employee.id}`);
//   };

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <>
//       <div className="searchbox  mt-10">
//         <div className="flex items-center justify-center">
//           <div className="relative">
//             <input
//               type="text"
//               className="pl-10 pr-3 py-2 w-96 border border-gray-700 rounded focus:border-blue-500 focus:outline-none"
//               placeholder="Search..."
//               value={searchKeyword}
//               onChange={handleSearchInputChange}
//               onKeyDown={handleKeyDown}
//               onBlur={() => setShowSuggestions(false)}
//             />
//             <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
//               <FontAwesomeIcon icon="search" className="text-gray-700" />
//             </span>
//           </div>
//           {/* <button
//             type="button"
//             className="ml-4 align-middle bg-blue-500 hover:bg-blue-600 text-center px-4 py-2 text-white text-sm font-semibold rounded inline-block shadow-lg"
//             onClick={handleSearch}
//           >
//             Search
//           </button> */}
//         </div>
//         {/* Hiển thị danh sách gợi ý */}
//         <div className="ml-96 pl-56">
//           <div className="w-96">
//             {showSuggestions && suggestions.length > 0 && (
//               <ul className="cursor-pointer">
//                 {suggestions.map((suggestion) => (
//                   <li
//                     key={suggestion}
//                     onMouseDown={() => setSearchKeyword(suggestion)}
//                   >
//                     {suggestion}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col mt-20">
//         <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
//           <div className="py-2 inline-block min-w-full ">
//             <div className="flex">
//               <div className="ml-auto">
//                 {" "}
//                 <button
//                   className="p-2 bg-blue-700 text-white rounded-lg my-2 mr-24"
//                   onClick={() => handleCreateClick()}
//                 >
//                   + Add customer
//                 </button>
//               </div>
//             </div>

//             <div className="overflow-hidden">
//               <table className="min-w-max mx-auto">
//                 <thead className="bg-green-300 border-b">
//                   <tr>
//                     <th
//                       scope="col"
//                       className="text-sm w-80 font-medium text-gray-900 px-6 py-4 text-left cursor-pointer"
//                       onClick={() => handleSort("name")}
//                     >
//                       NAME
//                       {sortBy === "name" && (
//                         <span className="ml-1">
//                           {sortDirection === "asc" ? (
//                             <FontAwesomeIcon
//                               icon="arrow-up"
//                               className="text-red-500"
//                             />
//                           ) : (
//                             <FontAwesomeIcon
//                               icon="arrow-down"
//                               className="text-blue-500"
//                             />
//                           )}
//                         </span>
//                       )}
//                     </th>
//                     <th
//                       scope="col"
//                       className="text-sm w-80 font-medium text-gray-900 px-6 py-4 text-left cursor-pointer"
//                       onClick={() => handleSort("phone")}
//                     >
//                       PHONE
//                       {sortBy === "phone" && (
//                         <span className="ml-1">
//                           {sortDirection === "asc" ? (
//                             <FontAwesomeIcon
//                               icon="arrow-up"
//                               className="text-red-500"
//                             />
//                           ) : (
//                             <FontAwesomeIcon
//                               icon="arrow-down"
//                               className="text-blue-500"
//                             />
//                           )}
//                         </span>
//                       )}
//                     </th>
//                     <th
//                       scope="col"
//                       className="text-sm w-96 font-medium text-gray-900 px-6 py-4 text-left cursor-pointer"
//                       onClick={() => handleSort("street")}
//                     >
//                       STREET
//                       {sortBy === "street" && (
//                         <span className="ml-1">
//                           {sortDirection === "asc" ? (
//                             <FontAwesomeIcon
//                               icon="arrow-up"
//                               className="text-red-500"
//                             />
//                           ) : (
//                             <FontAwesomeIcon
//                               icon="arrow-down"
//                               className="text-blue-500"
//                             />
//                           )}
//                         </span>
//                       )}
//                     </th>

//                     <th
//                       scope="col"
//                       className="text-sm w-80 bg font-medium text-gray-900 px-6 py-4 text-left"
//                     >
//                       ACTIONS
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentItems?.map((record: Employee, index) => (
//                     <tr
//                       className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
//                       key={index}
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {record?.name}
//                       </td>

//                       <td
//                         className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
//                           index % 2 === 0 ? "text-green-500" : "text-red-500"
//                         }`}
//                       >
//                         {record.phone}
//                       </td>

//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {record.street}
//                       </td>
//                       <td>
//                         <td className="space-x-3">
//                           <button
//                             className="ml-4 mr-5"
//                             onClick={() => handleEditClick(record)}
//                           >
//                             Edit
//                           </button>

//                           <button
//                             className="text-red-500"
//                             onClick={() =>
//                               handleDeleteClick(record.id as number)
//                             }
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </td>
//                     </tr>
//                   ))}
//                   {currentItems?.length === 0 && (
//                     <tr>
//                       <td colSpan={5}>No data available</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//               <p className="ml-5 mt-4 fixed bottom-10">
//                 {" "}
//                 Rows per page : {currentItems?.length}
//               </p>
//               <nav className="mt-4 flex justify-center relative">
//                 <ul className="flex fixed bottom-10">
//                   {currentPage > 1 && (
//                     <li>
//                       <button
//                         className="mr-2"
//                         onClick={() => handlePageChange(currentPage - 1)}
//                       >
//                         {"<"}
//                       </button>
//                     </li>
//                   )}
//                   {Array.from({ length: totalPages }, (_, index) => (
//                     <li key={index}>
//                       <button
//                         className={`mr-2 ${
//                           currentPage === index + 1 ? "text-red-500" : ""
//                         }`}
//                         onClick={() => handlePageChange(index + 1)}
//                       >
//                         {index + 1}
//                       </button>
//                     </li>
//                   ))}
//                   {currentPage < totalPages && (
//                     <li>
//                       <button
//                         className="mr-2"
//                         onClick={() => handlePageChange(currentPage + 1)}
//                       >
//                         {">"}
//                       </button>
//                     </li>
//                   )}
//                 </ul>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </div>
//       <DeleteModal
//         showModal={showModal}
//         onClose={handleDeleteCancel}
//         onDelete={handleDeleteConfirm}
//       />
//     </>
//   );
// };
