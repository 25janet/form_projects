function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const taskList = document.getElementById("tasklist");
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";
  taskItem.innerHTML = taskText;

  // Add the "x" button (delete)
  let span = document.createElement("span");
  span.innerHTML = "\u00d7";  // Unicode ×
  span.className = "delete-btn";
  taskItem.appendChild(span);

  // Toggle completed on click (not the delete)
  taskItem.addEventListener("click", function (e) {
    if (e.target.tagName !== "SPAN") {
      this.classList.toggle("completed");
      saveData();
    }
  });

  // Delete the task
  span.addEventListener("click", function () {
    taskItem.remove();
    saveData();
  });

  taskList.appendChild(taskItem);  // append only once!
  taskInput.value = "";  // Clear input
  saveData();            // Save current state
}

function saveData() {
  const taskList = document.getElementById("tasklist");
  localStorage.setItem("data", taskList.innerHTML);
}

function showData() {
  const taskList = document.getElementById("tasklist");
  taskList.innerHTML = localStorage.getItem("data") || "";

  // Reattach listeners for loaded items
  const items = taskList.querySelectorAll("li");
  items.forEach(item => {
    item.addEventListener("click", function (e) {
      if (e.target.tagName !== "SPAN") {
        this.classList.toggle("completed");
        saveData();
      }
    });

    const span = item.querySelector("span");
    if (span) {
      span.addEventListener("click", function () {
        item.remove();
        saveData();
      });
    }
  });
}

// Call showData() when the page loads
window.onload = showData;
