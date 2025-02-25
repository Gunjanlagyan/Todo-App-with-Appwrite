import React from "react";
import IndividualTodo from "./IndividualTodo";
import { useSelector } from "react-redux";

const TodoList = () => {
  const { todos, isLoading } = useSelector((state) => state.todo);

  return (
    <div>
      <ul className="mt-6 space-y-4">
        {isLoading
          ? <p className="text-center text-white">Loading todos...</p>
          : todos.map((todos) => 
          <div key={todos.$id} ><IndividualTodo todos={todos} /></div>
          )}
      </ul>
    </div>
  );
};

export default TodoList;
