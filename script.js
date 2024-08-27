document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.getElementById("todoList");
    const emptyState = document.getElementById("emptyState");
    const addTodoBtn = document.getElementById("addTodoBtn");
    const todoModal = document.getElementById("todoModal");
    const closeModal = document.getElementById("closeModal");
    const todoForm = document.getElementById("todoForm");
    const todoInput = document.getElementById("todoInput");
    const todoIdInput = document.getElementById("todoId");
    const modalTitle = document.getElementById("modalTitle");

    let todos = [];

    function renderTodos() {
        todoList.innerHTML = "";
        if (todos.length === 0) {
            emptyState.style.display = "block";
        } else {
            emptyState.style.display = "none";
            todos.forEach((todo, index) => {
                const row = document.createElement("tr");
                
                const taskCell = document.createElement("td");
                taskCell.textContent = todo.text;
                row.appendChild(taskCell);
                
                const statusCell = document.createElement("td");
                const statusBtn = document.createElement("button");
                statusBtn.textContent = todo.completed ? "Completed" : "Not Completed";
                statusBtn.className = "status-btn";
                statusBtn.style.backgroundColor = todo.completed ? "green" : "red";
                statusBtn.style.color = "white";
                statusBtn.addEventListener("click", () => toggleStatus(index));
                statusCell.appendChild(statusBtn);
                row.appendChild(statusCell);
                
                const actionsCell = document.createElement("td");
                const editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                editBtn.className = "edit-btn";
                editBtn.addEventListener("click", () => editTask(index));
                actionsCell.appendChild(editBtn);
                
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.className = "delete-btn";
                deleteBtn.addEventListener("click", () => deleteTask(index));
                actionsCell.appendChild(deleteBtn);
                
                row.appendChild(actionsCell);
                todoList.appendChild(row);
            });
        }
    }
    

    function toggleStatus(index) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }

    function deleteTask(index) {
        todos.splice(index, 1);
        renderTodos();
    }

    function editTask(index) {
        todoIdInput.value = index;
        todoInput.value = todos[index].text;
        modalTitle.textContent = "Edit Todo";
        openModal();
    }

    function addTask(text) {
        todos.push({ text: text, completed: false });
        renderTodos();
    }

    function updateTask(index, text) {
        todos[index].text = text;
        renderTodos();
    }

    function openModal() {
        todoModal.style.display = "flex";
    }

    function closeModalFunc() {
        todoModal.style.display = "none";
        todoForm.reset();
        todoIdInput.value = "";
        modalTitle.textContent = "Add Todo";
    }

    todoForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const todoText = todoInput.value.trim();
        const todoId = todoIdInput.value;
        
        if (todoText) {
            if (todoId) {
                updateTask(todoId, todoText);
            } else {
                addTask(todoText);
            }
        }
        
        closeModalFunc();
    });

    addTodoBtn.addEventListener("click", openModal);
    closeModal.addEventListener("click", closeModalFunc);
    window.addEventListener("click", (event) => {
        if (event.target === todoModal) {
            closeModalFunc();
        }
    });

    renderTodos();
});
