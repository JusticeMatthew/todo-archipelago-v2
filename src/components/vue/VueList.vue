<template>
  <div class="list-base">
    <p class="text-level-1">
      Your <span class="framework decoration-vue">Vue</span> todo list
    </p>
    <form @submit.prevent="handleAddTask" class="add-form">
      <input
        id="task"
        required
        autocomplete="off"
        v-model="task"
        name="task"
        placeholder="add a new task..."
        class="add-input focus:ring-vue hover:ring-vue" />
      <button
        type="submit"
        aria-label="add todo button"
        class="add-button hover:bg-vue">
        Add
      </button>
    </form>
    <div>
      <div v-for="(task, index) in vueList" :key="index" class="todo-wrapper">
        <p class="todo-content">{{ task }}</p>
        <button
          @click="handleDeleteTask(index)"
          aria-label="delete task button"
          class="delete-button">
          X
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { actions } from "astro:actions";

export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      task: "",
      vueList: [...this.list],
    };
  },
  methods: {
    async handleAddTask() {
      const formData = new FormData();
      formData.append("task", this.task);
      const { data, error } = await actions.addTask(formData);

      if (!error) {
        this.vueList = data;
        this.task = "";
      } else {
        console.error(error);
      }
    },
    async handleDeleteTask(index) {
      const { data, error } = await actions.deleteTask(index);

      if (!error) {
        this.vueList = data;
      } else {
        console.error(error);
      }
    },
  },
};
</script>
