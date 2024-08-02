document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Cargar tareas al cargar la página
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => addTaskToDOM(task));
        });

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const taskText = taskInput.value;
        if (taskText === '') {
            return;
        }

        const newTask = { task: taskText };

        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(response => response.json())
            .then(task => {
                addTaskToDOM(task);
                taskInput.value = '';
            });
    });

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.textContent = task.task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            fetch(`/api/tasks/${task.id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    taskList.removeChild(li);
                });
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }
});
