let ul = document.getElementById('ul')
let deleteLi = document.getElementsByClassName('fa fa-trash')

for (let article of deleteLi) {
    article.addEventListener('click', (e)=>{
        
         e.preventDefault()
      
         let obj = {_id: e.target.id}
        
         fetch('/admin/articles', {
             method: 'DELETE',
             headers:{
                 'Content-type': 'application/JSON',
                 'Accept': 'application/JSON',
                 
             },
             body: JSON.stringify(obj)
     
         }).then(res=>{
             return res.json()
         }).then(result=>{
            console.log(result)
             e.target.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
         })
     
     })
}



