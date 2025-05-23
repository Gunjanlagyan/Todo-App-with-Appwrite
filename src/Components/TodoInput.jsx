import React from "react";
import { GiNotebook } from "react-icons/gi";
import { useForm } from "react-hook-form";
import service from "../Appwrite/Config";
import { useDispatch } from "react-redux";
import { fetchtodo } from "../Store/TodoSlice";
const TodoInput = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (data) {
      try {
        const tododata = await service.addtodo(data);
        if (tododata) {
          dispatch(fetchtodo());
          reset();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 relative">
          <input
            type="text"
            className="w-full p-4 border border-white/30 rounded-xl bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-80 transition-all duration-300"
            placeholder="What’s your next task?"
            {...register("content", { required: true })}
          />
          <span className="text-xl  absolute right-4 top-[18px] text-white/50">
            <GiNotebook />
          </span>
          {errors.content && (
            <div className="text-red-700 text-center">
              Please enter your task
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          ➕ Add Task
        </button>
      </form>
    </div>
  );
};

export default TodoInput;
