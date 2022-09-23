const data= new Date()
var Maindata = [];
var i = 0;

function createTask(task,btnTxt,btnClass,taskId) {
  let container = document.createElement("div");
  container.setAttribute("id", i);
  let deleteButton = document.createElement("button");
  deleteButton.setAttribute("id", taskId);
  deleteButton.setAttribute("class", btnClass);
  deleteButton.innerText = btnTxt;
  let para = document.createElement("p");
  para.setAttribute("id", taskId);
  para.innerHTML = task;
  container.appendChild(para);
  container.appendChild(deleteButton);
  let divi=document.getElementById('main')
  let br=document.createElement('br')
  container.appendChild(br)
  divi.appendChild(container)
//   document.body.appendChild(container);
}

async function config() {
  let res = await fetch("/conf", { method: "GET" }).then((res) => {
    return res.json();
  });
  Maindata = res;
  console.log(Maindata)
  for (i = 0; i < Maindata.length; i++) {
    if(Maindata[i].completed===false){
        createTask(Maindata[i].task,"Delete","del",Maindata[i].id);
    }
  }
  del()
}

function AddItem() {
  //for fornt end
  let genId = Date.now()
  const todo = document.getElementById("txt").value;
  if (todo === "") {
    alert("TextBox is empty");
    return;
  } else {
    createTask(todo,"Delete","del",genId);
    i++;  
    document.getElementById("txt").value = "";
  }
  
  console.log(genId)
  //now for the backend
  fetch("/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: genId,
      task: todo,
      completed: false,
    }),
  });
  del()
}

function del() {
  let deleteButtons = document.querySelectorAll(".del");
  // console.log(deleteButtons);
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let temp = btn.parentElement;
      let idx = btn.id;
      console.log(idx);
      temp.remove();

      fetch("/del", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idx,
        }),
      });
    });
  });
}
