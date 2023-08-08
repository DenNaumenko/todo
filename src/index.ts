import TodoTools from "./todoTools";

const todoApp = new TodoTools('taskInput', 'taskList');
const addButton = document.getElementById('addButton');

if (addButton instanceof HTMLElement) {
  addButton.addEventListener('click', () => {
    todoApp.addTodo();
  });
}