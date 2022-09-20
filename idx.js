var Maindata = [];
var i = 0;

function createTask(task,btnTxt,btnClass) {
  let container = document.createElement("div");
  container.setAttribute("id", i);
  let deleteButton = document.createElement("button");
  deleteButton.setAttribute("id", "deleteBtn" + i);
  deleteButton.setAttribute("class", btnClass);
  deleteButton.innerText = btnTxt;
  let para = document.createElement("p");
  para.setAttribute("id", "p" + i);
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
        createTask(Maindata[i].task,"Delete","del");
    }
  }
  del();
}

function AddItem() {
  //for fornt end
  const todo = document.getElementById("txt").value;
  if (todo === "") {
    alert("TextBox is empty");
    return;
  } else {
    createTask(todo,"Delete","del");
    i++;
    document.getElementById("txt").value = "";
  }
  //now for the backend
  fetch("/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: todo,
      completed: false,
    }),
  });
  del();
}

async function del() {
  let deleteButtons = document.querySelectorAll(".del");
  console.log(deleteButtons);
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log(btn.id);
      let temp = btn.parentElement;
      let id = temp.id;
      console.log(id);
      temp.remove();

      fetch("/comp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: id,
        }),
      });
    });
  });
}

function Restore(){
    if(document.getElementById("restoreSection").style.display == "none"){
        document.getElementById("restoreSection").style.display = "block"    
        for (i = 0; i < Maindata.length; i++) {
            if(Maindata[i].completed===true){
                createTask(Maindata[i].task,"Restore","res");
            }
        }
    }else{
        document.getElementById("restoreSection").style.display = "none"
    }
}