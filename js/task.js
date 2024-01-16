class Task {
    #id;
    #title;
    #description;
    #date;
    #isCompleted;
  
    constructor(name, _description) {
      this.#id = crypto.randomUUID();
      this.#title = name;
      this.#description = _description;
      this.#date = new Date();
      this.#isCompleted = false;
    }
  
    get task() {
      return {
        id: this.id,
        title: this.title_get,
        description: this.description_get,
        date: this.date_get,
        isCompleted: this.isCompleted_get,
      };
    }
  
    get id() {
      return this.#id;
    }
  
    get title_get() {
      return this.#title;
    }
  
    get description_get() {
      return this.#description;
    }
  
    get date_get() {
      return this.#date;
    }
  
    get isCompleted_get() {
      return this.#isCompleted;
    }
  
    toggle_completion_status() {
      this.#isCompleted = !this.#isCompleted;
    }
  }
  
  class TasksList {
    #tasks;
  
    constructor() {
      this.#tasks = [];
    }
  
    get tasks() {
      return this.#tasks;
    }
  
    set tasks(tasks) {
      return (this.#tasks = tasks);
    }
  
    addTask(task) {
      this.#tasks.push(task.task);
      this.updateLocalStorage(this.#tasks);
      this.renderTasks();
    }
  
    deleteTask(taskId) {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      const objWithIdIndex = tasks.findIndex((obj) => obj.id === taskId);
      if (objWithIdIndex > -1) {
        tasks.splice(objWithIdIndex, 1);
      }
      this.renderTasks(tasks);
      this.updateLocalStorage(tasks);
    }
  
    editTask(taskId) {
      window.location.href = `../html/edit.html?id=${taskId}`;
    }
}