import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addData, updateData, Employee } from "../stores/TableSlice";
import { RootState } from "../stores/Storee";
import axios from "axios";

//import { v4 as generateUniqueId } from "uuid";
export const FormTodo = () => {
  type FormData = {
    name: string;
    phone: string;
    street: string;
  };

  const dispatch = useDispatch();
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const employee = useSelector((state: RootState) =>
    state.table.data.find((employee) => employee.id === id)
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const generateUniqueId = (): string => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${random}`;
  };

  const onSubmit = async (data: FormData) => {
    const employee: Employee = {
      //id: isEditing ? id : generateUniqueId(),
      name: data.name,
      phone: data.phone,
      street: data.street,
    };

    if (isEditing) {
      // Sửa thông tin nhân viên
      await axios.put(
        `https://6480307ff061e6ec4d48c34b.mockapi.io/api/v1/Employee/${id}`,
        employee
      );
      dispatch(updateData(employee));
      toast("Bạn đã cập nhật thông tin thành công!", {});
    } else {
      // Thêm mới nhân viên
      const response = await axios.post(
        "https://6480307ff061e6ec4d48c34b.mockapi.io/api/v1/Employee",
        employee
      );
      dispatch(addData(response.data));
      toast("Bạn đã thêm mới thành công!", {});
    }
    reset();
    navigate("/table");
  };

  useEffect(() => {
    if (isEditing && employee) {
      reset(employee);
    }
  }, [isEditing, employee, reset]);

  const handleClose = () => {
    navigate("/table");
  };

  return (
    <>
      <div className=" mx-auto mt-10 w-64 text-black font-bold h-8 rounded-lg text-center border border-solid border-slate-500">
        {isEditing ? "Sửa thông tin người dùng." : "Thêm thông tin người dùng."}
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" mx-auto mt-20 text-center items-center justify-center  border-solid border-2 border-slate-500 max-w-xl pt-10">
            <div className="mb-10">
              <label className="mr-6">Name:</label>
              <input
                className="rounded-sm border-solid border-2 border-slate-500"
                type="text"
                {...register("name", {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                })}
                autoComplete="off"
              />
              {errors.name?.type === "required" && (
                <p className=" text-red-600">This field is required</p>
              )}
              {errors.name?.type === "minLength" && (
                <p className="  text-red-600">
                  Name must be at least 5 characters
                </p>
              )}
              {errors.name?.type === "maxLength" && (
                <p className="  text-red-600">
                  Name must be at most 20 characters
                </p>
              )}
            </div>
            <div className="mb-10">
              <label className="mr-6">Phone:</label>
              <input
                className="rounded-sm border-solid border-2 border-slate-500"
                type="text"
                {...register("phone", {
                  required: true,
                  pattern: /^[0-9]+$/i,
                })}
                autoComplete="off"
              />
              {errors.phone?.type === "required" && (
                <p className="text-red-600">This field is required</p>
              )}
              {errors.phone?.type === "pattern" && (
                <p className="text-red-600">Numbers only</p>
              )}
            </div>
            <div className="mb-10">
              <label className="mr-6">Street:</label>
              <input
                className="rounded-sm border-solid border-2 border-slate-500"
                type="text"
                {...register("street", {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                })}
                autoComplete="off"
              />
              {errors.street?.type === "required" && (
                <p className="text-red-600">This field is required</p>
              )}
              {errors.street?.type === "minLength" && (
                <p className="text-red-600">
                  Street must be at least 5 characters
                </p>
              )}
              {errors.street?.type === "maxLength" && (
                <p className="text-red-600">
                  Street must be at most 20 characters
                </p>
              )}
            </div>
            <div className="flex justify-center mb-4">
              <div className="mx-auto text-white mt-10">
                <div>
                  <button
                    className="w-20 h-8 rounded-lg text-center bg-[#3d3d61]"
                    type="submit"
                  >
                    {isEditing ? "Update" : "Create"}
                  </button>
                </div>
              </div>
              <div className="bg-[#3d3d61] mx-auto rounded-lg h-8 pt-0.5 w-20 text-white mt-10">
                <button className="text-center" onClick={() => handleClose()}>
                  Back
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormTodo;
