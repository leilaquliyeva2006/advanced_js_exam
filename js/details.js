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
    formatDateTime(inputDate) {
        const date = new Date(inputDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    goToHome(){
        const homeBtn = document.getElementById("Home");
        if(homeBtn){
            homeBtn.addEventListener("click", () => {
                window.location.href = `../html/index.html`;
            })
        }
    }

}

const details = new Details();
details.renderTask();
