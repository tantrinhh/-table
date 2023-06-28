import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Todo, addTodo } from "../stores/emplyeeSlice";

export const FormTodo = () => {
  type FormData = {
    name: string;
    phone: string;
    street: string;
  };

  const dataStore: Todo = useSelector((state: { Todo: Todo }) => state.Todo);

  const { id } = useParams();
  const isEditing = !!id;

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (_data) => {
    try {
      if (isEditing) {
        // Sửa thông tin nhân viên
        await axios.put(
          `https://6480307ff061e6ec4d48c34b.mockapi.io/api/v1/Employee/${id}`,
          _data
        );
        toast("Bạn đã cập nhật thông tin thành công!", {});
      } else {
        //Thêm mới nhân viên
        const response = await axios.post(
          "https://6480307ff061e6ec4d48c34b.mockapi.io/api/v1/Employee",
          _data
        );

        const data = dataStore.data;
        const newData = [...data];
        newData.push({ ...response.data });

        dispatch(addTodo({ newData: newData }));
        toast("Bạn đã thêm mới thành công!", {});
      }
      // Đặt lại form về trạng thái ban đầu
      reset();
      navigate("/viewemployee");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (isEditing) {
      const fetchEmployee = async () => {
        try {
          const response = await axios.get(
            `https://6480307ff061e6ec4d48c34b.mockapi.io/api/v1/Employee/${id}`
          );
          const employeeData = response.data;
          // Điền thông tin nhân viên vào form
          reset(employeeData);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchEmployee();
    }
  }, [id, isEditing, reset]);
  const handleClose = () => {
    navigate("/viewemployee");
  };
  return (
    <>
      <div className=" mx-auto mt-10 w-64 text-black font-bold h-8 rounded-lg text-center border border-solid border-slate-500 ">
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
              {errors.street?.type === "minLength" && (
                <p className="  text-red-600">
                  Name must be at least 5 characters
                </p>
              )}
              {errors.street?.type === "maxLength" && (
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
                <p className=" text-red-600">This field is required</p>
              )}
              {errors.phone?.type === "pattern" && (
                <p className=" text-red-600">Numbers only</p>
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
                <p className="  text-red-600">This field is required</p>
              )}
              {errors.street?.type === "minLength" && (
                <p className="  text-red-600">
                  Street must be at least 5 characters
                </p>
              )}
              {errors.street?.type === "maxLength" && (
                <p className="  text-red-600">
                  Street must be at most 20 characters
                </p>
              )}
            </div>
            <div className="flex justify-center mb-4 ">
              <div className="mx-auto  text-white  mt-10">
                <div>
                  <button
                    className="w-20  h-8 rounded-lg text-center bg-[#3d3d61]"
                    type="submit"
                  >
                    {isEditing ? "Update" : "Create"}
                  </button>
                </div>
              </div>
              <div className="bg-[#3d3d61] mx-auto  rounded-lg h-8 pt-0.5  w-20 text-white  mt-10">
                {" "}
                <button className=" text-center" onClick={() => handleClose()}>
                  {" "}
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
