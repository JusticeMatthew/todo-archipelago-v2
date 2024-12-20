import { actions } from "astro:actions";
import { For, createSignal } from "solid-js";

export default function SolidList({ list }) {
  const [task, setTask] = createSignal("");
  const [solidList, setSolidList] = createSignal(list);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { data, error } = await actions.addTask(formData);

    if (!error) {
      setSolidList(data);
      setTask("");
    } else {
      console.error(error);
    }
  };

  const handleDeleteTask = async (targetTask) => {
    const { data, error } = await actions.deleteTask(targetTask());

    if (!error) {
      setSolidList(data);
    } else {
      console.error(error);
    }
  };

  return (
    <div class="list-base">
      <p class="text-level-1">
        Your <span class="framework decoration-solid">Solid</span> todo list
      </p>
      <form onSubmit={handleAddTask} class="add-form">
        <input
          id="task"
          required
          autocomplete="off"
          value={task()}
          name="task"
          placeholder="add a new task..."
          class="add-input focus:ring-solid hover:ring-solid"
          onChange={(e) => setTask(e.currentTarget.value)}
        />
        <button
          type="submit"
          aria-label="add todo button"
          class="add-button hover:bg-solid">
          Add
        </button>
      </form>
      <div>
        <For each={solidList()}>
          {(task, index) => (
            <div class="todo-wrapper">
              <p class="todo-content">{task}</p>
              <button
                onClick={() => handleDeleteTask(index)}
                aria-label="delete task button"
                class="delete-button">
                X
              </button>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
