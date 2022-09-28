
const tasksDOM=document.querySelector(".tasks");
const loadingDOM=document.querySelector(".loading-text")
const taskInputDOM=document.querySelector(".task-input")


//Load task from api/tasks/
const showTasks=()=>{
  loadingDOM.style.visibility="visible";
  try{
    fetch('/api/tasks/',{method:"GET"}).then(data=>{
      return data.json()
    }).then((data)=>{
      // console.log(data)
      // console.log(data.tasks)
      const tasks=data.tasks
      // console.log(dta)
      if(tasks.length<1){
        tasksDOM.innerHTML='No Tasks'
        loadingDOM.style.visibility="hidden";
        return;
      }
      const allTasks=tasks.map((task)=>{
        const {completed,_id:taskID,name}=task;
        return `<div class="single-task">
        <h5>${name}</h5>
        <button type="button" class="delete-btn" id="${taskID}">Delete
        </button>
        </div>`
      }).join("")
      tasksDOM.innerHTML=allTasks
    })
  }catch(err){
    console.log(err)
    tasksDOM.innerHTML="<h5>There was an error</h5>"
  }
  loadingDOM.style.visibility="hidden";
  
}

showTasks()