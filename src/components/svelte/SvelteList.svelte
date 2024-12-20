<script>
  import { onMount } from 'svelte';
  import { actions } from 'astro:actions';
  
  let task = "";
  let svelteList = [];

  export let list = [];

  onMount(() => {
    svelteList = [...list];
  });

  async function handleAddTask(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { data, error } = await actions.addTask(formData);

    if (!error) {
      svelteList = data;
      task = "";
    } else {
      console.error(error);
    }
  }

  async function handleDeleteTask(index) {
    const { data, error } = await actions.deleteTask(index);

    if (!error) {
      svelteList = data;
    } else {
      console.error(error);
    }
  }
</script>

<div class="list-base">
  <p class="text-level-1">
    Your <span class="framework decoration-svelte">Svelte</span> todo list
  </p>
  <form on:submit={handleAddTask} class="add-form">
    <input
      id="task"
      required
      autocomplete="off"
      bind:value={task}
      name="task"
      placeholder="add a new task..."
      class="add-input focus:ring-svelte hover:ring-svelte"
    />
    <button
      id="astro-add"
      type="submit"
      aria-label="add todo button"
      class="add-button hover:bg-svelte">
      Add
    </button>
  </form>
  <div>
    {#each svelteList as task, index}
      <div class="todo-wrapper">
        <p class="todo-content">{task}</p>
        <button
          on:click={() => handleDeleteTask(index)}
          aria-label="delete task button"
          class="delete-button">
          X
        </button>
      </div>
    {/each}
  </div>
</div>
