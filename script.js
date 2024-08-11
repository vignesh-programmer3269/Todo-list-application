const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoContainer = document.getElementById("todo-container");

let allTodos = getTodo();
updateTodo();

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

function addTodo() {
  const todoText = todoInput.value;
  if (todoText.length > 0) {
    const todoObj = {
      text: todoText,
      completed: false,
    };
    allTodos.push(todoObj);
    updateTodo();
    saveTodo();
    todoInput.value = "";
  }
}

function updateTodo() {
  todoContainer.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    todoItem = createTodo(todo, todoIndex);
    todoContainer.appendChild(todoItem);
  });
}

function createTodo(todo, todoIndex) {
  const todoLi = document.createElement("li");
  todoLi.classList.add("todo-list");
  const todoId = "todo-" + todoIndex;
  const todoText = todo.text;
  todoLi.innerHTML = `
    <input id="${todoId}" type="checkbox"/>
    <label for="${todoId}" class="check-box">
    <i class="fa-solid fa-check"></i>
    </label>
    <label class="todo-text" for="${todoId}">
      ${todoText}
    </label>
    <button class="delete-btn">
      <i class="fa-solid fa-trash"></i>
    </button>
  `;

  const checkbox = todoLi.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodo();
  });
  checkbox.checked = todo.completed;

  const deleteBtn = todoLi.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    deleteTodo(todoIndex);
  });

  return todoLi;
}

function deleteTodo(todoIndex) {
  allTodos = allTodos.filter((i, j) => j !== todoIndex);
  saveTodo();
  updateTodo();
}

function saveTodo() {
  const todos = JSON.stringify(allTodos);
  localStorage.setItem("todos", todos);
}

function getTodo() {
  const todos = localStorage.getItem("todos");
  return JSON.parse(todos) || [];
}
