import { useState } from "react";
import { actions } from "astro:actions";

export default function ReactList({ list }) {
  const [task, setTask] = useState("");
  const [reactList, setReactList] = useState(list);

  const handleAddTask = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { data, error } = await actions.addTask(formData);

    if (!error) {
      setReactList(data);
      setTask("");
    } else {
      console.error(error);
    }
  };

  const handleDeleteTask = async (index) => {
    const { data, error } = await actions.deleteTask(index);

    if (!error) {
      setReactList(data);
    } else {
      console.error(error);
    }
  };

  return (
    <div className="list-base">
      <p className="text-level-1">
        Your <span className="framework decoration-react">React</span> todo list
      </p>
      <form onSubmit={handleAddTask} className="add-form">
        <input
          id="task"
          required
          autoComplete="off"
          value={task}
          name="task"
          placeholder="add a new task..."
          className="add-input focus:ring-react hover:ring-react"
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          type="submit"
          aria-label="add todo button"
          className="add-button hover:bg-react">
          Add
        </button>
      </form>
      <div>
        {reactList.map((task, index) => (
          <div key={index} className="todo-wrapper">
            <p className="todo-content">{task}</p>
            <button
              onClick={() => handleDeleteTask(index)}
              aria-label="delete task button"
              className="delete-button">
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
