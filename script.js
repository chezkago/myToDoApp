// ── Step 1: Grab the HTML elements we need ──
const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// ── Step 2: Load saved tasks when the page opens ──
window.addEventListener('load', loadTasks);

// ── Step 3: Add a task when the button is clicked ──
addBtn.addEventListener('click', function() {
  addTask(input.value);
});

// ── Step 4: Also add a task when Enter is pressed ──
input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTask(input.value);
  }
});

// ── Step 5: The addTask function ──
function addTask(text) {
  text = text.trim();
  if (text === '') return; // Don't add empty tasks

  // Create the <li> element
  const li = document.createElement('li');
  li.classList.add('task');

  // Create the <span> for the task text
  const span = document.createElement('span');
  span.textContent = text;

  // Clicking the span marks it complete
  span.addEventListener('click', function() {
    li.classList.toggle('completed');
    saveTasks();

    // Show modal only when marking complete, not unchecking
    if (li.classList.contains('completed')) {
      showModal();
    }
  });

  // Create the delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✕';
  deleteBtn.classList.add('delete-btn');

  // Clicking delete removes the task
  deleteBtn.addEventListener('click', function() {
    li.remove();
    saveTasks();
  });

  // Assemble and add to the list
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  // Clear the input and save
  input.value = '';
  saveTasks();
}

// ── Step 6: Save tasks to localStorage ──
function saveTasks() {
  const tasks = [];

  document.querySelectorAll('.task').forEach(function(li) {
    tasks.push({
      text: li.querySelector('span').textContent,
      completed: li.classList.contains('completed')
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ── Step 7: Load tasks from localStorage ──
function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (!saved) return; // Nothing saved yet

  JSON.parse(saved).forEach(function(task) {
    addTask(task.text);

    // Re-apply completed state if it was saved
    if (task.completed) {
      const lastTask = taskList.lastElementChild;
      lastTask.classList.add('completed');
    }
  });
}

// ── Modal ──
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');

function showModal() {
  modal.classList.add('active');
}

function hideModal() {
  modal.classList.remove('active');
}

// Close when OK is clicked
modalClose.addEventListener('click', hideModal);

// Close when clicking outside the box
modal.addEventListener('click', function(event) {
  if (event.target === modal) {
    hideModal();
  }
});