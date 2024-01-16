const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let taskToEdit = tasks.find(task => task.id === taskId);

if (taskToEdit) {
    document.getElementById('name').value = taskToEdit.title;
    document.getElementById('description').value = taskToEdit.description;
    document.getElementById('status').checked = taskToEdit.isCompleted;
    const form = document.getElementById('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const newName = document.getElementById('name').value;
        const newDescription = document.getElementById('description').value;
        const newStatus = document.getElementById('status').checked;

        const updatedTask = {
            id: taskId,
            title: newName,
            description: newDescription,
            isCompleted: newStatus,
            date: new Date()
        };

        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return updatedTask;
            }
            return task;
        });

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        window.location.href = '../html/index.html';
    });

    const homeBtn = document.getElementById('home2');
    if(homeBtn){
        homeBtn.addEventListener("click", () => {
            window.location.href = `../html/index.html`;
        })
    }
} else {
    console.error('Task not found for the specified ID:', taskId);
}