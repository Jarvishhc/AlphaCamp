// Initialize todo list
let list = document.querySelector('#list-content')
let todoList = document.querySelector('#my-todo')
let doneList = document.querySelector('#done-list')
const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']
for (let todo of todos) {
  addItem(todo)
}

// Add a new item
function addItem (text) {
  let newItem = document.createElement('li')
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `
  todoList.appendChild(newItem)
}

// Move item to done list 
function moveToDoneList(text) {
  let item = document.createElement('li')
  item.innerHTML = `
    <label for="todo" class='checked'>${text}</label>
    <i class="delete fa fa-trash"></i>
  `
  doneList.appendChild(item)
}

// Move item to todo list 
function moveToTodoList(text) {
  let item = document.createElement('li')
  item.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `
  todoList.appendChild(item)
}

// Create a new todo by clicking add button.
const addBtn = document.querySelector('#addBtn')
addBtn.addEventListener('click', function () {
  let inputValue = document.querySelector('#newTodo').value
  if (inputValue !== '') {
    addItem(inputValue)
    document.querySelector('#newTodo').value = '' // Cleaer input value after added
  }
})

// Create a new todo by pressing "Enter".
const input = document.querySelector('#newTodo')
input.addEventListener('keydown', function () {
  console.log(event.key)
  if (event.key === 'Enter') {
    addItem(input.value)
    input.value = ''  // Clear input value after added
  }
})

// Delete an item
list.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete')) {
    let li = event.target.parentElement
    li.remove()
  }
})

// Check/Uncheck an item
list.addEventListener('click', function (event) {
  if (event.target.tagName === 'LABEL') {
    event.target.classList.toggle('checked')
    if (event.target.classList.contains('checked')) {
      moveToDoneList(event.target.textContent)
    } else {
      moveToTodoList(event.target.textContent)
    }
    event.target.parentElement.remove()
  }
})