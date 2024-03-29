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

  viewDetails(taskId) {
    window.location.href = `../html/details.html?id=${taskId}`;
  }

  renderTasks(displayTasks) {
    const tasksListContainer = document.getElementById("tasksList");
    if (tasksListContainer) {
      tasksListContainer.innerHTML = "";
      let tasksToDisplay = [];
      if (displayTasks) {
        tasksToDisplay = displayTasks;
      } else {
        tasksToDisplay = JSON.parse(localStorage.getItem("tasks")) || [];
      }
      tasksToDisplay.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.innerHTML = `
                <p class="showDetails" data-taskId="${
                  tasksToDisplay[index].id
                }">Name: ${task.title}</p>
                <p>Status: ${
                  task.isCompleted ? "Completed" : "Not Completed"
                }</p>
                <button data-taskId="${
                  tasksToDisplay[index].id
                }" class="deleteBtn">Delete</button>
                <button data-taskId="${
                  tasksToDisplay[index].id
                }" class="editBtn">Edit</button>
            `;
        tasksListContainer.appendChild(taskDiv);
        handleDeleteBtn(tasksToDisplay[index].id);
        handleEditBtn(tasksToDisplay[index].id);
        handleDetailsBtn(tasksToDisplay[index].id);
      });
    }
  }

  updateLocalStorage(updatedTasks) {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
}

class TaskForm {
  constructor(formElement, tasksList) {
    this.formElement = formElement;
    this.tasksList = tasksList;

    this.formElement.addEventListener("submit", (event) =>
      this.handleFormSubmission(event)
    );
  }

  handleFormSubmission(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    if (name.trim() !== "" && description.trim() !== "") {
      const newTask = new Task(name, description);
      this.tasksList.addTask(newTask);
      this.formElement.reset();
    } else {
      alert("Please fill in all inputs");
    }
  }
}

class FilterAndSort {
  filteredTasks;

  constructor(filterSelect, sortSelect, tasksList) {
    this.filterSelect = filterSelect;
    this.sortSelect = sortSelect;
    this.tasksList = tasksList;
    this.filteredTasks = [...this.tasksList.tasks];

    if (filterSelect) {
      this.filterSelect.addEventListener("change", () =>
        this.handleFilterAndSortChange()
      );
    }

    if (sortSelect) {
      this.sortSelect.addEventListener("change", () =>
        this.handleFilterAndSortChange()
      );
    }
  }
  handleFilterAndSortChange() {
    const filterValue = this.filterSelect.value;
    const sortValue = this.sortSelect.value;

    let filteredAndSortedTasks = [...this.tasksList.tasks];

    if (filterValue === "completed") {
      filteredAndSortedTasks = filteredAndSortedTasks.filter(
        (task) => task.isCompleted
      );
    } else if (filterValue === "not-completed") {
      filteredAndSortedTasks = filteredAndSortedTasks.filter(
        (task) => !task.isCompleted
      );
    }

    if (sortValue === "name") {
      filteredAndSortedTasks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === "date") {
      filteredAndSortedTasks.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }

    this.tasksList.renderTasks(filteredAndSortedTasks);
  }
}

window.addEventListener("DOMContentLoaded", () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const tasksList = new TasksList();
    const form = new TaskForm(document.getElementById("form"), tasksList);
    const filterAndSort = new FilterAndSort(
      document.getElementById("filter"),
      document.getElementById("sort"),
      tasksList
    );
    tasksList.tasks = tasks;
    tasksList.renderTasks();
  });
  
  function handleDeleteBtn(taskId) {
    const taskList = new TasksList();
    const deleteBtn = Array.from(document.getElementsByClassName("deleteBtn"));
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        if (taskId === btn.getAttribute("data-taskId")) {
          taskList.deleteTask(taskId);
        }
      });
    });
  }
  function handleEditBtn(taskId) {
    const taskList = new TasksList();
    const editBtn = Array.from(document.getElementsByClassName("editBtn"));
    editBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        if (taskId === btn.getAttribute("data-taskId")) {
          taskList.editTask(taskId);
        }
      });
    });
  }

  function handleDetailsBtn(taskId) {
    const taskList = new TasksList();
    const detailsBtn = Array.from(document.getElementsByClassName("showDetails"));
    detailsBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        if (taskId === btn.getAttribute("data-taskId")) {
          taskList.viewDetails(taskId);
        }
      });
    });
  }
  
  export { Task, TasksList, TaskForm, FilterAndSort };
  
  