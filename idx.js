
function config(){
    fetch('/conf',{method:"GET"}).then(res=>{
        return res.json()
    }).then(data=>{
        console.log(data)
        data.forEach(i => {
            console.log(i)
            let temp=document.getElementById("template")
            let content=temp.content.cloneNode(true)
            content.querySelector('h2').textContent=i
            document.body.appendChild(content)
        });   
    })
    
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
    data:todo
   })}).then(str=>{
    console.log(str)
   })
}
