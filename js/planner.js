/**
 * planner.js
 * Interactive Academic Planner using vanilla JS arrays, functions,
 * event handling, DOM manipulation, and localStorage persistence.
 */

const STORAGE_KEY = "miva_cos106_academic_tasks";

const DEFAULT_TASKS = [
  {
    id: 1,
    title: "Complete COS 106 Practical Term Project",
    course: "COS 106",
    priority: "high",
    completed: false
  },
  {
    id: 2,
    title: "Review JavaScript DOM & Event Listeners",
    course: "COS 106",
    priority: "medium",
    completed: true
  },
  {
    id: 3,
    title: "Solve MTH 101 Calculus Practice Sheet",
    course: "MTH 101",
    priority: "medium",
    completed: false
  }
];

let tasks = loadTasks();

document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskListEl = document.getElementById("task-list");

  if (!taskForm || !taskListEl) return;

  renderTasks();

  taskForm.addEventListener("submit", handleAddTask);
  taskListEl.addEventListener("click", handleTaskAction);
});

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (error) {
    // Fall back to starter tasks if storage is unavailable
  }
  return DEFAULT_TASKS.map((task) => ({ ...task }));
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    // Ignore storage quota/privacy-mode errors gracefully
  }
}

function handleAddTask(event) {
  event.preventDefault();

  const titleInput = document.getElementById("task-title");
  const courseInput = document.getElementById("task-course");
  const priorityInput = document.getElementById("task-priority");
  const errorEl = document.getElementById("task-form-error");

  const title = titleInput.value.trim();
  const course = courseInput.value.trim().toUpperCase() || "GENERAL";
  const priority = priorityInput.value;

  if (!title) {
    errorEl.textContent = "Please enter a task description before adding.";
    titleInput.classList.add("is-invalid");
    titleInput.focus();
    return;
  }

  errorEl.textContent = "";
  titleInput.classList.remove("is-invalid");

  addTask(title, course, priority);
  taskFormReset(titleInput, courseInput, priorityInput);
}

function taskFormReset(titleInput, courseInput, priorityInput) {
  titleInput.value = "";
  courseInput.value = "";
  priorityInput.value = "medium";
  titleInput.focus();
}

function addTask(title, course, priority) {
  const newTask = {
    id: Date.now(),
    title,
    course,
    priority,
    completed: false
  };

  tasks.unshift(newTask);
  saveTasks();
  renderTasks();
}

function toggleTask(taskId) {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks();
  renderTasks();
}

function handleTaskAction(event) {
  const actionBtn = event.target.closest("button[data-action]");
  if (!actionBtn) return;

  const taskId = Number(actionBtn.dataset.id);
  const action = actionBtn.dataset.action;

  if (action === "toggle") {
    toggleTask(taskId);
  } else if (action === "delete") {
    deleteTask(taskId);
  }
}

function renderTasks() {
  const taskListEl = document.getElementById("task-list");
  const emptyStateEl = document.getElementById("empty-state");

  taskListEl.innerHTML = "";

  if (tasks.length === 0) {
    emptyStateEl.hidden = false;
  } else {
    emptyStateEl.hidden = true;
    tasks.forEach((task) => {
      taskListEl.appendChild(createTaskElement(task));
    });
  }

  updateStats();
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = task.completed ? "task-item is-completed" : "task-item";

  const infoDiv = document.createElement("div");
  infoDiv.className = "task-info";

  const metaDiv = document.createElement("div");
  metaDiv.className = "task-meta";

  const courseBadge = document.createElement("span");
  courseBadge.className = "pill pill-muted";
  courseBadge.textContent = task.course;
  metaDiv.appendChild(courseBadge);

  const priorityBadge = document.createElement("span");
  priorityBadge.className = `priority-badge priority-${task.priority}`;
  priorityBadge.textContent = task.priority;
  metaDiv.appendChild(priorityBadge);

  if (task.completed) {
    const statusBadge = document.createElement("span");
    statusBadge.className = "status-badge";
    statusBadge.textContent = "Completed";
    metaDiv.appendChild(statusBadge);
  }

  const titleEl = document.createElement("span");
  titleEl.className = "task-title";
  titleEl.textContent = task.title;

  infoDiv.appendChild(metaDiv);
  infoDiv.appendChild(titleEl);

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "task-actions";

  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.className = task.completed ? "btn btn-secondary btn-sm" : "btn btn-primary btn-sm";
  toggleBtn.dataset.action = "toggle";
  toggleBtn.dataset.id = String(task.id);
  toggleBtn.textContent = task.completed ? "Mark Pending" : "Mark Completed";

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "btn btn-delete btn-sm";
  deleteBtn.dataset.action = "delete";
  deleteBtn.dataset.id = String(task.id);
  deleteBtn.textContent = "Delete";

  actionsDiv.appendChild(toggleBtn);
  actionsDiv.appendChild(deleteBtn);

  li.appendChild(infoDiv);
  li.appendChild(actionsDiv);

  return li;
}

function updateStats() {
  const totalEl = document.getElementById("stat-total");
  const pendingEl = document.getElementById("stat-pending");
  const completedEl = document.getElementById("stat-completed");

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  if (totalEl) totalEl.textContent = String(total);
  if (pendingEl) pendingEl.textContent = String(pending);
  if (completedEl) completedEl.textContent = String(completed);
}
