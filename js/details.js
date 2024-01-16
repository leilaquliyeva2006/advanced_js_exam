class Details {
    tasks;
    task;
    taskId;

    constructor() {
        const urlParams = new URLSearchParams(window.location.search);
        this.taskId = urlParams.get('id');
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        this.task = this.tasks.find(task => task.id === this.taskId);
    }

    renderTask() {
        const detailDiv = document.getElementById("details")
        const taskDiv = document.createElement("div");
        taskDiv.innerHTML = `
                <p >Id: ${this.task.id}</p>
                <p >Name: ${this.task.title}</p>
                <p >Description: ${this.task.description}</p>
                <p>Status: ${this.task.isCompleted ? "Completed" : "Not Completed"}</p>
                <p>Date: ${this.formatDateTime(this.task.date)}</p>
        `
        detailDiv.appendChild(taskDiv);
        this.goToHome()
    }
}