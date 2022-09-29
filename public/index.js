
const tasksDOM=document.querySelector(".tasks");
const loadingDOM=document.querySelector(".loading-text")
const taskInputDOM=document.querySelector(".task-input")
const formDOM=document.querySelector(".task-form")

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
        if(completed){
          return `<div class="single-task">
          <h5><s>${name}</s></h5>
          <button type="button" class="delete-btn" id="${taskID}">Delete</button>
          <a href="task.html?id=${taskID}">Edit</a>
          </div>`
        }else{
          return `<div class="single-task">
          <h5>${name}</h5>
          <button type="button" class="delete-btn" id="${taskID}">Delete</button>
          <a href="task.html?id=${taskID}">Edit</a>
          </div>`
        }
        
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


//delete task api/tasks/:id
tasksDOM.addEventListener("click",async(e)=>{
  console.log(e)
  const el=e.target

  const taskID=el.id
  try{
    loadingDOM.style.visibility="visible"
    await fetch(`/api/tasks/${taskID}/`,{method:"Delete"})
    showTasks()
  }catch(err){
    console.log(err)
  }
  loadingDOM.style.visibility="hidden"
})

//add an element
formDOM.addEventListener("submit",async(e)=>{
  const taskName=taskInputDOM.value
  try{
    await fetch('/api/tasks/',{method:"POST",headers:{
      "Content-type":"application/json"
    },body:JSON.stringify({
      "name":taskName,
      "completed":false
    })})
    showTasks()
  }catch(err){
    console.log(err)
  }
})