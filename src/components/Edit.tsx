//import React, { useState } from "react";
//import axios from "axios";

export interface Employee {
  id: number;
  namee: string;
  phone: string;
  street: string;
}

// type EditEmployeeProps = {
//   employee: Employee;
//   onComplete: () => void;
// };

// const EditEmployee= ({
//   // employee,
//   // onComplete,
// }) => {
//   const [name, setName] = useState(employee.namee);
//   const [phone, setPhone] = useState(employee.phone);
//   const [street, setStreet] = useState(employee.street);

//   const handleEdit = async () => {
//     try {
//       const response = await axios.put(
//         `https://6480307ff061e6ec4d48c34b.mockapi.io/api/v1/Employee/${employee.id}`,
//         {
//           namee: name,
//           phone: phone,
//           street: street,
//         }
//       );

//       if (response.status === 200) {
//         onComplete();
//       }
//     } catch (error) {
//       console.error("Error editing employee:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Edit Employee</h2>
//       <form onSubmit={handleEdit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Phone:</label>
//           <input
//             type="text"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Street:</label>
//           <input
//             type="text"
//             value={street}
//             onChange={(e) => setStreet(e.target.value)}
//           />
//         </div>
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// };

const EditEmployee = () => {
  return <></>;
};

export default EditEmployee;
