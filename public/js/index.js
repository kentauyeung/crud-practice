const deleteBtn = document.querySelectorAll('.del')

Array.from(deleteBtn).forEach( el => {
    el.addEventListener('click', deleteTask)
})

async function deleteTask() {
    const task = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'anotherPokemon': task
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}