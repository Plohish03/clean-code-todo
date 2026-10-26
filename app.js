//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task'); //Add a new task.
const addButton = document.getElementsByTagName('button')[0]; //first button
const todoList = document.getElementById('incompleteTasks'); //ul of #incompleteTasks
const completedList = document.getElementById('completed-tasks'); //completed-tasks

//New task list item
const createTaskElement = function (taskText) {
  const listItem = document.createElement('li');

  //input (checkbox)
  const checkBox = document.createElement('input'); //checkbx
  //label
  const label = document.createElement('label'); //label
  //input (text)
  const editInput = document.createElement('input'); //text
  //button.edit
  const editButton = document.createElement('button'); //edit button

  //button.delete
  const deleteButton = document.createElement('button'); //delete button
  const deleteIcon = document.createElement('img'); //delete button image

  label.innerText = taskText;
  label.className = 'task';

  //Each elements, needs appending
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createTaskElement(taskInput.value);

  todoList.appendChild(listItem);
  bindTaskEvents(listItem, moveToCompleted);

  taskInput.value = '';
};

const toggleEditMode = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('editMode');
  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const moveToCompleted = function () {
  const listItem = this.parentNode;
  completedList.appendChild(listItem);
  // the checkbox now means "uncheck to restore", so it gets the opposite handler
  bindTaskEvents(listItem, moveToTodo);
};

const moveToTodo = function () {
  const listItem = this.parentNode;
  todoList.appendChild(listItem);
  // the checkbox now means "uncheck to restore", so it gets the opposite handler
  bindTaskEvents(listItem, moveToCompleted);
};

//Set the click handler to the addTask function.
addButton.addEventListener('click', addTask);

const bindTaskEvents = function (listItem, onCheckboxChange) {
  const checkBox = listItem.querySelector('input[type=checkbox]');
  const editButton = listItem.querySelector('button.edit');
  const deleteButton = listItem.querySelector('button.delete');

  editButton.onclick = toggleEditMode;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = onCheckboxChange;
};

//for each list item
for (let i = 0; i < todoList.children.length; i++) {
  bindTaskEvents(todoList.children[i], moveToCompleted);
}

for (let i = 0; i < completedList.children.length; i++) {
  bindTaskEvents(completedList.children[i], moveToTodo);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
