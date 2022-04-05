const add = document.querySelector('form button');
const todoList = document.querySelector('.todo-list');
const input = document.querySelector('form input');
// console.log(todoS);
const todoS = document.querySelector('.todoS');
const todo = document.getElementsByClassName('todo');

document.addEventListener('DOMContentLoaded', getTodoS);

add.addEventListener('click', (event) => {
  event.preventDefault();
  let todo = document.createElement('div');
  todo.classList.add('todo');
  todo.innerHTML = `<li class="todo-item">${input.value}</li>
<button class="done">
  <i class="fas fa-check-square"></i>
</button>
<button class="delete">
  <i class="fas fa-minus-square"></i>
</button>`;
  todoList.appendChild(todo);
  addToStorage(input.value);
  input.value = '';
  //   console.log(todoS);
});
todoList.addEventListener('click', doneOrDelete);
function doneOrDelete(event) {
  if (event.target.className === 'delete') {
    console.log('deleted');
    let parent = event.target.parentElement;
    parent.classList.add('fall');
    deleteFromStorage(parent.children[0].textContent);
    parent.addEventListener('transitionend', () => {
      parent.remove();
    });
  }
  if (event.target.className === 'done') {
    let parent = event.target.parentElement;
    parent.classList.toggle('complete');
  }
}
todoS.addEventListener('click', filterTodo);
function filterTodo(event) {
  // console.log('clicked');
  let target = event.target;
  // console.log(target.value);
  switch (target.value) {
    case 'All': //do nothing
      console.log('all');
      break;
    case 'Done':
      console.log('Done');
      for (ele of todo) {
        if (ele.classList.contains('complete')) ele.style.display = 'flex';
        else ele.style.display = 'none';
      }
      break;
    case 'Not Done':
      console.log('Not Done');
      for (ele of todo) {
        if (ele.classList.contains('complete')) ele.style.display = 'none';
        else ele.style.display = 'flex';
      }
      break;
  }
}

function addToStorage(todo) {
  // check

  let todos;

  if (window.localStorage.getItem('todos') === null) todos = [];
  else todos = JSON.parse(window.localStorage.getItem('todos'));
  todos.push(todo);
  window.localStorage.setItem('todos', JSON.stringify(todos));
}
function deleteFromStorage(todo) {
  let todos;

  if (window.localStorage.getItem('todos') === null) todos = [];
  else todos = JSON.parse(window.localStorage.getItem('todos'));
  if (todos.includes(todo)) {
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
  }
  window.localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodoS() {
  console.log('hi');
  let todos;

  if (window.localStorage.getItem('todos') === null) todos = [];
  else todos = JSON.parse(window.localStorage.getItem('todos'));
  todos.forEach((todoInput) => {
    let todo = document.createElement('div');
    todo.classList.add('todo');
    todo.innerHTML = `<li class="todo-item">${todoInput.toString()}</li>
  <button class="done">
    <i class="fas fa-check-square"></i>
  </button>
  <button class="delete">
    <i class="fas fa-minus-square"></i>
  </button>`;
    todoList.appendChild(todo);
  });
}
