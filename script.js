let input = document.querySelector("#input");
let addButton = document.querySelector("#add");
let list = document.querySelector("#list");
list.innerHTML = "";
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];





addButton.addEventListener("click", function () {
  let task = input.value;
  if (task == "") {
    alert("Please enter a task");
    return;
  }


  tasks.push({
    task,
    done: false,
  });
  input.value = "";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
  let lis = document.querySelectorAll("li");
  lis[lis.length - 1].style.animation = "slideIn 1.5s ease-in-out";
});

function render() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    let spam = document.createElement("spam");
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.classList.add("delete");
    spam.innerText = task.task;
    checkbox.checked = task.done;
    li.appendChild(checkbox);
    li.appendChild(spam);
    li.appendChild(deleteButton);
    if (task.done) {
      li.classList.add("checked");
    } else {
      li.classList.remove("checked");
    }
    checkbox.addEventListener("click", function () {
      tasks[index].done = !tasks[index].done;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      render();
    });

    deleteButton.addEventListener("click", function () {
      li.style.animation = "slideOut 1.5s ease-in-out";
      li.addEventListener("animationend", function () {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        render();
      });
    });

    list.appendChild(li);
  });
}

render();
