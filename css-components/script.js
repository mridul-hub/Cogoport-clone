data = [];
let id;
const inputTask = document.getElementById("inputTask");
const button = document.querySelector("button");
const listTask = document.querySelector("#listTask");

function render() {
  while (listTask.firstChild) listTask.firstChild.remove();

  for (let i = 0; i < data.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = "title: " + data[i].title + "  " + "id: " + data[i].id;
    li.className = data[i].id;

    // Create the SVG element
    const remove = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    remove.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    remove.setAttribute("fill", "none");
    remove.setAttribute("viewBox", "0 0 24 24");
    remove.setAttribute("stroke-width", "1.5");
    remove.setAttribute("stroke", "currentColor");
    remove.setAttribute("width", "20");
    remove.setAttribute("height", "20");
    remove.setAttribute("stroke", "#555");
    remove.setAttribute("id", `r${id}`);
    remove.setAttribute("class", "remove");

    // Create the path for the icon
    const pathElement1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathElement1.setAttribute("stroke-linecap", "round");
    pathElement1.setAttribute("stroke-linejoin", "round");
    pathElement1.setAttribute(
      "d",
      "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    );

    remove.appendChild(pathElement1);

    // Create the SVG element
    const edit = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    edit.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    edit.setAttribute("fill", "none");
    edit.setAttribute("viewBox", "0 0 24 24");
    edit.setAttribute("stroke-width", "1.5");
    edit.setAttribute("stroke", "currentColor");
    edit.setAttribute("width", "20");
    edit.setAttribute("height", "20");
    edit.setAttribute("stroke", "#555");
    edit.setAttribute("id", `e${id}`);
    edit.setAttribute("class", "edit");

    // Create the path for the icon
    const pathElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathElement.setAttribute("stroke-linecap", "round");
    pathElement.setAttribute("stroke-linejoin", "round");
    pathElement.setAttribute(
      "d",
      "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    );

    // Append the path to the SVG element
    edit.appendChild(pathElement);

    li.appendChild(remove);
    li.appendChild(edit);
    listTask.appendChild(li);
  }
}

fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Request failed"); // Handle non-200 HTTP status codes
    }
    return response.json(); // Parse response body as JSON
  })
  .then((d) => {
    // Process the array data
    data = d;
    id = d.length + 1;
    render();
  })
  .catch((error) => {
    // Handle any errors that occurred during the request
    console.log("Error:", error.message);
  });

button.addEventListener("click", function add() {
  if (inputTask.value === "") {
    alert("Please enter a task.");
  } else {
    data.push({ title: inputTask.value, id: id });
    id++;
    inputTask.value = "";
    render();
  }
});

listTask.addEventListener(
  "click",
  function (e) {
    const liElement = e.target.closest("li");
    const index = Array.from(liElement?.children).indexOf(e.target);
    if (index === 0) {
      let id = e.target.parentElement.className;
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          data.splice(i, 1);
          break;
        }
      }
      render();
    } else if (index === 1) {
      let inputDataId = document.getElementById("inputDataId");
      inputDataId.style.display = "flex";
      let edit = document.getElementById("input");
      edit.value = "";
      edit.className = e.target.parentElement.className;
    }
  },
  false
);

document.querySelector("#save").addEventListener("click", function save() {
  let edit = document.getElementById("input");
  let value = edit.value;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == edit.className) {
      if (value == "") break;
      data[i].title = value;
    }
  }
  let inputDataId = document.getElementById("inputDataId");
  inputDataId.style.display = "none";
  render();
});
