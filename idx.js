var Maindata=[];

async function config(){
    const res= await fetch('/conf',{method:"GET"}).then(res=>{
        return res.json()
    }).then(data=>{
        // console.log(data)
        Maindata=data
        
    })
    console.log(Maindata)
    for (let i = 0; i < Maindata.length; i++) {
        const j = Maindata[i].task;
        let temp=document.getElementById("template")
        let content=temp.content.cloneNode(true)
        content.querySelector('h2').textContent=j
        document.body.appendChild(content)
    }

    
}

function AddItem(){
    //for fornt end
    const todo=document.getElementById("txt").value
    
    if(todo===""){
        alert("TextBox is empty")
        return
    }
    let temp=document.getElementById("template")
    let content=temp.content.cloneNode(true)
    content.querySelector('h2').textContent=txt.value
    document.body.appendChild(content)
    
    
    document.getElementById("txt").value=""
    //now for the backend
   fetch('/todo',{method:'POST',
   "headers": {
      "Content-Type": "application/json"
   },body:JSON.stringify({
    task:todo,
    completed:false

   })})
}
