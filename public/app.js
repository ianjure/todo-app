let currentUser = null;
let userLevel = 1;
let token = null;

// Auth functions
async function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Try to login
        let response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        let data = await response.json();

        if (!response.ok) {
            // If login fails, try to sign up
            response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error);
            }
        }

        currentUser = data.user;
        token = data.token;
        showApp();
        loadTodos();
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function handleLogout() {
    currentUser = null;
    token = null;
    document.getElementById('auth-container').classList.remove('hidden');
    document.getElementById('app-container').classList.add('hidden');
}

function showApp() {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    document.getElementById('user-email').textContent = currentUser.email;
    updateLevel();
}

// Todo functions
async function loadTodos() {
    try {
        const response = await fetch('/api/todos', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Failed to load todos');

        const todos = await response.json();
        const todosList = document.getElementById('todos-list');
        todosList.innerHTML = '';

        todos.forEach(todo => {
            const li = createTodoElement(todo);
            todosList.appendChild(li);
        });
    } catch (error) {
        alert('Error loading todos: ' + error.message);
    }
}

async function addTodo() {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();

    if (!text) return;

    try {
        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text })
        });

        if (!response.ok) throw new Error('Failed to add todo');

        const todo = await response.json();
        const li = createTodoElement(todo);
        document.getElementById('todos-list').prepend(li);
        input.value = '';
    } catch (error) {
        alert('Error adding todo: ' + error.message);
    }
}

async function toggleTodo(id, completed) {
    try {
        const response = await fetch(`/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ completed })
        });

        if (!response.ok) throw new Error('Failed to update todo');

        if (completed) {
            currentUser.completedTasks++;
            updateLevel();
        }
    } catch (error) {
        alert('Error updating todo: ' + error.message);
    }
}

async function deleteTodo(id) {
    try {
        const response = await fetch(`/api/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Failed to delete todo');

        document.querySelector(`[data-id="${id}"]`).remove();
    } catch (error) {
        alert('Error deleting todo: ' + error.message);
    }
}

function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo._id;

    li.innerHTML = `
        <span>${todo.text}</span>
        <div class="todo-actions">
            <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                onchange="toggleTodo('${todo._id}', this.checked)">
            <button onclick="deleteTodo('${todo._id}')">Delete</button>
        </div>
    `;

    return li;
}

function updateLevel() {
    userLevel = Math.floor(currentUser.completedTasks / 5) + 1;
    document.getElementById('user-level').textContent = `Level: ${userLevel}`;
}