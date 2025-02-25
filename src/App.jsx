import { useEffect } from "react";
import "./App.css";
import TodoInput from "./Components/TodoInput";
import TodoList from "./Components/TodoList";
import TodoName from "./Components/TodoName";
import { fetchtodo } from "./Store/TodoSlice";
import { useDispatch } from "react-redux";

function App() {
    const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchtodo());
  }, [dispatch]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-96 max-w-md border border-white/20">
        <TodoName />
        <TodoInput />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
