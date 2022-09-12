function AddItem(){
    //for fornt end
    const val=document.getElementById("para").innerText
    const todo=document.getElementById("txt").value
    if(todo!=""){
        var result = val + todo + "\n"
        document.getElementById("para").innerText=result 
    }
    // console.log(result)
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