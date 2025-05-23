import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import service from "../Appwrite/Config";
import { useDispatch } from "react-redux";
import { fetchtodo } from "../Store/TodoSlice";
import { useForm } from "react-hook-form";

const IndividualTodo = ({ todos }) => {
  const dispatch = useDispatch();
  const [isEditing, setisEditing] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  const setUnableEdit = () => {
    setisEditing(true);
    setValue("content", todos.content);
  };

  const updateTodo = async (data) => {
    try {
      await service.updatetodo(todos.$id, data);
      setisEditing(false);
      dispatch(fetchtodo());
    } catch (error) {
      console.log(error);
    }
  };

  const deletetodo = async () => {
    try {
      await service.deletetodo(todos.$id);
      dispatch(fetchtodo());
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      <li className="flex justify-between items-center p-4 bg-white/20 rounded-xl shadow-md border border-white/30 hover:scale-105 hover:shadow-lg transition-all duration-300">
        {isEditing ? (
          <form
            onSubmit={handleSubmit(updateTodo)}
            className="flex w-full space-x-2"
          >
            <input
              type="text"
              className="p-2  rounded-lg w-full"
              {...register("content", { required: true })}
            />
            <button type="submit">✅</button>
            <button type="button" onClick={() => setisEditing(false)}>
              ❌
            </button>
          </form>
        ) : (
          <>
            <span className="cursor-pointer text-lg font-semibold text-white drop-shadow-md hover:text-yellow-300 transition-all duration-300">
              {todos.content}
            </span>
            <div className="flex space-x-3">
              <button
                onClick={setUnableEdit}
                className=" text-2xl text-green-500 hover:text-green-700 transition-colors duration-200"
              >
                <MdModeEditOutline />
              </button>
              <button
                onClick={deletetodo}
                className="text-red-400 text-2xl hover:text-red-600 transition-colors duration-200"
              >
                <MdDeleteForever />
              </button>
            </div>
          </>
        )}
      </li>
    </div>
  );
};

export default IndividualTodo;
